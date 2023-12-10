/**
 * We have to generate the connector list into actual files because webpack / next.js is extremely not performant
 * when importing modules with dynamic paths at runtime
 */

import {join as pathJoin} from 'node:path'
import {getPackageJson, listSdks, prettyWrite} from './syncPackages'

const sdkJsons = listSdks().map((p) => {
  if (!p.packageJson.name) {
    throw new Error(`No name in package.json at ${p.packageJsonPath}`)
  }
  if (!p.packageJson.version) {
    throw new Error(`No version in package.json at ${p.packageJsonPath}`)
  }
  return p.packageJson
})

const path = pathJoin(__dirname, '../examples/package.json')

const pkgJson = getPackageJson(path)

pkgJson.dependencies = {
  ...pkgJson.dependencies,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ...Object.fromEntries(sdkJsons.map((p) => [p.name!, p.version!])),
}

void prettyWrite({path, format: 'package.json', data: pkgJson})
