#!/usr/bin/env node
import * as fs from 'node:fs/promises'
import nodePath from 'node:path'
import {parseArgs} from 'node:util'

const {
  values: {baseDir = 'sdks'},
  positionals: [name],
} = parseArgs({
  options: {baseDir: {type: 'string', short: 'o'}},
  allowPositionals: true,
})

if (!name) {
  throw new Error('First argument <name> is required')
}

const pkgDir = nodePath.join(baseDir, `sdk-${name}`)
await fs.mkdir(nodePath.join(pkgDir, 'src'), {recursive: true})
await fs.writeFile(
  nodePath.join(pkgDir, 'package.json'),
  JSON.stringify({
    name: `@opensdks/${`sdk-${name}`}`,
    type: 'module',
  }),
)

// TODO:
// 1) Automate creation of index.ts as well
// 2) Automate downloading oas spec from places
// 3) Automate runninng local oas script
console.log('Now run syncPackges')
