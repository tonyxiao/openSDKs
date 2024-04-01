import type {
  ClientOptions,
  OpenAPITypes,
  SdkDefinition,
  SDKTypes,
} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type Oas_accounting from '../xero_accounting.oas.types.js'
import type Oas_assets from '../xero_assets.oas.types.js'
import type Oas_bankfeeds from '../xero_bankfeeds.oas.types.js'
import type Oas_files from '../xero_files.oas.types.js'
import type Oas_finance from '../xero_finance.oas.types.js'
import type Oas_identity from '../xero_identity.oas.types.js'
import type Oas_payroll_au from '../xero_payroll_au.oas.types.js'
import type Oas_payroll_nz from '../xero_payroll_nz.oas.types.js'
import type Oas_payroll_uk from '../xero_payroll_uk.oas.types.js'
import type Oas_projects from '../xero_projects.oas.types.js'
import {default as oas_accounting} from './xero_accounting.oas.meta.js'
import {default as oas_assets} from './xero_assets.oas.meta.js'
import {default as oas_bankfeeds} from './xero_bankfeeds.oas.meta.js'
import {default as oas_files} from './xero_files.oas.meta.js'
import {default as oas_finance} from './xero_finance.oas.meta.js'
import {default as oas_identity} from './xero_identity.oas.meta.js'
import {default as oas_payroll_au} from './xero_payroll_au.oas.meta.js'
import {default as oas_payroll_nz} from './xero_payroll_nz.oas.meta.js'
import {default as oas_payroll_uk} from './xero_payroll_uk.oas.meta.js'
import {default as oas_projects} from './xero_projects.oas.meta.js'

export type {
  Oas_accounting,
  Oas_assets,
  Oas_bankfeeds,
  Oas_files,
  Oas_finance,
  Oas_identity,
  Oas_payroll_au,
  Oas_payroll_nz,
  Oas_payroll_uk,
  Oas_projects,
}

export {
  oas_accounting,
  oas_assets,
  oas_bankfeeds,
  oas_files,
  oas_finance,
  oas_identity,
  oas_payroll_au,
  oas_payroll_nz,
  oas_payroll_uk,
  oas_projects,
}

export type XeroSDKTypes = SDKTypes<
  OpenAPITypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization: `Bearer ${string}`
      /** Required for most apis except identity, can be over-riden on a per method basis */
      'xero-tenant-id'?: string
      [k: string]: string | undefined
    }
  }
>

export const xeroSdkDef = {
  types: {} as XeroSDKTypes,
  defaultOptions: {},
  createClient(ctx, _options) {
    const options = {
      ..._options,
      // xero returns xml by default unless we ask for JSON explicitly
      headers: {accept: 'application/json', ..._options.headers},
    }
    const accounting = ctx.createClient<Oas_accounting['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_accounting.servers[0]?.url,
    })
    const assets = ctx.createClient<Oas_assets['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_assets.servers[0]?.url,
    })
    const bankfeeds = ctx.createClient<Oas_bankfeeds['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_bankfeeds.servers[0]?.url,
    })
    const files = ctx.createClient<Oas_files['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_files.servers[0]?.url,
    })
    const finance = ctx.createClient<Oas_finance['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_finance.servers[0]?.url,
    })
    const identity = ctx.createClient<Oas_identity['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_identity.servers[0]?.url,
    })
    const payroll_au = ctx.createClient<Oas_payroll_au['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_payroll_au.servers[0]?.url,
    })
    const payroll_nz = ctx.createClient<Oas_payroll_nz['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_payroll_nz.servers[0]?.url,
    })
    const payroll_uk = ctx.createClient<Oas_payroll_uk['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_payroll_uk.servers[0]?.url,
    })
    const projects = ctx.createClient<Oas_projects['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_projects.servers[0]?.url,
    })

    return {
      accounting,
      assets,
      bankfeeds,
      files,
      finance,
      identity,
      payroll_au,
      payroll_nz,
      payroll_uk,
      projects,
    }
  },
} satisfies SdkDefinition<XeroSDKTypes>

export function initXeroSDK(opts: XeroSDKTypes['options']) {
  return initSDK(xeroSdkDef, opts)
}

export default xeroSdkDef
