import type {OpenAPISpec, SdkDefinition} from '@opensdks/core'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './github.oas'
import {default as githubOas} from './github.oas.json'

// Does this work with tree-shaking?
export {githubOas as githubOas}

export interface githubTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export const githubSdkDef = {
  _types: {} as githubTypes,
  oas: githubOas as {} as OpenAPISpec,
} satisfies SdkDefinition<paths>

export default githubSdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
