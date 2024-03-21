/* eslint-disable jest/no-standalone-expect */

import {initSDK} from '@opensdks/runtime'
import {finchSdkDef} from './index.js'

const apiKey = process.env['FINCH_ACCESS_TOKEN']!
const maybeTest = apiKey ? test : test.skip

maybeTest('get company', async () => {
  const finch = initSDK(finchSdkDef, {
    headers: {
      'FINCH-API-VERSION': '2020-09-17',
      authorization: `Bearer ${apiKey}`,
    },
  })

  const res = await finch.GET('/employer/company', {
    params: {header: {'Finch-API-Version': '2020-09-17'}},
  })

  expect(res.data.id).toBeTruthy()
})
