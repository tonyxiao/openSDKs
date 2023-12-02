/**
 * We have to generate the connector list into actual files because webpack / next.js is extremely not performant
 * when importing modules with dynamic paths at runtime
 */

import * as fs from 'node:fs'
import {join as pathJoin} from 'node:path'
import prettier from 'prettier'

const sdkList = fs
  .readdirSync(pathJoin(__dirname, '../sdks'), {
    withFileTypes: true,
  })
  .filter((r) => r.isDirectory())
  .map((d) => {
    const path = pathJoin(__dirname, '../sdks', d.name)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pkgJson: {name: string} = JSON.parse(
      fs.readFileSync(pathJoin(path, 'package.json'), 'utf-8'),
    )
    return pkgJson.name
  })

async function updateDocImports() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const pkgJson: {dependencies: {}} = require('../docs/package.json')
  pkgJson.dependencies = {
    ...pkgJson.dependencies,
    ...Object.fromEntries(sdkList.map((s) => [s, 'workspace:*'])),
  }
  fs.writeFileSync(
    pathJoin(__dirname, '../docs/package.json'),
    await prettier.format(JSON.stringify(pkgJson), {
      ...(require('../prettier.config') as {}),
      parser: 'json',
    }),
  )
}

// console.log(sdkList)
void updateDocImports()
