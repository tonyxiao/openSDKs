import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type {ClientOptions} from '@opensdks/runtime'
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

export type GithubSDKTypes = SDKTypes<
  githubTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization: `Bearer ${string}`
      'x-github-api-version'?: '2022-11-28'
      [k: string]: string | undefined
    }
  }
>

export const githubSdkDef = {
  types: {} as GithubSDKTypes,
  oas: githubOas as {} as OpenAPISpec,
} satisfies SdkDefinition<GithubSDKTypes>

export default githubSdkDef

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
