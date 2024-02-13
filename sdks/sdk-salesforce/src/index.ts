import {
  initSDK,
  type ClientOptions,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type salesforceTypes from '../salesforce.oas.types.js'

export type SalesforceSDKTypes = SDKTypes<salesforceTypes, ClientOptions>

export type QueryResponse<T> = {
  totalSize: number
  done: boolean
  records: Array<
    {
      attributes: {
        type: string
        url: string
      }
      // This now depends on the object being asked for...
      // Id: string
      // Name: string
    } & T
  >
}

// TODO: Add handling for instanceUrl, apiVersion and auth tokens into this
export const salesforceSdkDef = {
  types: {} as SalesforceSDKTypes,
  defaultOptions: {}, // needed due to instance-specific server url in oasMeta 
  // Cannot use the oasMeta because the serverUrl is going to be instance dependent
  createClient: (ctx, options) => {
    const client = ctx.createClient(options)
    // TODO: Add typesafe handling of response from query just like supablue postgREST.js client
    // @see https://github.com/supabase/postgrest-js?tab=readme-ov-file
    /** NOTE: `SELECT *` is now allowed by Salesforce. Exact columns need to be specified */
    function query<T = {[k: string]: any}>(query: string) {
      return client
        .request('GET', '/query', {params: {query: {q: query}}})
        .then((r) => r.data as QueryResponse<T>)
    }
    return {
      ...client,
      query,
      // TODO: Add other api such as tooling / bulk etc.
    }
  },
} satisfies SdkDefinition<SalesforceSDKTypes>

export default salesforceSdkDef

export function initSalesforceSDK(opts: SalesforceSDKTypes['options']) {
  return initSDK(salesforceSdkDef, opts)
}

export type SalesforceSDK = ReturnType<typeof initSalesforceSDK>
