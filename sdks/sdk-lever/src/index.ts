import type {ClientOptions} from '@opensdks/runtime'
import {initSDK, type SdkDefinition, type SDKTypes} from '@opensdks/runtime'
import type leverTypes from '../lever.oas.types.js'
import {default as leverOasMeta} from './lever.oas.meta.js'

export {leverTypes}

export type LeverSDKTypes = SDKTypes<
  leverTypes,
  Omit<ClientOptions, 'headers'> & {
    /**
     * Lever API key becomes the username here with password always kept as
     * an empty string when used internally with API key alone.
     *
     * When used for external use-case, oauth with bearer token is used.
     */
    auth?: {
      basic: {
        username: `${string}`
        password?: ''
      }
    }
    headers?: {
      authorization: `Bearer ${string}`
      [k: string]: string | undefined
    }
  }
>

export const leverSdkDef = {
  types: {} as LeverSDKTypes,
  oasMeta: leverOasMeta,
  createClient(ctx, {...opts}) {
    const headers = new Headers(opts['headers'] as HeadersInit)
    if (
      opts['auth'] &&
      !(opts['headers'] && opts['headers']['authorization'])
    ) {
      headers.set(
        'Authorization',
        `Basic ${btoa(
          `${opts['auth']['basic']['username']}:${
            opts['auth']['basic']['password'] || ''
          }`,
        )}`,
      )
    }
    return ctx.createClient({...opts, headers})
  },
} satisfies SdkDefinition<LeverSDKTypes>

export function initLeverSDK(opts: LeverSDKTypes['options']) {
  return initSDK(leverSdkDef, opts)
}

export type LeverSDK = ReturnType<typeof initLeverSDK>

export default leverSdkDef
