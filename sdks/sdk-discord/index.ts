import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type DiscordTypes from '#module/discord.oas.js'
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

// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}

// codegen:end
