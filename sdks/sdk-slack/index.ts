import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/core'
import {ClientOptions} from '@opensdks/core/createClient'
import type {
  components,
  external,
  operations,
  paths,
  webhooks,
} from './slack.oas'
import {default as slackOas} from './slack.oas.json'

// Does this work with tree-shaking?
export {slackOas}

export interface SlackTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export type SlackSDKTypes = SDKTypes<
  SlackTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {token: string; [k: string]: string}
  }
>

export const slackSdkDef = {
  types: {} as SlackSDKTypes,
  oas: slackOas as {} as OpenAPISpec,
} satisfies SdkDefinition<SlackSDKTypes>

export default slackSdkDef
