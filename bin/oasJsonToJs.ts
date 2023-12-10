#!/usr/bin/env node
import fs from 'node:fs'
import {join as pathJoin} from 'node:path'
import prettier from 'prettier'

/**
 * This is used to workaround the fact that many applications such as
 * webpack does not natively know how to import / bundle JSON files
 * And we also don't want to use something ugly heavy handed like a roll up
 * So simpliest solution is to rewrite the JSON file as a JS file
 */
export async function writeJsonForTs(jsonFileName: string, outDir = '') {
  const rawJson = fs.readFileSync(jsonFileName, 'utf8')
  const formattedJson = await prettier.format(rawJson, {
    ...(require('../prettier.config') as {}),
    parser: 'json',
  })

  const jsFileName = pathJoin(outDir, `${jsonFileName}.js`)
  const jsContent = `module.exports = \n${formattedJson}`
  fs.writeFileSync(jsFileName, jsContent, 'utf8')
}

if (require.main === module) {
  const inputDir = process.argv[2]
  const outDir = process.argv[3] ?? ''

  if (!inputDir) {
    console.error('Please provide a dir name as a command line argument.')
    process.exit(1)
  }

  fs.readdirSync(inputDir, {
    withFileTypes: true,
  })
    .filter((f) => f.name.endsWith('oas.json'))
    .forEach((f) => writeJsonForTs(pathJoin(inputDir, f.name), outDir))
}
