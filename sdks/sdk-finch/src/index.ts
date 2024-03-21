import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type {oasTypes} from '../finch.oas.types.js'
import {oasMeta} from './finch.oas.meta.js'

export type FinchSDKTypes = SDKTypes<
  oasTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /**
       * Bearer: connection-specific access token for connection specific requests
       * Basic: base64 encoded client_id:client_secret for non connection specific requests
       * TODO: Would be nice to get some helper with this type of request.
       * */
      authorization: `Bearer ${string}` | `Basic ${string}`
      /** 
       * Header used to specify the version for a given API request. 
       * Current version is 2020-09-17. 
       * */
      'FINCH-API-VERSION': string
      [k: string]: string
    }
  }
>

export const finchSdkDef = {
  types: {} as FinchSDKTypes,
  oasMeta,
} satisfies SdkDefinition<FinchSDKTypes>

export function initFinchSDK(opts: FinchSDKTypes['options']) {
  return initSDK(finchSdkDef, opts)
}

export type FinchSDK = ReturnType<typeof initFinchSDK>

export default finchSdkDef
