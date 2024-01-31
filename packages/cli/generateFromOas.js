#!/usr/bin/env node
/** For internal use only. TODO: Merge me with extenral */
import * as fs from 'node:fs'
import * as path from 'node:path'
import {parseArgs} from 'node:util'
import {generateMultiFileFromOas} from '@opensdks/cli'

const {
  positionals: [filename],
  values: options,
} = parseArgs({
  options: {
    debug: {type: 'boolean', short: 'd'},
    'meta-dir': {type: 'string'},
    'types-dir': {type: 'string'},
  },
  allowPositionals: true,
})
if (!filename) {
  throw new Error('You must specify a filename')
}
const ret = await generateMultiFileFromOas(filename)

if (options.debug) {
  console.log(ret.meta)
  console.log(ret.types)
} else {
  const outName = path.basename(filename, path.extname(filename))
  // TODO: Get rid of this hard coding...
  fs.writeFileSync(
    (options['meta-dir'] ?? 'src/') + outName + '.meta.ts',
    ret.meta,
  )
  fs.writeFileSync(
    (options['types-dir'] ?? '') + outName + '.types.d.ts',
    ret.types,
  )
}
