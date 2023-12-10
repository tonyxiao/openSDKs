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
      ...(require('../prettier.config') as {}),
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
  main: 'dist/index.js',
  types: 'dist/index.d.ts',
  files: ['dist', '**/*.ts', '!**/*.spec.ts'],
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
  exclude: ['*.spec.ts'],
}

// MARK: - Main

if (require.main === module) {
  listSdks().forEach((p) => {
    // console.log(p.dirPath, p.packageJson.name, p.packageJson.scripts)
    p.packageJson = {
      ...(p.packageJson as {}),
      ...(packageJsonTemplate as {}),
      scripts: {
        ...p.packageJson.scripts,
        ...packageJsonTemplate.scripts,
        clean: 'rm -rf ./dist',
        build: 'concurrently npm:build:*',
        'build:ts': 'tsc -p ./tsconfig.json',
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
      data: tsConfigTemplate,
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
