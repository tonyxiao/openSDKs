import type {OpenAPISpec, SdkDefinition} from '@opensdks/core'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './apollo.oas'
import {default as apolloOas} from './apollo.oas.json'

// Does this work with tree-shaking?
export {apolloOas as apolloOas}

export interface apolloTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export const apolloSdkDef = {
  _types: {} as apolloTypes,
  oas: apolloOas as {} as OpenAPISpec,
  options: {
    api_key: '',
  },
} satisfies SdkDefinition<paths>

export default apolloSdkDef
