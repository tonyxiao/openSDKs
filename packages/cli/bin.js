#!/usr/bin/env node
/** For internal use only. TODO: Merge me with extenral */
import * as fs from 'node:fs'
import {parseArgs} from 'node:util'
import {generateSingleFileFromOas} from '@opensdks/cli'

const {
  positionals: [cmd, filename],
  values: options,
} = parseArgs({
  options: {
    name: {type: 'string', short: 'n'},
    output: {type: 'string', short: 'o'},
  },
  allowPositionals: true,
})
if (cmd !== 'generate') {
  throw new Error(
    'You must specify a command. Only valid command is "generate" for now',
  )
}
if (!filename) {
  throw new Error('You must specify a path / url to OpenAPI spec')
}
if (!options.name) {
  throw new Error(
    'You must specify name for the SDK, lowercase first letter preferably',
  )
}
const ret = await generateSingleFileFromOas(filename, {name: options.name})

if (!options.output) {
  console.log(ret)
} else {
  fs.writeFileSync(options.output, ret)
}
