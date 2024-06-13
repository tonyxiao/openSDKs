/* eslint-disable jest/no-standalone-expect */
import {jest} from '@jest/globals'
import initStripeSDK from './index.js'

jest.setTimeout(70 * 15 * 1000) // In case of cold start

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const apiKey = process.env['STRIPE_APIKEY']!
const maybeTest = apiKey ? test : test.skip

const stripe = initStripeSDK({headers: {authorization: `Bearer ${apiKey}`}})

maybeTest('get account', async () => {
  expect(await stripe.GET('/v1/account').then((r) => r.data)).toBeTruthy()
})

maybeTest('create connected account', async () => {
  expect(
    await stripe
      .POST('/v1/accounts', {
        body: {
          controller: {
            stripe_dashboard: {
              type: 'none',
            },
            fees: {
              payer: 'application',
            },
            losses: {
              payments: 'application',
            },
            requirement_collection: 'application',
          },
          capabilities: {
            transfers: {requested: true},
            card_payments: {requested: true},
          },
          country: 'US',
        },
      })
      .then((r) => r.data),
  ).toBeTruthy()
})
