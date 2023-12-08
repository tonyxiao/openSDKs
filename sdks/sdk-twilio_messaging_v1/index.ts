import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/core'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './twilio_messaging_v1.oas'
import {default as twilio_messaging_v1Oas} from './twilio_messaging_v1.oas.json'

// Does this work with tree-shaking?
export {twilio_messaging_v1Oas}

export interface Twilio_messaging_v1OasTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export type TwilioSDKTypes = SDKTypes<Twilio_messaging_v1OasTypes>

export const twilio_messaging_v1SdkDef = {
  types: {} as TwilioSDKTypes,
  oas: twilio_messaging_v1Oas as {} as OpenAPISpec,
} satisfies SdkDefinition<TwilioSDKTypes>

export default twilio_messaging_v1SdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
