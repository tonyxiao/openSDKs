/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jest/no-standalone-expect */
import {initSDK} from '@opensdks/runtime'
import leverSdkDef from './index.js'

const apiKey = process.env['LEVER_API_KEY']!
const maybeTest = apiKey ? test : test.skip

maybeTest('get postings from lever', async () => {
  const lever = initSDK(leverSdkDef, {
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
  })

  const res = await lever.GET('/postings/{id}', {
    params: {
      path: {
        id: 'test',
      },
    },
  })
  expect(res.response?.status).toEqual(200)
  expect(res.data).not.toBeUndefined()
})

maybeTest('get opportunities from lever', async () => {
  const lever = initSDK(leverSdkDef, {
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
  })

  const res = await lever.GET('/opportunities/{id}', {
    params: {
      path: {
        id: 'test',
      },
    },
  })
  expect(res.response?.status).toEqual(200)
  expect(res.data).not.toBeUndefined()
})

maybeTest('get contact from lever', async () => {
  const lever = initSDK(leverSdkDef, {
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
  })

  const res = await lever.GET('/contacts/{id}', {
    params: {
      path: {
        id: 'test',
      },
    },
  })
  expect(res.response?.status).toEqual(200)
  expect(res.data).not.toBeUndefined()
})

maybeTest('get tags from lever', async () => {
  const lever = initSDK(leverSdkDef, {
    headers: {
      authorization: `Bearer ${apiKey}`,
    },
  })

  const res = await lever.GET('/tags')
  expect(res.response?.status).toEqual(200)
  expect(res.data).not.toBeUndefined()
})
