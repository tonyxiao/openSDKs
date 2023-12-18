import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type plaidTypes from '../plaid.oas.js'
import {default as plaidOasMeta} from './plaid.oas.meta.js'

export type PlaidSDKTypes = SDKTypes<
  plaidTypes,
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
  oasMeta: plaidOasMeta,
} satisfies SdkDefinition<PlaidSDKTypes>

export default plaidSdkDef
