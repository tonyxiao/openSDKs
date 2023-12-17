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
      ...(await import('../prettier.config.js')),
      filepath: opts.format, // Sort imports will apply, better than just parser: json
    }),
  )
}

export const listSdks = () => listPackagesInDir(pathJoin(__dirname, '../sdks'))

export const listPackages = () =>
  listPackagesInDir(pathJoin(__dirname, '../packages'))

// Templates
const packageJsonTemplate: PackageJson = {
  version: '0.0.1',
  type: 'module',
  main: 'dist/cjs/index.js', // backward compat for node 10
  module: 'dist/esm/index.js', // backward compat for those that do not support "exports"
  types: 'dist/types/index.d.ts',
  imports: {
    '#module/*': './*', // Allowing syntax like '#module/qbo.oas.js'
  },
  exports: {
    '.': {
      types: './dist/types/index.d.ts',
      import: './dist/esm/index.js',
      require: './dist/cjs/index.js',
    },
    './*.oas.js': './*.oas.js', // maps to d.ts file
    './*.oas.json': './*.oas.json', // for those that can read it
    './*': {
      types: './dist/types/*.d.ts',
      import: './dist/esm/*.js',
      require: './dist/cjs/*.js',
    },
  },
  files: [
    'dist',
    // For declarationMap to work, we include our actual source files
    '**/*.ts',
    '**/*.d.ts',
    // Already present in dist, but if we exclude can cause issues with declration map though
    // '!*.d.ts',
    // We exclude tests, but maybe they can actually serve as examples?
    '!**/*.spec.ts',
    // json files cannot be required by most systems so we instead
    // chose to publish transformed js files
    // '!**/*.json',
  ],
  scripts: {
    clean: 'rm -rf ./dist',
    build: 'concurrently npm:build:*',
    'build:cjs':
      'tsc -p ./tsconfig.build.json --declaration false --declarationMap false --module CommonJS --moduleResolution Node10 --outDir ./dist/cjs',
    'build:cjs-pkgjson':
      'mkdir -p ./dist/cjs && echo \'{"type": "commonjs"}\' > ./dist/cjs/package.json',
    'build:esm':
      'tsc -p ./tsconfig.build.json --declaration false --declarationMap false --outDir ./dist/esm',
    'build:types':
      'tsc -p ./tsconfig.build.json --emitDeclarationOnly --outDir ./dist/types',
    // without with `pnpm -r version patch` command won't work...
    version: 'pnpm version',
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
    outDir: './dist',
    baseUrl: './',
    rootDir: './', // workaround issue with #module/* path not working when building @see https://share.cleanshot.com/gWWkV8xW
    paths: {
      '#module/*': ['./*'], // Workaround issue with #module/path not working when building cjs specically https://share.cleanshot.com/250DCSkB
      // This doesn't work when put inside tsconfig.base.json for some reason
      // and tsx unlike tsc / vscode doesn't seem to look for index.ts by default
      // if main is specified
      // EDIT: This doesn't work as the build output contains files in `paths` https://share.cleanshot.com/Nlmd0fKt
      // '@opensdks/util-zod': ['../../packages/util-zod/index.ts'],
      // '@opensdks/links': ['../../packages/links/index.ts'],
      // '@opensdks/runtime': ['../../packages/runtime/index.ts'],
    },
    // publish cjs for now and esm later...
    // module: 'CommonJS',
    // moduleResolution: 'Node',
  },
  include: ['*.ts'],
  exclude: ['*.spec.ts'], // I think this is only for emitting, not for type checking
}

// MARK: - Main
if (import.meta.url.endsWith(process.argv[1]!)) {
  listSdks().forEach((p) => {
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
      },
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
    // fs.rmSync(pathJoin(p.dirPath, 'tsconfig.json'), {force: true})
    void prettyWrite({
      path: pathJoin(p.dirPath, 'tsconfig.build.json'),
      format: 'tsconfig.json',
      data: tsConfigTemplate,
    })
  })
  // console.log(listPackages(pathJoin(__dirname, '../packages')))
}
