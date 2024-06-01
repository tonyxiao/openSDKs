import type {ClientOptions} from '@opensdks/runtime'
import {initSDK, type SdkDefinition, type SDKTypes} from '@opensdks/runtime'
import type greenhouseTypes from '../greenhouse.oas.types.js'
import {default as greenhouseOasMeta} from './greenhouse.oas.meta.js'

export {greenhouseTypes}

export type GreenhouseSDKTypes = SDKTypes<
  greenhouseTypes,
  Omit<ClientOptions, 'headers'> & {
    /**
     * Greenhouse API key becomes the username here with password always kept as
     * an empty string
     */
    auth: {basic: {username: `${string}`; password?: ''}}
    headers?: {[k: string]: string | undefined}
  }
>

export const greenhouseSdkDef = {
  types: {} as GreenhouseSDKTypes,
  oasMeta: greenhouseOasMeta,
  createClient(ctx, {...opts}) {
    const headers = new Headers(opts['headers'] as HeadersInit)
    headers.set(
      'Authorization',
      `Basic ${btoa(
        `${opts['auth']['basic']['username']}:${
          opts['auth']['basic']['password'] || ''
        }`,
      )}`,
    )
    return ctx.createClient({...opts, headers})
  },
} satisfies SdkDefinition<GreenhouseSDKTypes>

export function initGreenhouseSDK(opts: GreenhouseSDKTypes['options']) {
  return initSDK(greenhouseSdkDef, opts)
}

export type GreenhouseSDK = ReturnType<typeof initGreenhouseSDK>

export default greenhouseSdkDef
