/* eslint-disable jest/no-standalone-expect */
import {initSDK} from '@opensdks/core'
import {qboSdkDef} from './index'

const realmId = process.env['QBO_REALM_ID']!
const maybeTest = realmId ? test : test.skip

maybeTest('get QBO company', async () => {
  const qbo = initSDK(qboSdkDef, {
    realmId,
    envName: 'sandbox',
    accessToken: process.env['QBO_ACCESS_TOKEN']!,
  })

  const res = await qbo.GET('/companyinfo/{id}', {
    params: {path: {id: realmId}},
  })

  expect(res.response.status).toEqual(200)
  expect(res.data.CompanyInfo.CompanyName).toEqual('Sandbox Company_US_1')
})
