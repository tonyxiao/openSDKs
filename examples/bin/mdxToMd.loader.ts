import {createLoader} from '@mdx-js/node-loader'
import codeImport from 'remark-code-import'
import remarkToc from 'remark-toc'

// This extra file is needed due to limitation of the `register` api in node
export const {load} = createLoader({
  remarkPlugins: [[codeImport], [remarkToc]],
})
