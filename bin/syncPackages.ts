import * as fs from 'node:fs'
import {join as pathJoin} from 'node:path'
import prettier from 'prettier'
import type {PackageJson} from 'type-fest'

export function listPackagesInDir(baseDir: string) {
  return fs
    .readdirSync(baseDir, {
      withFileTypes: true,
    })
    .filter((r) => r.isDirectory())
    .map((d) => ({
      dir: d.name,
      packageJsonPath: pathJoin(baseDir, d.name, 'package.json'),
    }))
    .filter((p) => fs.existsSync(p.packageJsonPath))
    .map((p) => ({...p, packageJson: getPackageJson(p.packageJsonPath)}))
}

export function getPackageJson(path: string) {
  return JSON.parse(fs.readFileSync(path, 'utf-8')) as PackageJson
}

export async function writePackageJson(path: string, pkgJson: PackageJson) {
  fs.writeFileSync(
    path,
    await prettier.format(JSON.stringify(pkgJson), {
      ...(require('../prettier.config') as {}),
      filepath: 'package.json', // Sort imports will apply, better than just parser: json
    }),
  )
}

export const listSdks = () => listPackagesInDir(pathJoin(__dirname, '../sdks'))

export const listPackages = () =>
  listPackagesInDir(pathJoin(__dirname, '../packages'))

// MARK: - Main

if (require.main === module) {
  listSdks().forEach((p) => {
    console.log(p.packageJson.name, p.packageJson.scripts)
    p.packageJson.scripts = {
      ...p.packageJson.scripts,
      clean: 'rm -rf ./dist',
    }
    void writePackageJson(p.packageJsonPath, p.packageJson)
  })
  // console.log(listPackages(pathJoin(__dirname, '../packages')))
}
