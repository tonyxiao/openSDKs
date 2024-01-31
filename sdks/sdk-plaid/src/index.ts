import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type {oasTypes} from '../plaid.oas.types.js'
import {oasMeta} from './plaid.oas.meta.js'

export type PlaidSDKTypes = SDKTypes<
  oasTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      'PLAID-CLIENT-ID': string
      'PLAID-SECRET': string
      [k: string]: string
    }
  }
>

export const plaidSdkDef = {
  types: {} as PlaidSDKTypes,
  oasMeta,
} satisfies SdkDefinition<PlaidSDKTypes>

export function initPlaidSDK(opts: PlaidSDKTypes['options']) {
  return initSDK(plaidSdkDef, opts)
}

export type PlaidSDK = ReturnType<typeof initPlaidSDK>

export default plaidSdkDef
