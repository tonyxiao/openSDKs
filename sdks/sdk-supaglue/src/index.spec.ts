/* eslint-disable jest/no-standalone-expect */

import {initSDK} from '@opensdks/runtime'
import {supaglueSdkDef} from './index.js'

const apiKey = process.env['SUPAGLUE_API_KEY']!
const maybeTest = apiKey ? test : test.skip

maybeTest('get contacts', async () => {
  const supaglue = initSDK(supaglueSdkDef, {headers: {['x-api-key']: apiKey}})

  const res = await supaglue.crm.GET('/contacts', {
    params: {
      header: {
        'x-customer-id': process.env['SUPAGLUE_CUSTOMER_ID']!,
        'x-provider-name': process.env['SUPAGLUE_PROVIDER_NAME']!,
      },
    },
  })

  // const res = await supaglue.actions.POST('/passthrough', {
  //   params: {
  //     header: {
  //       'x-customer-id': process.env['SUPAGLUE_CUSTOMER_ID']!,
  //       'x-provider-name': process.env['SUPAGLUE_PROVIDER_NAME']!,
  //     },
  //   },
  //   body: {
  //     method: 'GET',
  //     path: '/contacts',
  //   },

  // })

  expect(res.data).toBeTruthy()
})
