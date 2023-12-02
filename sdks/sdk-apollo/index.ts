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

  extend: (client, options) => {
    client.options.preRequest = (input, init) => {
      if (input && init?.method?.toLowerCase() === 'get') {
        const url = new URL(input)
        url.searchParams.set('api_key', options['api_key'] as string)
        return [url.toString(), init]
      }
      try {
        return [
          input,
          {
            ...init,
            body: JSON.stringify({
              api_key: options['api_key'] as string,
              ...JSON.parse(init?.body as string),
            }),
          },
        ]
      } catch {
        return [input, init]
      }
    }
    return {...client} as typeof client & {hello: 'world'}
  },
} satisfies SdkDefinition<paths, unknown>

export default apolloSdkDef
