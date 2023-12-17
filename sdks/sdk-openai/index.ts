import type {ClientOptions, SdkDefinition, SDKTypes} from '@opensdks/runtime'
import type OpenAiTypes from '#module/openai.oas.js'
import {default as openaiOasMeta} from './openai.oas.meta.js'

export type OpenAISDKTypes = SDKTypes<
  OpenAiTypes,
  Omit<ClientOptions, 'headers'> & {
    headers: {authorization: `Bearer ${string}`; [k: string]: string}
  }
>

export const openaiSdkDef = {
  types: {} as OpenAISDKTypes,
  oasMeta: openaiOasMeta,
} satisfies SdkDefinition<OpenAISDKTypes>

export default openaiSdkDef
