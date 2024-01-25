import {
  initSDK,
  type ClientOptions,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type salesforceTypes from '../salesforce.oas.types.js'

export type SalesforceSDKTypes = SDKTypes<salesforceTypes, ClientOptions>

export const salesforceSdkDef = {
  types: {} as SalesforceSDKTypes,
  defaultOptions: {},
  // Cannot use the oasMeta because the serverUrl is going to be instance dependent
} satisfies SdkDefinition<SalesforceSDKTypes>

export default salesforceSdkDef

export function initSalesforceSDK(opts: SalesforceSDKTypes['options']) {
  return initSDK(salesforceSdkDef, opts)
}

export type SalesforceSDK = ReturnType<typeof initSalesforceSDK>
