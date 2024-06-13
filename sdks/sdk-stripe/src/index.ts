import {
  createFormUrlEncodedBodySerializer,
  initSDK,
  type ClientOptions,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type stripeTypes from '../stripe.oas.types.js'
import {default as stripeOasMeta} from './stripe.oas.meta.js'

/** https://docs.stripe.com/api/versioning e.g. `2024-04-10` */
export type StripeVersion =
  stripeTypes['operations']['PostWebhookEndpoints']['requestBody']['content']['application/x-www-form-urlencoded']['api_version']

export type StripeSDKTypes = SDKTypes<
  stripeTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /** either Bearer $apiKey or Basic with apiKey as username */
      authorization: `Bearer ${string}` | `Basic ${string}`
      'stripe-version'?: StripeVersion
      /** https://docs.stripe.com/api/connected-accounts e.g. `acct_1032D82eZvKYlo2C` */
      'stripe-account'?: string
      [k: string]: string | undefined
    }
  }
>

export const stripeSdkDef = {
  types: {} as StripeSDKTypes,
  oasMeta: stripeOasMeta,
  createClient(ctx, options) {
    return ctx.createClient({
      bodySerializer: createFormUrlEncodedBodySerializer({
        keypathStyle: 'bracket',
      }),
      ...options,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        ...options.headers,
      },
    })
  },
} satisfies SdkDefinition<StripeSDKTypes>

export function initStripeSDK(opts: StripeSDKTypes['options']) {
  return initSDK(stripeSdkDef, opts)
}

export type StripeSDK = ReturnType<typeof initStripeSDK>

export default initStripeSDK
