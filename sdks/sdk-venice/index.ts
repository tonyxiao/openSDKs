import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type {ClientOptions} from '@opensdks/runtime'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './venice.oas.js'
import {default as veniceOas} from './venice.oas.json'

// Does this work with tree-shaking?
export {veniceOas as veniceOas}

export interface veniceTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export type VeniceSDKTypes = SDKTypes<
  veniceTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /** organization auth */
      'x-apikey'?: string
      /** For passthrough and resource specific api */
      'x-resource-id'?: string
      /** Bearer token, for end user auth */
      authorization?: `Bearer ${string}`
      [k: string]: string | undefined
    }
  }
>

export const veniceSdkDef = {
  types: {} as VeniceSDKTypes,
  oas: veniceOas as {} as OpenAPISpec,
} satisfies SdkDefinition<VeniceSDKTypes>

export default veniceSdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
