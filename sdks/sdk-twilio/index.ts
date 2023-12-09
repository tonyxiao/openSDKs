import type {OpenAPITypes, SdkDefinition, SDKTypes} from '@opensdks/core'
import type {ClientOptions} from '@opensdks/core/createClient'
import type * as api_v2010 from './twilio_api_v2010.oas'
import {default as oas_api_v2010} from './twilio_api_v2010.oas.json'
import type * as messaging_v1 from './twilio_messaging_v1.oas'
import {default as oas_messaging_v1} from './twilio_messaging_v1.oas.json'

export {oas_api_v2010, oas_messaging_v1}

export interface Oas_api_v2010 {
  components: api_v2010.components
  external: api_v2010.external
  operations: api_v2010.operations
  paths: api_v2010.paths
  webhooks: api_v2010.webhooks
}
export interface Oas_messaging_v1 {
  components: messaging_v1.components
  external: messaging_v1.external
  operations: messaging_v1.operations
  paths: messaging_v1.paths
  webhooks: messaging_v1.webhooks
}

export type TwilioSDKTypes = SDKTypes<
  OpenAPITypes,
  ClientOptions & {accountSid: string; authToken: string}
>

export const twilioSdkDef = {
  types: {} as TwilioSDKTypes,
  defaultOptions: {},
  createClient(ctx, {accountSid, authToken, ..._options}) {
    const headers = new Headers(_options.headers as HeadersInit)
    headers.set('Authorization', `Basic ${btoa(`${accountSid}:${authToken}`)}`)
    const options = {..._options, headers}
    const api_v2010 = ctx.createClient<Oas_api_v2010['paths']>(options)
    const messaging_v1 = ctx.createClient<Oas_messaging_v1['paths']>(options)
    return {api_v2010, messaging_v1}
  },
} satisfies SdkDefinition<TwilioSDKTypes>

export default twilioSdkDef
