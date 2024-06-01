import {
  initSDK,
  type ClientOptions,
  type OpenAPITypes,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type Oas_config from '../airbyte_config.oas.types.js'
import type Oas_connections_v1 from '../airbyte_connections_v1.oas.types.js'
import type Oas_destinations_v1 from '../airbyte_destinations_v1.oas.types.js'
import type Oas_health_v1 from '../airbyte_health_v1.oas.types.js'
import type Oas_jobs_v1 from '../airbyte_jobs_v1.oas.types.js'
import type Oas_permissions_v1 from '../airbyte_permissions_v1.oas.types.js'
import type Oas_sources_v1 from '../airbyte_sources_v1.oas.types.js'
import type Oas_streams_v1 from '../airbyte_streams_v1.oas.types.js'
import type Oas_users_v1 from '../airbyte_users_v1.oas.types.js'
import type Oas_workspaces_v1 from '../airbyte_workspaces_v1.oas.types.js'
import {default as oas_config} from './airbyte_config.oas.meta.js'
import {default as oas_connections_v1} from './airbyte_connections_v1.oas.meta.js'
import {default as oas_destinations_v1} from './airbyte_destinations_v1.oas.meta.js'
import {default as oas_health_v1} from './airbyte_health_v1.oas.meta.js'
import {default as oas_jobs_v1} from './airbyte_jobs_v1.oas.meta.js'
import {default as oas_permissions_v1} from './airbyte_permissions_v1.oas.meta.js'
import {default as oas_sources_v1} from './airbyte_sources_v1.oas.meta.js'
import {default as oas_streams_v1} from './airbyte_streams_v1.oas.meta.js'
import {default as oas_users_v1} from './airbyte_users_v1.oas.meta.js'
import {default as oas_workspaces_v1} from './airbyte_workspaces_v1.oas.meta.js'

export type {
  Oas_config,
  Oas_connections_v1,
  Oas_destinations_v1,
  Oas_health_v1,
  Oas_jobs_v1,
  Oas_permissions_v1,
  Oas_sources_v1,
  Oas_streams_v1,
  Oas_users_v1,
  Oas_workspaces_v1,
}

export {
  oas_config,
  oas_connections_v1,
  oas_destinations_v1,
  oas_health_v1,
  oas_jobs_v1,
  oas_permissions_v1,
  oas_sources_v1,
  oas_streams_v1,
  oas_users_v1,
  oas_workspaces_v1,
}

export type AirbyteSDKTypes = SDKTypes<
  OpenAPITypes, // Mutliple APIs
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /**
       * Cloud: Bearer {API_KEY}'
       * OSS: Basic btoa('$user:$pass')
       * @see https://reference.airbyte.com/reference/authentication
       */
      authorization?: `Bearer ${string}` | `Basic ${string}`
      [k: string]: string | undefined
    }
  }
>

export const airbyteSdkDef = {
  types: {} as AirbyteSDKTypes,
  defaultOptions: {},
  createClient(ctx, options) {
    const config = ctx.createClient<Oas_config['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_config.servers[0]?.url,
    })
    const connections_v1 = ctx.createClient<Oas_connections_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_connections_v1.servers[0]?.url,
    })
    const destinations_v1 = ctx.createClient<Oas_destinations_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_destinations_v1.servers[0]?.url,
    })
    const health_v1 = ctx.createClient<Oas_health_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_health_v1.servers[0]?.url,
    })
    const jobs_v1 = ctx.createClient<Oas_jobs_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_jobs_v1.servers[0]?.url,
    })
    const permissions_v1 = ctx.createClient<Oas_permissions_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_permissions_v1.servers[0]?.url,
    })
    const sources_v1 = ctx.createClient<Oas_sources_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_sources_v1.servers[0]?.url,
    })
    const streams_v1 = ctx.createClient<Oas_streams_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_streams_v1.servers[0]?.url,
    })
    const users_v1 = ctx.createClient<Oas_users_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_users_v1.servers[0]?.url,
    })
    const workspaces_v1 = ctx.createClient<Oas_workspaces_v1['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_workspaces_v1.servers[0]?.url,
    })

    return {
      config,
      connections_v1,
      destinations_v1,
      health_v1,
      jobs_v1,
      permissions_v1,
      sources_v1,
      streams_v1,
      users_v1,
      workspaces_v1,
    }
  },
} satisfies SdkDefinition<AirbyteSDKTypes>

export function initAirbyteSDK(opts: AirbyteSDKTypes['options']) {
  return initSDK(airbyteSdkDef, opts)
}

export type AirbyteSDK = ReturnType<typeof initAirbyteSDK>

export default initAirbyteSDK
