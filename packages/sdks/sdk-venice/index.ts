import type {OpenAPISpec, SdkDefinition} from '@opensdks/core'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './venice.oas'
import {default as veniceOas} from './venice.oas.json'

// Does this work with tree-shaking?
export {veniceOas as veniceOas}

export interface veniceTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export const veniceSdkDef = {
  _types: {} as veniceTypes,
  oas: veniceOas as {} as OpenAPISpec,
} satisfies SdkDefinition<paths>

export default veniceSdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
