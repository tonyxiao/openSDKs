/* eslint-disable jest/no-standalone-expect */
import {jest} from '@jest/globals'
import initStripeSDK from './index.js'

jest.setTimeout(70 * 15 * 1000) // In case of cold start

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const apiKey = process.env['STRIPE_APIKEY']!
const maybeTest = apiKey ? test : test.skip

maybeTest('get account', async () => {
  const stripe = initStripeSDK({headers: {authorization: `Bearer ${apiKey}`}})
  expect(await stripe.GET('/v1/account').then((r) => r.data)).toBeTruthy()
})
