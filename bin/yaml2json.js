#!/usr/bin/env node
import * as fs from 'node:fs/promises'
import {parseArgs} from 'node:util'
import prettier from 'prettier'

async function readStreamToString(/** @type {NodeJS.ReadableStream} */ stream) {
  const chunks = []
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

async function main() {
  const {
    values: {output},
  } = parseArgs({options: {output: {type: 'string', short: 'o'}}})

  const yaml = await readStreamToString(process.stdin)
  const rawJson = JSON.stringify((await import('yaml')).parse(yaml))
  const prettyJson = await prettier.format(rawJson, {
    ...(await import('../prettier.config.js')),
    parser: 'json',
  })
  if (output) {
    await fs.writeFile(`${output}.json`, prettyJson)
    await fs.writeFile(`${output}.yaml`, yaml)
  } else {
    process.stdout.write(prettyJson)
  }
}

void main()
