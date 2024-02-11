/* eslint-disable jest/no-standalone-expect */

import {initSDK} from '@opensdks/runtime'
import {salesloftSdkDef} from './index.js'

const accessToken = process.env['SALESLOFT_ACCESS_TOKEN']!
const maybeTest = accessToken ? test : test.skip

maybeTest('get people', async () => {
  const salesloft = initSDK(salesloftSdkDef, {
    headers: {authorization: `Bearer ${accessToken}`},
  })

  const res = await salesloft.GET('/v2/people.json')

  expect(res.data.data).toBeGreaterThanOrEqual(0)
})
