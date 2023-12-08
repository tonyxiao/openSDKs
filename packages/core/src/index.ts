import type {oas30, oas31} from 'openapi3-ts'
import type {ClientOptions, OpenAPIClient} from './createClient'
import {createClient} from './createClient'

// export type * from 'openapi-typescript-helpers'
// export {createClient} from './createClient'
export * from './HTTPError'
export type OpenAPISpec = oas30.OpenAPIObject | oas31.OpenAPIObject

export type {createClient}

export interface OpenAPITypes {
  components: {}
  external: {}
  operations: {}
  paths: {}
  webhooks: {}
}

/** Get this from openapi */
export interface SdkDefinition<
  TTypes extends OpenAPITypes = OpenAPITypes,
  TClient = unknown,
  TOptions = Record<string, unknown>,
> {
  _types?: TTypes
  oas: OpenAPISpec
  options?: TOptions
  extend?: (
    client: OpenAPIClient<TTypes['paths']>,
    options: TOptions,
  ) => TClient
}

// This is necessary because we cannot publish inferred type otherwise
// @see https://share.cleanshot.com/06NvskP0
export type SDK<TTypes extends OpenAPITypes, T> = OpenAPIClient<
  TTypes['paths']
> & {
  // This should be made optional to keep the bundle size small
  // company should be able to opt-in for things like validation
  oas: OpenAPISpec
} & T

// Can we make this optional to avoid needing to deal with json?
export function initSDK<TDef extends SdkDefinition>(
  ...[sdkDef, options]: 'options' extends keyof TDef
    ? [
        sdkDef: TDef,
        options: Omit<ClientOptions, keyof TDef['options']> & TDef['options'],
      ]
    : [sdkDef: TDef] | [sdkDef: TDef, options?: ClientOptions]
): SDK<
  NonNullable<TDef['_types']>,
  'extend' extends keyof TDef ? ReturnType<NonNullable<TDef['extend']>> : {}
> {
  const {oas} = sdkDef
  const client = createClient<NonNullable<TDef['_types']>['paths']>({
    baseUrl: oas.servers?.[0]?.url,
    ...options,
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
  const ret = sdkDef.extend?.(client as any, options as any) ?? client

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any
  return {...ret, oas} as any
}
