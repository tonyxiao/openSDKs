/* eslint-disable jest/no-standalone-expect */
import {initChargepointSDK} from './index.js'

const {['CHARGEPOINT_USERNAME']: username, ['CHARGEPOINT_PASSWORD']: password} =
  process.env
const maybeTest = username && password ? test : test.skip

// TODO: Rename this to ChargePoint
const sdk = initChargepointSDK({})

maybeTest('chargepoint login', async () => {
  const res = await sdk.POST('/user/login', {
    body: {
      username: username!,
      password: password!,
      timezone: 'America/Los_Angeles',
      timezone_offset: 420,
    },
  })
  expect(res.response.status).toEqual(200)
  expect(res.response.headers.getSetCookie().length).toBeGreaterThan(0)
})
