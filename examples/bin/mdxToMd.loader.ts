import {createLoader} from '@mdx-js/node-loader'
import codeImport from 'remark-code-import'
import remarkShikiTwoslash from 'remark-shiki-twoslash'

// https://github.com/shikijs/twoslash/issues/125#issuecomment-1710838839
function remarkHtmlToJsx() {
  async function transform(...args: any[]) {
    // Async import since these packages are all in ESM
    const {visit, SKIP} = await import('unist-util-visit')
    const {mdxFromMarkdown} = await import('mdast-util-mdx')
    const {fromMarkdown} = await import('mdast-util-from-markdown')
    const {mdxjs} = await import('micromark-extension-mdxjs')

    // This is a horror show, but it's the only way I could get the raw HTML into MDX.
    const [ast] = args
    visit(ast, 'html', (node) => {
      const escapedHtml = JSON.stringify(node.value)
      const jsx = `<div dangerouslySetInnerHTML={{__html: ${escapedHtml} }}/>`
      const rawHtmlNode = fromMarkdown(jsx, {
        extensions: [mdxjs()],
        mdastExtensions: [mdxFromMarkdown()],
      }).children[0]

      Object.assign(node, rawHtmlNode)

      return SKIP
    })
  }

  return transform
}

// This extra file is needed due to limitation of the `register` api in node
export const {load} = createLoader({
  remarkPlugins: [
    [codeImport],
    [remarkShikiTwoslash.default],
    [remarkHtmlToJsx],
  ],
})
