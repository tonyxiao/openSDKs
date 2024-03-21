/* eslint-disable jest/no-standalone-expect */

import {initSDK} from '@opensdks/runtime'
import {finchSdkDef} from './index.js'

const accessToken = process.env['FINCH_ACCESS_TOKEN']!
const maybeTest = accessToken ? test : test.skip

maybeTest('get company', async () => {
  const finch = initSDK(finchSdkDef, {
    headers: {
      'FINCH-API-VERSION': '2020-09-17',
      authorization: `Bearer ${accessToken}`,
    },
  })

  const res = await finch.GET('/employer/company')

  expect(res.data.id).toBeTruthy()
})
