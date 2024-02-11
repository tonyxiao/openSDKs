import {
  initSDK,
  type ClientOptions,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type PipedriveTypes from '../pipedrive.oas.types.js'
import {default as oasMeta} from './pipedrive.oas.meta.js'

export type PipedriveSDKTypes = SDKTypes<
  PipedriveTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {authorization: `Bearer ${string}`; [k: string]: string}
  }
>

export const pipedriveSdkDef = {
  types: {} as PipedriveSDKTypes,
  oasMeta,
} satisfies SdkDefinition<PipedriveSDKTypes>

export function initPipedriveSDK(opts: PipedriveSDKTypes['options']) {
  return initSDK(pipedriveSdkDef, opts)
}

export type PipedriveSDK = ReturnType<typeof initPipedriveSDK>

export default pipedriveSdkDef
