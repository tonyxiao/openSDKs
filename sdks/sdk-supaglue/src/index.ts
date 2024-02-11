import {
  initSDK,
  type ClientOptions,
  type OpenAPITypes,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type Oas_actions from '../supaglue_actions.oas.types.js'
import type Oas_crm from '../supaglue_crm.oas.types.js'
import type Oas_data from '../supaglue_data.oas.types.js'
import type Oas_engagement from '../supaglue_engagement.oas.types.js'
import type Oas_enrichment from '../supaglue_enrichment.oas.types.js'
import type Oas_marketing_automation from '../supaglue_marketing_automation.oas.types.js'
import type Oas_metadata from '../supaglue_metadata.oas.types.js'
import type Oas_mgmt from '../supaglue_mgmt.oas.types.js'
import type Oas_ticketing from '../supaglue_ticketing.oas.types.js'
import {default as oas_actions} from './supaglue_actions.oas.meta.js'
import {default as oas_crm} from './supaglue_crm.oas.meta.js'
import {default as oas_data} from './supaglue_data.oas.meta.js'
import {default as oas_engagement} from './supaglue_engagement.oas.meta.js'
import {default as oas_enrichment} from './supaglue_enrichment.oas.meta.js'
import {default as oas_marketing_automation} from './supaglue_marketing_automation.oas.meta.js'
import {default as oas_metadata} from './supaglue_metadata.oas.meta.js'
import {default as oas_mgmt} from './supaglue_mgmt.oas.meta.js'
import {default as oas_ticketing} from './supaglue_ticketing.oas.meta.js'

export type {
  Oas_actions,
  Oas_crm,
  Oas_data,
  Oas_engagement,
  Oas_enrichment,
  Oas_marketing_automation,
  Oas_metadata,
  Oas_mgmt,
  Oas_ticketing,
}

export {
  oas_actions,
  oas_crm,
  oas_data,
  oas_engagement,
  oas_enrichment,
  oas_marketing_automation,
  oas_metadata,
  oas_mgmt,
  oas_ticketing,
}

export type SupaglueSDKTypes = SDKTypes<
  OpenAPITypes, // Supaglue has mutliple APIs
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /** Supaglue access token goes into the bearer header */
      'x-api-key': string
      'x-customer-id'?: string
      'x-provider-name'?: string
      [k: string]: string | undefined
    }
  }
>

export const supaglueSdkDef = {
  types: {} as SupaglueSDKTypes,
  defaultOptions: {},
  createClient(ctx, options) {
    const actions = ctx.createClient<Oas_actions['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_actions.servers[0]?.url,
    })
    const crm = ctx.createClient<Oas_crm['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_crm.servers[0]?.url,
    })
    const data = ctx.createClient<Oas_data['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_data.servers[0]?.url,
    })
    const engagement = ctx.createClient<Oas_engagement['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_engagement.servers[0]?.url,
    })
    const enrichment = ctx.createClient<Oas_enrichment['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_enrichment.servers[0]?.url,
    })
    const marketing_automation = ctx.createClient<
      Oas_marketing_automation['paths']
    >({
      ...options,
      baseUrl: options.baseUrl ?? oas_marketing_automation.servers[0]?.url,
    })
    const metadata = ctx.createClient<Oas_metadata['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_metadata.servers[0]?.url,
    })
    const mgmt = ctx.createClient<Oas_mgmt['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_mgmt.servers[0]?.url,
    })
    const ticketing = ctx.createClient<Oas_ticketing['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_ticketing.servers[0]?.url,
    })
    return {
      actions,
      crm,
      data,
      engagement,
      enrichment,
      marketing_automation,
      metadata,
      mgmt,
      ticketing,
    }
  },
} satisfies SdkDefinition<SupaglueSDKTypes>

export default supaglueSdkDef

export function initSupaglueSDK(opts: SupaglueSDKTypes['options']) {
  return initSDK(supaglueSdkDef, opts)
}

export type SupaglueSDK = ReturnType<typeof initSupaglueSDK>
