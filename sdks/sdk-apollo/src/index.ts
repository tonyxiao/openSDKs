import type {ClientOptions} from '@opensdks/runtime'
import {
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
        async (req, next) => {
          if (req.method === 'GET') {
            const url = new URL(req.url)
            url.searchParams.set('api_key', api_key)
            return next(modifyRequest(req, {url: url.toString()}))
          } else {
            // Cannot use req.json() because if body didn't exist it would have crashed
            const bodyText = await req.text()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const body = {...(bodyText && JSON.parse(bodyText)), api_key}
            return next(modifyRequest(req, {body: JSON.stringify(body)}))
          }
        },
        ...defaultLinks,
      ],
    }),
} satisfies SdkDefinition<ApolloSDKTypes>

export default apolloSdkDef
