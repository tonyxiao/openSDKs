/* eslint-disable jest/no-standalone-expect */
import type {oas30} from '@opensdks/runtime'
import {initSalesforceSDK} from './index.js'

const instanceUrl = process.env['SALESFORCE_INSTANCE_URL']
const maybeTest = instanceUrl ? test : test.skip
// To get list of available versions, visit $instanceUrl/services/data
const apiVersion = 'v59.0'

const sfdc = initSalesforceSDK({
  baseUrl: instanceUrl + '/services/data/' + apiVersion,
  headers: {authorization: `Bearer ${process.env['SALESFORCE_ACCESS_TOKEN']}`},
})

maybeTest('get openapi spec', async () => {
  const getOasUrlRes = await sfdc.request<{href: string}>(
    'POST',
    '/async/specifications/oas3',
    {body: {resources: ['*']}},
  )

  expect(getOasUrlRes.response.status).toEqual(202)
  const oasRes = await sfdc.request<oas30.OpenAPIObject>(
    'GET',
    getOasUrlRes.data.href.replace('/' + apiVersion, ''),
    // e.g. '/async/specifications/oas3/NTByM3gwMDAwMDA0Qzkz',
  )
  expect(oasRes.response.status).toEqual(200)
  expect(oasRes.data.info.version).toEqual('3.0.1')
  // delete oasRes.data.servers because it would be specific to that instance url...
  // Notably oasRes.data.info.version also contains the api version to use...
})

maybeTest('list and get account', async () => {
  const listRes = await sfdc.GET('/sobjects/Account')
  // console.log('listRes', res.data)
  expect(listRes.response.status).toEqual(200)

  const accountId = listRes.data.recentItems?.[0]?.id

  const getRes = await sfdc.GET('/sobjects/Account/{id}', {
    params: {path: {id: accountId!}}, // e.g. '0013x00002S7Tg1AAF'
  })
  // console.log('getRes', res.data)
  expect(getRes.response.status).toEqual(200)
})
