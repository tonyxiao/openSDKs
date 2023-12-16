/* eslint-disable jest/no-standalone-expect */

import {initSDK} from '@opensdks/runtime'
import {apolloSdkDef} from './index.js'

const apiKey = process.env['APOLLO_API_KEY']!
const maybeTest = apiKey ? test : test.skip

maybeTest('get email accounts', async () => {
  const apollo = initSDK(apolloSdkDef, {api_key: apiKey})

  const res = await apollo.GET('/v1/email_accounts')

  expect(res.data.email_accounts.length).toBeGreaterThanOrEqual(0)
})
