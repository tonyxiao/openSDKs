import type {ClientOptions} from '@opensdks/runtime'
import {initSDK, type SdkDefinition, type SDKTypes} from '@opensdks/runtime'
import type gongTypes from '../gong.oas.types.js'
import {default as gongOasMeta} from './gong.oas.meta.js'

export type GongSDKTypes = SDKTypes<
  gongTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {authorization: `Bearer ${string}`; [k: string]: string}
  }
>

export const gongSdkDef = {
  types: {} as GongSDKTypes,
  // TODO: Add handling for instance url as gong's api spec uses https://127.0.0.1:8443 as server url...
  oasMeta: gongOasMeta,
} satisfies SdkDefinition<GongSDKTypes>

export function initGongSDK(opts: GongSDKTypes['options']) {
  return initSDK(gongSdkDef, opts)
}

export type GongSDK = ReturnType<typeof initGongSDK>

export default gongSdkDef
