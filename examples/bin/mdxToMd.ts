#!/usr/bin/env node --import tsx
/**
 * Alternatively, you can run this script with npx
 * npx tsx ./bin/mdxToMd.ts ./README.mdx
 */
import {register} from 'node:module'
import {resolve as resolvePath} from 'node:path'
import {parseArgs} from 'node:util'
import {NodeHtmlMarkdown} from 'node-html-markdown'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

register('./mdxToMd.loader.ts', import.meta.url)

const {
  positionals: [filename],
  values: {debug},
} = parseArgs({
  options: {
    debug: {type: 'boolean', alias: 'd'},
  },
  allowPositionals: true,
})
if (!filename) {
  throw new Error('You must specify a filename')
}

const sourceMDX = resolvePath(process.cwd(), filename)

const {default: Content} = await import(sourceMDX)

const htmlToMarkdown = new NodeHtmlMarkdown()
const html = renderToStaticMarkup(React.createElement(Content))

if (debug) {
  console.log(html)
}

const markdown = htmlToMarkdown.translate(html)

console.log(markdown)
