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

export type TwentySDKTypes = SDKTypes<
  OpenAPITypes,
  ClientOptions & {accountSid: string; authToken: string}
>

export const twentySdkDef = {
  types: {} as TwentySDKTypes,
  defaultOptions: {},
  createClient(ctx, {accountSid, authToken, ..._options}) {
    const headers = new Headers(_options.headers as HeadersInit)
    headers.set('Authorization', `Basic ${btoa(`${accountSid}:${authToken}`)}`)
    const options: typeof _options = {
      ..._options,
      baseUrl: _options.baseUrl ?? oas_core.servers[0].url,
      headers,
    }
    const core = ctx.createClient<Oas_core['paths']>(options)
    const metadata = ctx.createClient<Oas_metadata['paths']>(options)
    return {core, metadata}
  },
} satisfies SdkDefinition<TwentySDKTypes>

export default twentySdkDef

export function initTwentySDK(opts: TwentySDKTypes['options']) {
  return initSDK(twentySdkDef, opts)
}

export type TwentySDK = ReturnType<typeof initTwentySDK>
