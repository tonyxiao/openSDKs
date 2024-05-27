/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jest/no-standalone-expect */
import {initSDK} from '@opensdks/runtime'
import leverSdkDef from './index.js'

const apiKey = process.env['LEVER_API_KEY']!
const maybeTest = apiKey ? test : test.skip

const lever = initSDK(
  {
    ...leverSdkDef,
    oasMeta: {
      ...leverSdkDef.oasMeta,
      servers: [{url: 'https://api.sandbox.lever.co/v1'}], // Used for sandbox account.
    },
  },
  {
    auth: {
      basic: {
        username: apiKey,
      },
    },
    envName: 'sandbox',
  },
)

maybeTest('get postings from lever', async () => {
  const res = await lever.GET('/postings')
  expect(res.response?.status).toEqual(200)
  expect(res.data).not.toBeUndefined()
  expect(res.data.hasNext).toBeDefined()
})

maybeTest('get opportunities from lever', async () => {
  const res = await lever.GET('/opportunities')
  expect(res.response?.status).toEqual(200)
  expect(res.data).not.toBeUndefined()
  expect(res.data.hasNext).toBeDefined()
})

maybeTest('get offers for an opportunity lever', async () => {
  const res = await lever.GET('/opportunities', {
    params: {
      query: {
        expand: 'contact',
      },
    },
  })

  const res2 = await lever.GET('/opportunities/{id}/offers', {
    params: {
      path: {
        id: res.data?.data[0]!.id,
      },
    },
  })

  expect(res.response?.status).toEqual(200)
  expect(res.data).not.toBeUndefined()
  expect(res2.response?.status).toEqual(200)
  expect(res2.data).not.toBeUndefined()
})

maybeTest('get tags from lever', async () => {
  const res = await lever.GET('/tags')
  expect(res.response?.status).toEqual(200)
  expect(res.data).not.toBeUndefined()
  expect(res.data.hasNext).toBeDefined()
})
