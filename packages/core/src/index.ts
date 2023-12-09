import type {oas30, oas31} from 'openapi3-ts'
import type {ClientOptions, OpenAPIClient} from './createClient'
import {createClient} from './createClient'

// export type * from 'openapi-typescript-helpers'
export * from './HTTPError'
export type OpenAPISpec = oas30.OpenAPIObject | oas31.OpenAPIObject
export {oas30, oas31}
export * from './links'
export * from './modifyRequest'

// MARK: - defineSdk

export interface OpenAPITypes {
  components: {}
  external: {}
  operations: {}
  paths: {}
  webhooks: {}
}

export interface SDKTypes<T extends OpenAPITypes, TOptions = ClientOptions> {
  oas: T
  options: TOptions
}

export type SdkDefinition<
  T extends SDKTypes<OpenAPITypes, ClientOptions>,
  TClient = unknown,
> = RequireAtLeastOne<{
  oas?: OpenAPISpec
  defaultOptions?: ClientOptions
}> & {
  types: T
  createClient?: (
    ctx: {
      createClient: <TPaths extends {} = T['oas']['paths']>(
        opts: ClientOptions,
      ) => OpenAPIClient<TPaths>
    },
    options: T['options'],
  ) => TClient
}

// MARK: - initSDK

// Can we make this optional to avoid needing to deal with json?
export function initSDK<
  TDef extends SdkDefinition<SDKTypes<OpenAPITypes, any>>,
>(
  ...[sdkDef, options]: ClientOptions extends TDef['types']['options']
    ? [sdkDef: TDef] | [sdkDef: TDef, options?: ClientOptions]
    : [sdkDef: TDef, options: TDef['types']['options']]
): ('createClient' extends keyof TDef
  ? ReturnType<NonNullable<TDef['createClient']>>
  : OpenAPIClient<TDef['types']['oas']['paths']>) & {def: TDef} {
  const {oas, defaultOptions} = sdkDef
  const clientOptions = {
    baseUrl: oas?.servers?.[0]?.url,
    ...defaultOptions,
    ...options,
  }

  /* eslint-disable @typescript-eslint/no-unsafe-return */
  const client =
    sdkDef.createClient?.({createClient}, clientOptions) ??
    createClient(clientOptions)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {...client, def: sdkDef} as any
}

// MARK: -

type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]
