import type {OpenAPISpec, SdkDefinition} from '@opensdks/core'
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

export const twilio_messaging_v1SdkDef = {
  _types: {} as Twilio_messaging_v1OasTypes,
  oas: twilio_messaging_v1Oas as {} as OpenAPISpec,
} satisfies SdkDefinition<paths>

export default twilio_messaging_v1SdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
