import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type SlackTypes from '@opensdks/sdk-slack/slack.oas.js'
import {default as slackOasMeta} from './slack.oas.meta.js'

export type SlackSDKTypes = SDKTypes<
  SlackTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {token: string; [k: string]: string}
  }
>

export const slackSdkDef = {
  types: {} as SlackSDKTypes,
  oasMeta: slackOasMeta,
} satisfies SdkDefinition<SlackSDKTypes>

export default slackSdkDef
