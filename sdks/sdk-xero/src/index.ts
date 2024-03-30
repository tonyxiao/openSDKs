import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type xeroTypes from '../xero_accounting.oas.types.js'
import {default as xeroOasMeta} from './xero_accounting.oas.meta.js'

export type XeroSDKTypes = SDKTypes<
  xeroTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization: `Bearer ${string}`
      [k: string]: string
    }
  }
>

export const xeroSdkDef = {
  types: {} as XeroSDKTypes,
  oasMeta: xeroOasMeta,
} satisfies SdkDefinition<XeroSDKTypes>

export function initXeroSDK(opts: XeroSDKTypes['options']) {
  return initSDK(xeroSdkDef, opts)
}

export default xeroSdkDef
