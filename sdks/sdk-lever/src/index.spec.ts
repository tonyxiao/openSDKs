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
