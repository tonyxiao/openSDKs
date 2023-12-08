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
      preRequest: (input, init) => {
        if (input && init?.method?.toLowerCase() === 'get') {
          const url = new URL(input)
          url.searchParams.set('api_key', api_key)
          return [url.toString(), init]
        }
        try {
          return [
            input,
            {
              ...init,
              body: JSON.stringify({
                api_key,
                ...JSON.parse(init?.body as string),
              }),
            },
          ]
        } catch {
          return [input, init]
        }
      },
    }),
} satisfies SdkDefinition<ApolloSDKTypes>

export default apolloSdkDef
