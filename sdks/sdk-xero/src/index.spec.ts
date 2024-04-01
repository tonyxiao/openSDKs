/* eslint-disable jest/no-standalone-expect */

import {initXeroSDK} from './index.js'

const accessToken = process.env['XERO_ACCESS_TOKEN']!
const maybeTest = accessToken ? test : test.skip

maybeTest('list accounts', async () => {
  const xero1 = initXeroSDK({
    headers: {authorization: `Bearer ${accessToken}`},
  })
  const conns = await xero1.identity.GET('/Connections')
  const firstTenantId = conns.data[0]?.tenantId
  const xero = initXeroSDK({
    headers: {
      authorization: `Bearer ${accessToken}`,
      'xero-tenant-id': firstTenantId,
    },
  })
  const res = await xero.accounting.GET('/Accounts', {})

  expect(res.data.Accounts?.length).toBeGreaterThanOrEqual(0)
})
