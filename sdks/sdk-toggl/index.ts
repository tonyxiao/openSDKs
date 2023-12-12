import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import {initSDK} from '@opensdks/runtime'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './toggl.oas'

export interface togglOasTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export type togglSDKTypes = SDKTypes<togglOasTypes>

/**
 * Quickbooks Online SDK.
 * TODO: handle oauth token refresh and working with links to do so.
 */
export const togglSdkDef = {
  types: {} as togglSDKTypes,
  defaultOptions: {
    baseUrl: 'https://api.track.toggl.com',
  },
} satisfies SdkDefinition<togglSDKTypes>

export default togglSdkDef

const toggl = initSDK(togglSdkDef, {
  headers: {
    authorization: `Basic ${btoa(
      process.env['TOGGL_API_TOKEN']! + ':' + 'api_token',
    )}`,
  },
})

void toggl
  .GET('/api/v9/organizations/{organization_id}', {
    params: {path: {organization_id: 4978552}},
  })
  .then((r) => {
    console.log(r.data.admin)
    //              ^?
  })
