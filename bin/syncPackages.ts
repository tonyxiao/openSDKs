import * as fs from 'node:fs'
import {dirname, join as pathJoin} from 'node:path'
import * as url from 'node:url'
import prettier from 'prettier'
import type {PackageJson, TsConfigJson} from 'type-fest'

const __filename = url.fileURLToPath(import.meta.url)
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
      ...(await import('../prettier.config.js')).default,
      filepath: opts.format, // Sort imports will apply, better than just parser: json
    }),
  )
}

export const listSdkPackages = () =>
  listPackagesInDir(pathJoin(__dirname, '../sdks'))

export const listCorePackages = () =>
  listPackagesInDir(pathJoin(__dirname, '../packages'))

// Templates
const packageJsonTemplate: PackageJson = {
  version: '0.0.5',
  type: 'module',
  main: './cjs/index.js', // backward compat for node 10
  module: './esm/index.js', // backward compat for those that do not support "exports"
  types: './types/index.d.ts',
  // imports: {
  //   // types  Won't work in published package unless tsconfig is present
  //   '#module/*': './*', // Allowing syntax like '#module/qbo.oas.js'
  // },
  imports: undefined as any as {},
  exports: {
    '.': {
      types: './types/index.d.ts',
      import: './esm/index.js',
      require: './cjs/index.js',
    },
    './*.oas.js': './*.oas.js', // maps to d.ts file
    './*.oas.json': './*.oas.json', // for those that can read it
    './*': {
      types: './types/*.d.ts',
      import: './esm/*.js',
      require: './cjs/*.js',
    },
  },
  files: [
    'types',
    'esm',
    'cjs',
    // For declarationMap to work, we include our actual source files
    'src',
    '*.d.ts',
    '*.oas.json',
    // Already present in dist, but if we exclude can cause issues with declration map though
    // '!*.d.ts',
    // We exclude tests, but maybe they can actually serve as examples?
    '!**/*.spec.ts',
    // Exclude dist json files copied by tsc as we are using #module/ import from root
    // Though not strictly necessary as we don't import directly anymore.
    '!cjs/**/*.json',
    '!esm/**/*.json',
  ],
  scripts: {
    clean: 'rm -rf ./esm ./cjs ./types',
    build: 'concurrently npm:build:*',
    'build:cjs':
      'tsc -p ./tsconfig.build.json --declaration false --declarationMap false --module CommonJS --moduleResolution Node10 --outDir ./cjs',
    'build:cjs-pkgjson':
      'mkdir -p ./cjs && echo \'{"type": "commonjs"}\' > ./cjs/package.json',
    'build:esm':
      'tsc -p ./tsconfig.build.json --declaration false --declarationMap false --outDir ./esm',
    'build:types':
      'tsc -p ./tsconfig.build.json --emitDeclarationOnly --outDir ./types',
    // without with `pnpm -r version patch` command won't work...
    version: 'pnpm version', // We might not want to use this and instead use template version
  },
  publishConfig: {
    access: 'public',
  },
  devDependencies: {
    concurrently: '^8.2.2',
  },
}

const tsConfigTemplate: TsConfigJson = {
  extends: '../../tsconfig.base.json',
  compilerOptions: {
    // outDir: './dist',
    baseUrl: './',
    rootDir: undefined,
    paths: undefined,
    // rootDir: './', // workaround issue with #module/* path not working when building @see https://share.cleanshot.com/gWWkV8xW
    // paths: {
    //   '../*': ['./*'], // Workaround issue with #module/path not working when building cjs specically https://share.cleanshot.com/250DCSkB
    //   //   // This doesn't work when put inside tsconfig.base.json for some reason
    //   //   // and tsx unlike tsc / vscode doesn't seem to look for index.ts by default
    //   //   // if main is specified
    //   //   // EDIT: This doesn't work as the build output contains files in `paths` https://share.cleanshot.com/Nlmd0fKt
    //   //   // '@opensdks/util-zod': ['../../packages/util-zod/index.ts'],
    //   //   // '@opensdks/links': ['../../packages/links/index.ts'],
    //   //   // '@opensdks/runtime': ['../../packages/runtime/index.ts'],
    // },
    // publish cjs for now and esm later...
    // module: 'CommonJS',
    // moduleResolution: 'Node',
  },
  include: ['*.ts'],
  // I think this is only for emitting, not for type checking
  exclude: [
    '**/*.spec.ts',
    'generateFromOas.ts', // Need to exclude this for now because sometimes contain esm specific code...
  ],
}

async function addSdksAsDeps(pkgJsonPath: string, opts?: {version?: string}) {
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
  }

  await prettyWrite({
    path: pkgJsonPath,
    format: 'package.json',
    data: pkgJson,
  })
}

// MARK: - Main
if (import.meta.url.endsWith(process.argv[1]!)) {
  listSdkPackages().forEach((p) => {
    // console.log(p.dirPath, p.packageJson.name, p.packageJson.scripts)
    p.packageJson = {
      ...(p.packageJson as {}),
      ...(packageJsonTemplate as {}),
      scripts: {
        ...p.packageJson.scripts,
        ...packageJsonTemplate.scripts,
        'build:ts': undefined,
        // 'tsc -p ./tsconfig.build.json',
        // because tsc does not copy .d.ts files to build, and therefore we need to do it manully
        // @see https://stackoverflow.com/questions/56018167/typescript-does-not-copy-d-ts-files-to-build
        // We also cannot use .ts files because not all openapi types compile
        // @see https://github.com/drwpow/openapi-typescript/issues/1481
        'build:dts': undefined,
        // 'mkdir -p dist && cp *.d.ts ./dist',
        'build:json': undefined,
        // 'mkdir -p dist && npx tsx ../../bin/oasJsonToJs.ts ./ ./dist',
      } as {},
      devDependencies: {
        ...p.packageJson.devDependencies,
        ...packageJsonTemplate.devDependencies,
        '@opensdks/runtime': 'workspace:*',
        'openapi-typescript': '6.7.1',
      },
    }

    void prettyWrite({
      path: p.packageJsonPath,
      format: 'package.json',
      data: p.packageJson,
    })

    void prettyWrite({
      path: pathJoin(p.dirPath, 'tsconfig.build.json'),
      format: 'tsconfig.json',
      data: {
        ...tsConfigTemplate,
        // For now until we figure out the cannot be named w/o a reference problem
        // @see https://share.cleanshot.com/V2q3rQBR
        include: ['./src/**/*.ts'],
        exclude: [...(tsConfigTemplate.exclude ?? []), '**/*.openapi.ts'],
      },
    })
    fs.rmSync(pathJoin(p.dirPath, 'tsconfig.json'), {force: true})
  })

  listCorePackages().forEach((p) => {
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
    void prettyWrite({
      path: p.packageJsonPath,
      format: 'package.json',
      data: p.packageJson,
    })

    // Delete previous
    fs.rmSync(pathJoin(p.dirPath, 'tsconfig.json'), {force: true})
    void prettyWrite({
      path: pathJoin(p.dirPath, 'tsconfig.build.json'),
      format: 'tsconfig.json',
      data: tsConfigTemplate,
    })
  })
  // console.log(listPackages(pathJoin(__dirname, '../packages')))

  // Update examples package.json
  await addSdksAsDeps(pathJoin(__dirname, '../examples/package.json'))
  await addSdksAsDeps(pathJoin(__dirname, '../website/package.json'), {
    version: 'workspace:*',
  })
}
