import type {ClientOptions} from '@opensdks/runtime'
import {
  initSDK,
  modifyRequest, // TODO: this is a dependency, not devDep
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type apolloTypes from '../apollo.oas.types.js'
import {default as apolloOasMeta} from './apollo.oas.meta.js'

export type ApolloSDKTypes = SDKTypes<
  apolloTypes,
  ClientOptions & {api_key: string}
>

export const apolloSdkDef = {
  types: {} as ApolloSDKTypes,
  oasMeta: apolloOasMeta,
  createClient: (ctx, {api_key, ...options}) =>
    ctx.createClient({
      ...options,
      links: (defaultLinks) => [
        (req, next) =>
          next(
            modifyRequest(req, {
              url: {searchParams: {api_key}},
              duplex: 'half', // TODO: Should this be the default?
            }),
          ),
        ...defaultLinks,
      ],
    }),
} satisfies SdkDefinition<ApolloSDKTypes>

export function initApolloSDK(opts: ApolloSDKTypes['options']) {
  return initSDK(apolloSdkDef, opts)
}

export type ApolloSDK = ReturnType<typeof initApolloSDK>

export default apolloSdkDef
