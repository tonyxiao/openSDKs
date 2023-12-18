import type {
  ClientOptions,
  OpenAPITypes,
  SdkDefinition,
  SDKTypes,
} from '@opensdks/runtime'
import type Oas_api_v2010 from '../twilio_api_v2010.oas.types.js'
import type Oas_messaging_v1 from '../twilio_messaging_v1.oas.types.js'
import {default as oas_api_v2010} from './twilio_api_v2010.oas.meta.js'
import {default as oas_messaging_v1} from './twilio_messaging_v1.oas.meta.js'

// Maybe this should be in a dedicated metadata file?
export {oas_api_v2010, oas_messaging_v1}

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
    const options: typeof _options = {
      baseUrl: oas_api_v2010.servers[0].url,
      ..._options,
      headers,
    }
    const api_v2010 = ctx.createClient<Oas_api_v2010['paths']>(options)
    const messaging_v1 = ctx.createClient<Oas_messaging_v1['paths']>(options)
    return {api_v2010, messaging_v1}
  },
} satisfies SdkDefinition<TwilioSDKTypes>

export default twilioSdkDef
