import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/core'
import type {ClientOptions} from '@opensdks/core/createClient'
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

export type ApolloSDKTypes = SDKTypes<
  apolloTypes,
  ClientOptions & {api_key: string}
>

export const apolloSdkDef = {
  types: {} as ApolloSDKTypes,
  oas: apolloOas as {} as OpenAPISpec,
  createClient: (ctx, {api_key, ...options}) =>
    ctx.createClient({
      ...options,
      links: (defaultLinks) => [
        (op, next) => {
          if (op.method === 'GET') {
            op.url.searchParams.set('api_key', api_key)
          } else {
            op.body = {api_key, ...(op.body as Record<string, unknown>)}
          }
          return next(op)
        },
        ...defaultLinks,
      ],
    }),
} satisfies SdkDefinition<ApolloSDKTypes>

export default apolloSdkDef
