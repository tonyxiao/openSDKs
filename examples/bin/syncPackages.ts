import * as fs from 'node:fs'
import {dirname, join as pathJoin} from 'node:path'
import {fileURLToPath} from 'node:url'
import prettier from 'prettier'
import type {PackageJson, TsConfigJson} from 'type-fest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function listPackagesInDir(baseDir: string) {
  return fs
    .readdirSync(baseDir, {
      withFileTypes: true,
    })
    .filter((r) => r.isDirectory())
    .map((d) => ({
      dirPath: pathJoin(baseDir, d.name),
      dirName: d.name,
      packageJsonPath: pathJoin(baseDir, d.name, 'package.json'),
    }))
    .filter((p) => fs.existsSync(p.packageJsonPath))
    .map((p) => ({...p, packageJson: getPackageJson(p.packageJsonPath)}))
}

export function getPackageJson(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8')) as PackageJson
}

export async function prettyWrite(
  opts: {path: string} & (
    | {format: 'package.json'; data: PackageJson}
    | {format: 'tsconfig.json'; data: TsConfigJson}
  ),
) {
  fs.writeFileSync(
    opts.path,
    await prettier.format(JSON.stringify(opts.data), {
      ...(await import('../../prettier.config.js')),
      filepath: opts.format, // Sort imports will apply, better than just parser: json
    }),
  )
}

export const listSdks = () =>
  listPackagesInDir(pathJoin(__dirname, '../../sdks'))

export const listPackages = () =>
  listPackagesInDir(pathJoin(__dirname, '../../packages'))

// Templates
const packageJsonTemplate: PackageJson = {
  version: '0.0.1',
  main: 'dist/index.js',
  types: 'dist/index.d.ts',
  files: [
    'dist',
    // For declarationMap to work, we include our actual source files
    '**/*.ts',
    // Already present in dist, but if we exclude can cause issues with declration map though
    // '!*.d.ts',
    // We exclude tests, but maybe they can actually serve as examples?
    '!**/*.spec.ts',
    // json files cannot be required by most systems so we instead
    // chose to publish transformed js files
    '!**/*.json',
  ],
  scripts: {
    clean: 'rm -rf ./dist',
    build: 'tsc -p ./tsconfig.json',
  },
  publishConfig: {
    access: 'public',
  },
}

const tsConfigTemplate: TsConfigJson = {
  extends: '../../tsconfig.base.json',
  compilerOptions: {
    outDir: './dist',
    baseUrl: './',
  },
  include: ['*.ts'],
  exclude: ['*.spec.ts'], // I think this is only for emitting, not for type checking
}

// MARK: - Main

if (
  // Workaround for lack of import.meta.main in node for now
  import.meta.url ===
  ('file:///' + process.argv[1]?.replace(/\\/g, '/')).replace(/\/{3,}/, '///')
) {
  listSdks().forEach((p) => {
    // console.log(p.dirPath, p.packageJson.name, p.packageJson.scripts)
    p.packageJson = {
      ...(p.packageJson as {}),
      ...(packageJsonTemplate as {}),
      scripts: {
        ...p.packageJson.scripts,
        ...packageJsonTemplate.scripts,
        build: 'concurrently npm:build:*',
        'build:ts': 'tsc -p ./tsconfig.json',
        // because tsc does not copy .d.ts files to build, and therefore we need to do it manully
        // @see https://stackoverflow.com/questions/56018167/typescript-does-not-copy-d-ts-files-to-build
        // We also cannot use .ts files because not all openapi types compile
        // @see https://github.com/drwpow/openapi-typescript/issues/1481
        'build:dts': 'mkdir -p dist && cp *.d.ts ./dist',
        'build:json':
          'mkdir -p dist && npx tsx ../../bin/oasJsonToJs.ts ./ ./dist',
      },
      devDependencies: {
        ...p.packageJson.devDependencies,
        '@opensdks/runtime': 'workspace:*',
        concurrently: '^8.2.2',
        'openapi-typescript': '6.7.1',
      },
    }

    void prettyWrite({
      path: p.packageJsonPath,
      format: 'package.json',
      data: p.packageJson,
    })

    void prettyWrite({
      path: pathJoin(p.dirPath, 'tsconfig.json'),
      format: 'tsconfig.json',
      data: {
        ...tsConfigTemplate,
        // For now until we figure out the cannot be named w/o a reference problem
        // @see https://share.cleanshot.com/V2q3rQBR
        exclude: [...(tsConfigTemplate.exclude ?? []), '*.openapi.ts'],
      },
    })
  })

  listPackages().forEach((p) => {
    p.packageJson = {
      ...(p.packageJson as {}),
      ...(packageJsonTemplate as {}),
      scripts: {
        ...p.packageJson.scripts,
        ...packageJsonTemplate.scripts,
        clean: 'rm -rf ./dist',
        build: 'tsc -p ./tsconfig.json',
      },
    }
    void prettyWrite({
      path: p.packageJsonPath,
      format: 'package.json',
      data: p.packageJson,
    })

    void prettyWrite({
      path: pathJoin(p.dirPath, 'tsconfig.json'),
      format: 'tsconfig.json',
      data: tsConfigTemplate,
    })
  })
  // console.log(listPackages(pathJoin(__dirname, '../packages')))
}
