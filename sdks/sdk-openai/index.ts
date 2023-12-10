import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type {ClientOptions} from '@opensdks/runtime'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './openai.oas'
import {default as openaiOas} from './openai.oas.json'

// Does this work with tree-shaking?
export {openaiOas as openaiOas}

export interface OpenAiTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export type OpenAISDKTypes = SDKTypes<
  OpenAiTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {authorization: `Bearer ${string}`; [k: string]: string}
  }
>

export const openaiSdkDef = {
  types: {} as OpenAISDKTypes,
  oas: openaiOas as {} as OpenAPISpec,
} satisfies SdkDefinition<OpenAISDKTypes>

export default openaiSdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
