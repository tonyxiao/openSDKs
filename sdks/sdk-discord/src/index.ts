import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type DiscordTypes from '../discord.oas.types.js'
import {default as discordOasMeta} from './discord.oas.meta.js'

export type DiscordSDKTypes = SDKTypes<
  DiscordTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization: `Bearer ${string}`
      [k: string]: string
    }
  }
>

export const discordSdkDef = {
  types: {} as DiscordSDKTypes,
  // Consider using the import * as y syntax so clicking on .oas takes you to the JSON object itself!
  // @see https://share.cleanshot.com/rsKvGsBs
  oasMeta: discordOasMeta,
} satisfies SdkDefinition<DiscordSDKTypes>

export default discordSdkDef
