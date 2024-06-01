/* eslint-disable jest/no-standalone-expect */

import initMergeSDK from './index.js'

const apiKey = process.env['MERGE_API_KEY']!
const maybeTest = apiKey ? test : test.skip

maybeTest('list organization integrations', async () => {
  const merge = initMergeSDK({
    headers: {authorization: `Bearer ${apiKey}`},
  })

  const res = await merge.meta.GET('/api/organizations/integrations', {})

  expect(res.data).toBeTruthy()
})

maybeTest('list integrations', async () => {
  const merge = initMergeSDK({headers: {}})

  const res = await merge.meta.GET('/api/integrations/', {})

  expect(res.data).toBeTruthy()
})
