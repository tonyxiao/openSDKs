/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jest/no-standalone-expect */
import {initSDK} from '@opensdks/runtime'
import greenhouseSdkDef from './index.js'

const apiKey = process.env['GREENHOUSE_API_KEY']!
const maybeTest = apiKey ? test : test.skip

maybeTest('get jobs from greenhouse', async () => {
  const greenhouse = initSDK(greenhouseSdkDef, {
    auth: {
      basic: {
        username: apiKey,
      },
    },
  })

  const res = await greenhouse.GET('/v1/jobs')
  expect(res.response.status).toEqual(200)
  expect(res.data.length).toBeGreaterThan(0)
})
