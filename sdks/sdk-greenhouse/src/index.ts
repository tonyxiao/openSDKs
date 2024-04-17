/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type {ClientOptions} from '@opensdks/runtime'
import {initSDK, type SdkDefinition, type SDKTypes} from '@opensdks/runtime'
import type greenhouseTypes from '../greenhouse.oas.types.js'
import {default as greenhouseOasMeta} from './greenhouse.oas.meta.js'

export {greenhouseTypes}

export type GreenhouseSDKTypes = SDKTypes<
  greenhouseTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization?: `Basic ${string}`
      [k: string]: string | undefined
    }
  }
>

export const greenhouseSdkDef = {
  types: {} as GreenhouseSDKTypes,
  oasMeta: greenhouseOasMeta,
} satisfies SdkDefinition<GreenhouseSDKTypes>

export function initGreenhouseSDK(opts: GreenhouseSDKTypes['options']) {
  return initSDK(greenhouseSdkDef, opts)
}

export type GreenhouseSDK = ReturnType<typeof initGreenhouseSDK>

export default greenhouseSdkDef
