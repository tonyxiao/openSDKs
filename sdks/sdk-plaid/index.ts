import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type plaidTypes from '#module/plaid.oas.js'
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

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
