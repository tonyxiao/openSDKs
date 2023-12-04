import type {OpenAPISpec, SdkDefinition} from '@opensdks/core'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './twilio_api_v2010.oas'
import {default as twilio_api_v2010Oas} from './twilio_api_v2010.oas.json'

// Does this work with tree-shaking?
export {twilio_api_v2010Oas}

export interface Twilio_api_v2010OasTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export const twilio_api_v2010SdkDef = {
  _types: {} as Twilio_api_v2010OasTypes,
  oas: twilio_api_v2010Oas as {} as OpenAPISpec,
} satisfies SdkDefinition<paths>

export default twilio_api_v2010SdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
