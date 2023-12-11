import {NodeHtmlMarkdown} from 'node-html-markdown'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import Content from './README.mdx'

const htmlToMarkdown = new NodeHtmlMarkdown()

const html = renderToStaticMarkup(React.createElement(Content))

const markdown = htmlToMarkdown.translate(html)

console.log(markdown)
