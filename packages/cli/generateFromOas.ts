// shebang not working for some reason... https://github.com/privatenumber/tsx/issues/440
// #!/usr/bin/env node --import tsx

import * as fs from 'node:fs'
import * as path from 'node:path'
import {parseArgs} from 'node:util'
import {generateFromOas} from '@opensdks/cli'

if (import.meta.url.includes(process.argv[1]!)) {
  const {
    positionals: [filename],
    values: {debug},
  } = parseArgs({
    options: {
      debug: {type: 'boolean', short: 'd'},
    },
    allowPositionals: true,
  })
  if (!filename) {
    throw new Error('You must specify a filename')
  }
  const ret = await generateFromOas(filename)

  if (debug) {
    console.log(ret.meta)
    console.log(ret.types)
  } else {
    const outName = path.basename(filename, path.extname(filename))
    fs.writeFileSync(outName + '.meta.ts', ret.meta)
    fs.writeFileSync(outName + '.d.ts', ret.types)
  }
}
