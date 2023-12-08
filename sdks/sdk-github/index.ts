import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/core'
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

export type GithubSDKTypes = SDKTypes<githubTypes>

export const githubSdkDef = {
  types: {} as GithubSDKTypes,
  oas: githubOas as {} as OpenAPISpec,
} satisfies SdkDefinition<GithubSDKTypes>

export default githubSdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
