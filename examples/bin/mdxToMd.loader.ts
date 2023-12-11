import {createLoader} from '@mdx-js/node-loader'
import codeImport from 'remark-code-import'

// This extra file is needed due to limitation of the `register` api in node
export const {load} = createLoader({
  remarkPlugins: [[codeImport]],
})
