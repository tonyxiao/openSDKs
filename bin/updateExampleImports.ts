/**
 * We have to generate the connector list into actual files because webpack / next.js is extremely not performant
 * when importing modules with dynamic paths at runtime
 */

import {join as pathJoin} from 'node:path'
import {getPackageJson, listSdks, writePackageJson} from './syncPackages'

const sdkNames = listSdks().map((p) => {
  if (!p.packageJson.name) {
    throw new Error(`No name in package.json at ${p.packageJsonPath}`)
  }
  return p.packageJson.name
})

const path = pathJoin(__dirname, '../examples/package.json')

const pkgJson = getPackageJson(path)

pkgJson.dependencies = {
  ...pkgJson.dependencies,
  ...Object.fromEntries(sdkNames.map((s) => [s, 'workspace:*'])),
}

void writePackageJson(path, pkgJson)
