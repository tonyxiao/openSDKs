import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type {oasTypes} from '../revert.oas.types.js'
import {oasMeta} from './revert.oas.meta.js'

export type RevertSDKTypes = SDKTypes<
  oasTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      'x-revert-api-token': string
      'x-revert-t-id': string
      'x-api-version'?: string
      [k: string]: string | undefined
    }
  }
>

export const revertSdkDef = {
  types: {} as RevertSDKTypes,
  oasMeta,
} satisfies SdkDefinition<RevertSDKTypes>

export function initRevertSDK(opts: RevertSDKTypes['options']) {
  return initSDK(revertSdkDef, opts)
}

export type RevertSDK = ReturnType<typeof initRevertSDK>

export default revertSdkDef
