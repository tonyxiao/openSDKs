import type {ClientOptions, Link} from '@opensdks/runtime'
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
  createClient: (ctx, {api_key, ...opts}) =>
    ctx.createClient({
      ...opts,
      links: (defaultLinks) => {
        const links: Link[] = [
          (req, next) =>
            next(
              modifyRequest(req, {
                url: {searchParams: {api_key}},
                duplex: 'half', // TODO: Should this be the default?
              }),
            ),

          ...defaultLinks,
        ]
        return Array.isArray(opts.links)
          ? opts.links
          : opts.links
            ? opts.links(links)
            : links
      },
    }),
} satisfies SdkDefinition<ApolloSDKTypes>

export function initApolloSDK(opts: ApolloSDKTypes['options']) {
  return initSDK(apolloSdkDef, opts)
}

export type ApolloSDK = ReturnType<typeof initApolloSDK>

export default apolloSdkDef
