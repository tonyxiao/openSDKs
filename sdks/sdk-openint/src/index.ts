import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type openintTypes from '../openint.oas.types.js'
import {default as openintOasMeta} from './openint.oas.meta.js'

export type OpenIntSDKTypes = SDKTypes<
  openintTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /** organization auth */
      'x-apikey'?: string
      /** Bearer token, for end user auth */
      authorization?: `Bearer ${string}`
      /** For passthrough and resource specific api */
      'x-resource-id'?: string
      [k: string]: string | undefined
    }
  }
>

export const openintSdkDef = {
  types: {} as OpenIntSDKTypes,
  oasMeta: openintOasMeta,
} satisfies SdkDefinition<OpenIntSDKTypes>

export function initOpenIntSDK(opts: OpenIntSDKTypes['options']) {
  return initSDK(openintSdkDef, opts)
}

export type OpenIntSDK = ReturnType<typeof initOpenIntSDK>

export default initOpenIntSDK
