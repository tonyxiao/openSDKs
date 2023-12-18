import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type veniceTypes from '../venice.oas.types.js'
import {default as veniceOasMeta} from './venice.oas.meta.js'

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
  oasMeta: veniceOasMeta,
} satisfies SdkDefinition<VeniceSDKTypes>

export function initVeniceSDK(opts: VeniceSDKTypes['options']) {
  return initSDK(veniceSdkDef, opts)
}

export default initVeniceSDK
