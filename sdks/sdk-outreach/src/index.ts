import type {ClientOptions} from '@opensdks/runtime'
import {initSDK, type SdkDefinition, type SDKTypes} from '@opensdks/runtime'
import type outreachTypes from '../outreach.oas.types.js'
import {default as outreachOasMeta} from './outreach.oas.meta.js'

export type OutreachSDKTypes = SDKTypes<
  outreachTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {authorization: `Bearer ${string}`; [k: string]: string}
  }
>

export const outreachSdkDef = {
  types: {} as OutreachSDKTypes,
  oasMeta: outreachOasMeta,
} satisfies SdkDefinition<OutreachSDKTypes>

export function initOutreachSDK(opts: OutreachSDKTypes['options']) {
  return initSDK(outreachSdkDef, opts)
}

export type OutreachSDK = ReturnType<typeof initOutreachSDK>

export default outreachSdkDef
