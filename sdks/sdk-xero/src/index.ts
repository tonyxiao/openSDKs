import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type {default as xeroTypes} from '../xero_accounting.oas.types.js'
import {default as xeroOasMeta} from './xero_accounting.oas.meta.js'

export {xeroTypes}

export type XeroSDKTypes = SDKTypes<
  xeroTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization: `Bearer ${string}`
      [k: string]: string
    }
  }
>

export interface Connection {
  id: string
  authEventId: string
  tenantId: string
  tenantType: string
  tenantName: string
  createdDateUtc: string
  updatedDateUtc: string
}

export const xeroSdkDef = {
  types: {} as XeroSDKTypes,
  oasMeta: xeroOasMeta,
  createClient(ctx, options) {
    const client = ctx.createClient({
      ...options,
      headers: {
        // xero returns xml by default unless we ask for JSON
        accept: 'application/json',
        ...options.headers,
      },
    })

    // TODO: Create a separate OpenAPI spec for this one
    const rootClient = ctx.createClient({
      ...options,
      baseUrl: 'https://api.xero.com/',
      headers: {
        accept: 'application/json',
        ...options.headers,
      },
    })
    function listConnections() {
      return rootClient
        .request<Connection[]>('GET', '/connections')
        .then((r) => r.data)
    }
    return {...client, listConnections}
  },
} satisfies SdkDefinition<XeroSDKTypes>

export function initXeroSDK(opts: XeroSDKTypes['options']) {
  return initSDK(xeroSdkDef, opts)
}

export default xeroSdkDef
