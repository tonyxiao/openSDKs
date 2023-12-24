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
await fs.mkdir(pkgDir, {recursive: true})
await fs.writeFile(
  nodePath.join(pkgDir, 'package.json'),
  JSON.stringify({
    name: `@opensdks/${`sdk-${name}`}`,
    type: 'module',
  }),
)
console.log('Now run syncPackges')
