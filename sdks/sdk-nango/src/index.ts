import type {ClientOptions} from '@opensdks/runtime'
import {initSDK, type SdkDefinition, type SDKTypes} from '@opensdks/runtime'
import type nangoTypes from '../nango.oas.types.js'
import {default as nangoOasMeta} from './nango.oas.meta.js'

export type NangoSDKTypes = SDKTypes<
  nangoTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /** Nango secret key goes into the bearer header */
      authorization: `Bearer ${string}`
      [k: string]: string
    }
  }
>

export const nangoSdkDef = {
  types: {} as NangoSDKTypes,
  oasMeta: nangoOasMeta,
} satisfies SdkDefinition<NangoSDKTypes>

export function initNangoSDK(opts: NangoSDKTypes['options']) {
  return initSDK(nangoSdkDef, opts)
}

export type NangoSDK = ReturnType<typeof initNangoSDK>

export default nangoSdkDef
