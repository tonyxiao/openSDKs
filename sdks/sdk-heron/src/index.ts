import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type {oasTypes} from '../heron.oas.types.js'
import {oasMeta} from './heron.oas.meta.js'

export type HeronSDKTypes = SDKTypes<
  oasTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /**
       * https://docs.herondata.io/authentication
       * We use Basic access authentication. Instead of the typical <username>:<password>, keep the username blank and use the api_key as the password. This means you should send the base64-encoded version of :<api_key> in the Authorization: Basic header.
       */
      authorization?: `Basic ${string}`
      [k: string]: string | undefined
    }
  }
>

export const heronSdkDef = {
  types: {} as HeronSDKTypes,
  oasMeta,
  // createClient(ctx, {...opts}) {
  //   const headers = new Headers(opts['headers'] as HeadersInit)
  //   headers.set(
  //     'Authorization',
  //     `Basic ${btoa(
  //       `${opts['auth']['basic']['username']}:${
  //         opts['auth']['basic']['password'] || ''
  //       }`,
  //     )}`,
  //   )
  //   return ctx.createClient({...opts, headers})
  // },
} satisfies SdkDefinition<HeronSDKTypes>

export function initHeronSDK(opts: HeronSDKTypes['options']) {
  return initSDK(heronSdkDef, opts)
}

export type HeronSDK = ReturnType<typeof initHeronSDK>

export default heronSdkDef
