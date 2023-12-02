import type {OpenAPISpec, SdkDefinition} from '@opensdks/core'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './plaid.oas'
import {default as plaidOas} from './plaid.oas.json'

// Does this work with tree-shaking?
export {plaidOas as plaidOas}

export interface plaidTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export const plaidSdkDef = {
  _types: {} as plaidTypes,
  oas: plaidOas as {} as OpenAPISpec,
} satisfies SdkDefinition<paths>

export default plaidSdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
