import type {ClientOptions} from '@opensdks/runtime'
import {initSDK, type SdkDefinition, type SDKTypes} from '@opensdks/runtime'
import type leverTypes from '../lever.oas.types.js'
import {default as leverOasMeta} from './lever.oas.meta.js'

export {leverTypes}

export type LeverSDKTypes = SDKTypes<
  leverTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization: `Bearer ${string}`
      [k: string]: string | undefined
    }
  }
>

export const leverSdkDef = {
  types: {} as LeverSDKTypes,
  oasMeta: leverOasMeta,
} satisfies SdkDefinition<LeverSDKTypes>

export function initLeverSDK(opts: LeverSDKTypes['options']) {
  return initSDK(leverSdkDef, opts)
}

export type LeverSDK = ReturnType<typeof initLeverSDK>

export default leverSdkDef
