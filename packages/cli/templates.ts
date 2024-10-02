import * as fs from 'node:fs'
import {join as pathJoin} from 'node:path'
import prettier from 'prettier'
import type {PackageJson, TsConfigJson} from 'type-fest'

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
      ...(await import('./prettier.config.js')).default,
      filepath: opts.format, // Sort imports will apply, better than just parser: json
    }),
  )
}

// Templates
export const packageJsonTemplate: PackageJson = {
  // version: '0.0.14',
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
    './*.oas.types': './*.oas.types.js', // maps to d.ts file
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
    'src', // Sometimes we do nesting
    '*.ts', // Sometimes we do not do nesting...
    '*.d.ts',
    '*.oas.json',
    // Already present in dist, but if we exclude can cause issues with declration map though
    // '!*.d.ts',
    // We exclude tests, but maybe they can actually serve as examples?
    '!**/*.spec.ts',
    // Exclude unmodified oas from publishing as they only cause issues...
    '!*.orig.oas.json',
    // No longer necessary to exclude json files as we no longer import them...
    // Exclude dist json files copied by tsc as we are using #module/ import from root
    // Though not strictly necessary as we don't import directly anymore.
    // '!cjs/**/*.json',
    // '!esm/**/*.json',
  ],
  scripts: {
    clean: 'rm -rf ./esm ./cjs ./types',
    build: 'concurrently npm:build:*',
    'build:cjs':
      'tsc -p ./tsconfig.build.json --declaration false --declarationMap false --module CommonJS --moduleResolution Node10 --outDir ./cjs',
    'build:cjs-pkgjson':
      'mkdir -p ./cjs && echo \'{"type": "commonjs"}\' | tee ./cjs/package.json ./types/package.json',
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
    // Should these be here?
    '@opensdks/runtime': 'workspace:*',
    'openapi-typescript': '6.7.1',
  },
}

export const tsConfigTemplate: TsConfigJson = {
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
    //   //   // '@opensdks/fetch-links': ['../../packages/links/index.ts'],
    //   //   // '@opensdks/runtime': ['../../packages/runtime/index.ts'],
    // },
    // publish cjs for now and esm later...
    // module: 'CommonJS',
    // moduleResolution: 'Node',
  },
  include: ['*.ts'],
  // I think this is only for emitting, not for type checking
  exclude: ['**/*.spec.ts'],
}
