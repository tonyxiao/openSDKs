import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type githubTypes from '@opensdks/sdk-github/github.oas.js'
import {default as githubOasMeta} from './github.oas.meta.js'

export type GithubSDKTypes = SDKTypes<
  githubTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {
      authorization: `Bearer ${string}`
      'x-github-api-version'?: '2022-11-28'
      [k: string]: string | undefined
    }
  }
>

export const githubSdkDef = {
  types: {} as GithubSDKTypes,
  oasMeta: githubOasMeta,
} satisfies SdkDefinition<GithubSDKTypes>

export default githubSdkDef
