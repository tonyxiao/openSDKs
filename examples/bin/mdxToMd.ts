#!/usr/bin/env node --import tsx --loader=@mdx-js/node-loader
/**
 * Alternatively, you can run this script with npx
 * npx tsx --loader=@mdx-js/node-loader ./bin/mdxToMd.ts ./README.mdx
 */
import {resolve as resolvePath} from 'node:path'
import {parseArgs} from 'node:util'
import {NodeHtmlMarkdown} from 'node-html-markdown'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'

const {
  positionals: [filename],
} = parseArgs({allowPositionals: true})
if (!filename) {
  throw new Error('You must specify a filename')
}

const sourceMDX = resolvePath(process.cwd(), filename)

const {default: Content} = await import(sourceMDX)

const htmlToMarkdown = new NodeHtmlMarkdown()
const html = renderToStaticMarkup(React.createElement(Content))
const markdown = htmlToMarkdown.translate(html)

console.log(markdown)
