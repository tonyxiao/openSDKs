/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable jest/no-standalone-expect */
import {initChargepointSDK} from './index.js'

const {
  ['CHARGEPOINT_USERNAME']: username,
  ['CHARGEPOINT_PASSWORD']: password,
  ['CHARGEPOINT_AUTH_TOKEN']: authToken,
} = process.env
const maybeTest = username && password ? test : test.skip

// TODO: Rename this to ChargePoint

let token = authToken

const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

maybeTest.skip('chargepoint login', async () => {
  const sdk = initChargepointSDK({
    headers: {'User-Agent': userAgent},
  })
  const res = await sdk.sso.POST('/user/login', {
    body: {
      username: username!,
      password: password!,
      timezone: 'America/Los_Angeles',
      timezone_offset: 420,
    },
  })
  expect(res.response.status).toEqual(200)
  expect(res.response.headers.getSetCookie().length).toBeGreaterThan(0)

  token = res.data.token
})

const maybeTest2 = authToken ? test : test.skip

maybeTest2.skip('chargepoint getRegionQueues', async () => {
  const sdk = initChargepointSDK({
    headers: {Cookie: `auth-session=${token}`, 'User-Agent': userAgent},
  })

  const res2 = await sdk.na.POST('/index.php/community/getRegionQueues')
  expect(res2.data).toBeTruthy()
})
