/* eslint-disable jest/no-standalone-expect */

import {initXeroSDK} from './index.js'

const accessToken = process.env['XERO_ACCESS_TOKEN']!
const maybeTest = accessToken ? test : test.skip

maybeTest('list accounts', async () => {
  const xero = initXeroSDK({
    headers: {authorization: `Bearer ${accessToken}`},
  })

  const conns = await xero.listConnections()
  const firstTenantId = conns[0]?.tenantId

  const res = await xero.GET('/Accounts', {
    params: {header: {'xero-tenant-id': firstTenantId!}},
  })

  expect(res.data.Accounts?.length).toBeGreaterThanOrEqual(0)
})
