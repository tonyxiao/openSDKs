import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type {ClientOptions} from '@opensdks/runtime'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from '#module/plaid.oas.js'
import {default as plaidOas} from '#module/plaid.oas.json'

// Does this work with tree-shaking?
export {plaidOas as plaidOas}

export interface plaidTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

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
  oas: plaidOas as {} as OpenAPISpec,
} satisfies SdkDefinition<PlaidSDKTypes>

export default plaidSdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
