import * as fs from 'node:fs'
import {dirname, join as pathJoin} from 'node:path'
import * as url from 'node:url'
import {
  getPackageJson,
  listPackagesInDir,
  packageJsonTemplate,
  prettyWrite,
  tsConfigTemplate,
} from '@opensdks/cli'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** Needed for things.tsx to work */
type SDKPackage = ReturnType<typeof listPackagesInDir>[number]

export const listSdkPackages = (): SDKPackage[] =>
  listPackagesInDir(pathJoin(__dirname, '../sdks'))

export const listCorePackages = () =>
  listPackagesInDir(pathJoin(__dirname, '../packages'))

async function addSdksAsDeps(
  pkgJsonPath: string,
  opts?: {version?: string; extraDeps?: Record<string, string>},
) {
  const sdkJsons = listSdkPackages().map((p) => {
    if (!p.packageJson.name) {
      throw new Error(`No name in package.json at ${p.packageJsonPath}`)
    }
    if (!p.packageJson.version) {
      throw new Error(`No version in package.json at ${p.packageJsonPath}`)
    }
    return p.packageJson
  })

  const pkgJson = getPackageJson(pkgJsonPath)

  pkgJson.dependencies = {
    ...pkgJson.dependencies,
    ...Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      sdkJsons.map((p) => [p.name!, opts?.version ?? p.version!]),
    ),
    ...opts?.extraDeps,
  }

  await prettyWrite({
    path: pkgJsonPath,
    format: 'package.json',
    data: pkgJson,
  })
}

// MARK: - Main
if (import.meta.url.endsWith(process.argv[1]!)) {
  await Promise.all(
    listSdkPackages().map(async (p) => {
      // console.log(p.dirPath, p.packageJson.name, p.packageJson.scripts)
      p.packageJson = {
        ...(p.packageJson as {}),
        ...(packageJsonTemplate as {}),
        scripts: {
          ...p.packageJson.scripts,
          ...packageJsonTemplate.scripts,
        } as {},
        devDependencies: {
          ...p.packageJson.devDependencies,
          ...packageJsonTemplate.devDependencies,
          '@opensdks/runtime': 'workspace:*',
          'openapi-typescript': '6.7.1',
        },
      }

      await prettyWrite({
        path: p.packageJsonPath,
        format: 'package.json',
        data: p.packageJson,
      })

      await prettyWrite({
        path: pathJoin(p.dirPath, 'tsconfig.build.json'),
        format: 'tsconfig.json',
        data: {
          ...tsConfigTemplate,
          // For now until we figure out the cannot be named w/o a reference problem
          // @see https://share.cleanshot.com/V2q3rQBR
          include: ['./src/**/*.ts'],
          exclude: [...(tsConfigTemplate.exclude ?? []), '**/*.oas.ts'],
        },
      })
      fs.rmSync(pathJoin(p.dirPath, 'tsconfig.json'), {force: true})
    }),
  )
  await Promise.all(
    listCorePackages().map(async (p) => {
      p.packageJson = {
        ...(p.packageJson as {}),
        ...(packageJsonTemplate as {}),
        scripts: {
          ...p.packageJson.scripts,
          ...packageJsonTemplate.scripts,
        } as {},
        devDependencies: {
          ...p.packageJson.devDependencies,
          ...packageJsonTemplate.devDependencies,
        } as {},
      }
      await prettyWrite({
        path: p.packageJsonPath,
        format: 'package.json',
        data: p.packageJson,
      })

      // Delete previous
      fs.rmSync(pathJoin(p.dirPath, 'tsconfig.json'), {force: true})
      await prettyWrite({
        path: pathJoin(p.dirPath, 'tsconfig.build.json'),
        format: 'tsconfig.json',
        data: tsConfigTemplate,
      })
    }),
  )
  // console.log(listPackages(pathJoin(__dirname, '../packages')))

  // TODO: This needs to be run twice right now it seems...
  // might be a "race condition"
  // Update examples package.json
  await addSdksAsDeps(pathJoin(__dirname, '../examples/package.json'), {
    extraDeps: {'@opensdks/runtime': packageJsonTemplate.version!},
  })
  await addSdksAsDeps(pathJoin(__dirname, '../website/package.json'), {
    version: 'workspace:*',
  })
}
