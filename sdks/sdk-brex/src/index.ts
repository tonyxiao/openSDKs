import {
  initSDK,
  type ClientOptions,
  type OpenAPITypes,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type Oas_budgets from '../brex_budgets.oas.types.js'
import type Oas_expenses from '../brex_expenses.oas.types.js'
import type Oas_onboarding from '../brex_onboarding.oas.types.js'
import type Oas_payments from '../brex_payments.oas.types.js'
import type Oas_team from '../brex_team.oas.types.js'
import type Oas_transactions from '../brex_transactions.oas.types.js'
import type Oas_travel from '../brex_travel.oas.types.js'
import type Oas_webhooks from '../brex_webhooks.oas.types.js'
import {default as oas_budgets} from './brex_budgets.oas.meta.js'
import {default as oas_expenses} from './brex_expenses.oas.meta.js'
import {default as oas_onboarding} from './brex_onboarding.oas.meta.js'
import {default as oas_payments} from './brex_payments.oas.meta.js'
import {default as oas_team} from './brex_team.oas.meta.js'
import {default as oas_transactions} from './brex_transactions.oas.meta.js'
import {default as oas_travel} from './brex_travel.oas.meta.js'
import {default as oas_webhooks} from './brex_webhooks.oas.meta.js'

export type {
  Oas_budgets,
  Oas_expenses,
  Oas_onboarding,
  Oas_payments,
  Oas_team,
  Oas_transactions,
  Oas_travel,
  Oas_webhooks,
}

export {
  oas_budgets,
  oas_expenses,
  oas_onboarding,
  oas_payments,
  oas_team,
  oas_transactions,
  oas_travel,
  oas_webhooks,
}

export type BrexSDKTypes = SDKTypes<
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

export const brexSdkDef = {
  types: {} as BrexSDKTypes,
  defaultOptions: {},
  createClient(ctx, options) {
    const budgets = ctx.createClient<Oas_budgets['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_budgets.servers[0]?.url,
    })
    const expenses = ctx.createClient<Oas_expenses['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_expenses.servers[0]?.url,
    })
    const onboarding = ctx.createClient<Oas_onboarding['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_onboarding.servers[0]?.url,
    })
    const payments = ctx.createClient<Oas_payments['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_payments.servers[0]?.url,
    })
    const team = ctx.createClient<Oas_team['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_team.servers[0]?.url,
    })
    const transactions = ctx.createClient<Oas_transactions['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_transactions.servers[0]?.url,
    })
    const travel = ctx.createClient<Oas_travel['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_travel.servers[0]?.url,
    })
    const webhooks = ctx.createClient<Oas_webhooks['paths']>({
      ...options,
      baseUrl: options.baseUrl ?? oas_webhooks.servers[0]?.url,
    })

    return {
      budgets,
      expenses,
      onboarding,
      payments,
      team,
      transactions,
      travel,
      webhooks,
    }
  },
} satisfies SdkDefinition<BrexSDKTypes>

export default function initBrexSDK(opts: BrexSDKTypes['options']) {
  return initSDK(brexSdkDef, opts)
}

export type BrexSDK = ReturnType<typeof initBrexSDK>
