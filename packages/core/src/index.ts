import type {oas30, oas31} from 'openapi3-ts'
import type {ClientOptions} from './createClient'
import {createClient} from './createClient'

export * from './HTTPError'
export type OpenAPISpec = oas30.OpenAPIObject | oas31.OpenAPIObject

// export interface SdkTypes {
//   components: unknown
//   external: unknown
//   operations: unknown
//   paths: unknown
//   webhooks: unknown
// }

/** Get this from openapi */
export interface SdkDefinition<Paths extends {}> {
  _types: {
    paths: Paths
  }
  oas: OpenAPISpec
  options?: Record<string, unknown>
}

// This is necessary because we cannot publish inferred type otherwise
// @see https://share.cleanshot.com/06NvskP0
export type SDK<Paths extends {}> = ReturnType<typeof createClient<Paths>> & {
  // This should be made optional to keep the bundle size small
  // company should be able to opt-in for things like validation
  oas: OpenAPISpec
}

// Can we make this optional to avoid needing to deal with json?
export function initSDK<TDef extends SdkDefinition<{}>>(
  ...[sdkDef, options]: 'options' extends keyof TDef
    ? [
        sdkDef: TDef,
        options: Omit<ClientOptions, keyof TDef['options']> & TDef['options'],
      ]
    : [sdkDef: TDef] | [sdkDef: TDef, options?: ClientOptions]
): SDK<TDef['_types']['paths']> {
  const {oas} = sdkDef
  const client = createClient<TDef['_types']['paths']>({
    baseUrl: oas.servers?.[0]?.url,
    ...options,
  })
  return {...client, oas}
}
