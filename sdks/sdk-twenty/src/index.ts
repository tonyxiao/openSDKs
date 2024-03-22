import type {
  ClientOptions,
  OpenAPITypes,
  SdkDefinition,
  SDKTypes,
} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type Oas_core from '../twenty_core.oas.types.js'
import type Oas_metadata from '../twenty_metadata.oas.types.js'
import {default as oas_core} from './twenty_core.oas.meta.js'
import {default as oas_metadata} from './twenty_metadata.oas.meta.js'

// Maybe this should be in a dedicated metadata file?
export {oas_core, oas_metadata}

export type {Oas_core, Oas_metadata}

export type TwentySDKTypes = SDKTypes<
  OpenAPITypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization: `Bearer ${string}`
      [k: string]: string
    }
  }
>

export const twentySdkDef = {
  types: {} as TwentySDKTypes,
  defaultOptions: {},
  createClient(ctx, options) {
    const core = ctx.createClient<Oas_core['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_core.servers[0].url,
    })
    const metadata = ctx.createClient<Oas_metadata['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_metadata.servers[0].url,
    })
    return {core, metadata}
  },
} satisfies SdkDefinition<TwentySDKTypes>

export default twentySdkDef

export function initTwentySDK(opts: TwentySDKTypes['options']) {
  return initSDK(twentySdkDef, opts)
}

export type TwentySDK = ReturnType<typeof initTwentySDK>
