import {
  initSDK,
  type ClientOptions,
  type OpenAPITypes,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type Oas_accounting from '../merge_accounting.oas.types.js'
import type Oas_ats from '../merge_ats.oas.types.js'
import type Oas_crm from '../merge_crm.oas.types.js'
import type Oas_filestorage from '../merge_filestorage.oas.types.js'
import type Oas_hris from '../merge_hris.oas.types.js'
import type Oas_meta from '../merge_meta.oas.types.js'
import type Oas_mktg from '../merge_mktg.oas.types.js'
import type Oas_ticketing from '../merge_ticketing.oas.types.js'
import {default as oas_accounting} from './merge_accounting.oas.meta.js'
import {default as oas_ats} from './merge_ats.oas.meta.js'
import {default as oas_crm} from './merge_crm.oas.meta.js'
import {default as oas_filestorage} from './merge_filestorage.oas.meta.js'
import {default as oas_hris} from './merge_hris.oas.meta.js'
import {default as oas_meta} from './merge_meta.oas.meta.js'
import {default as oas_mktg} from './merge_mktg.oas.meta.js'
import {default as oas_ticketing} from './merge_ticketing.oas.meta.js'

export type {
  Oas_accounting,
  Oas_ats,
  Oas_crm,
  Oas_filestorage,
  Oas_hris,
  Oas_meta,
  Oas_mktg,
  Oas_ticketing,
}

export {
  oas_accounting,
  oas_ats,
  oas_crm,
  oas_filestorage,
  oas_hris,
  oas_meta,
  oas_mktg,
  oas_ticketing,
}
export type MergeSDKTypes = SDKTypes<
  OpenAPITypes, // Merge has mutliple APIs
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /** The /api/integrations endpoint does not require authentication */
      authorization?: `Bearer ${string}`
      'x-account-token'?: string
      [k: string]: string | undefined
    }
  }
>

export const mergeSdkDef = {
  types: {} as MergeSDKTypes,
  defaultOptions: {},
  createClient(ctx, options) {
    const accounting = ctx.createClient<Oas_accounting['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_accounting.servers[0]?.url,
    })
    const ats = ctx.createClient<Oas_ats['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_ats.servers[0]?.url,
    })
    const crm = ctx.createClient<Oas_crm['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_crm.servers[0]?.url,
    })
    const filestorage = ctx.createClient<Oas_filestorage['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_filestorage.servers[0]?.url,
    })
    const hris = ctx.createClient<Oas_hris['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_hris.servers[0]?.url,
    })
    const meta = ctx.createClient<Oas_meta['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_meta.servers[0]?.url,
    })
    const mktg = ctx.createClient<Oas_mktg['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_mktg.servers[0]?.url,
    })
    const ticketing = ctx.createClient<Oas_ticketing['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_ticketing.servers[0]?.url,
    })

    return {
      accounting,
      ats,
      crm,
      filestorage,
      hris,
      meta,
      mktg,
      ticketing,
    }
  },
} satisfies SdkDefinition<MergeSDKTypes>

export default function initMergeSDK(opts: MergeSDKTypes['options']) {
  return initSDK(mergeSdkDef, opts)
}

export type MergeSDK = ReturnType<typeof initMergeSDK>
