import {
  initSDK,
  type ClientOptions,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type stripeTypes from '../stripe.oas.types.js'
import {default as stripeOasMeta} from './stripe.oas.meta.js'

export type StripeSDKTypes = SDKTypes<
  stripeTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /** either Bearer $apiKey or Basic with apiKey as username */
      authorization: `Bearer ${string}` | `Basic ${string}`
      /** https://docs.stripe.com/api/versioning `2024-04-10` */
      'stripe-version'?: string
      /** https://docs.stripe.com/api/connected-accounts e.g. `acct_1032D82eZvKYlo2C` */
      'stripe-account'?: string
      [k: string]: string | undefined
    }
  }
>

export const stripeSdkDef = {
  types: {} as StripeSDKTypes,
  oasMeta: stripeOasMeta,
} satisfies SdkDefinition<StripeSDKTypes>

export function initStripeSDK(opts: StripeSDKTypes['options']) {
  return initSDK(stripeSdkDef, opts)
}

export type StripeSDK = ReturnType<typeof initStripeSDK>

export default initStripeSDK
