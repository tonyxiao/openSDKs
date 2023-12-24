import type {ClientOptions} from '@opensdks/runtime'
import {type SdkDefinition, type SDKTypes} from '@opensdks/runtime'
import type oasTypes from '../salesloft.oas.types.js'
import {default as oasMeta} from './salesloft.oas.meta.js'

export type SalesloftSDKTypes = SDKTypes<
  oasTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {authorization: `Bearer ${string}`; [k: string]: string}
  }
>

export const salesloftSdkDef = {
  types: {} as SalesloftSDKTypes,
  oasMeta,
} satisfies SdkDefinition<SalesloftSDKTypes>

export default salesloftSdkDef
