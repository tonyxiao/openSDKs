import {initSDK} from '@opensdks/core'
import {openaiSdkDef} from '@opensdks/sdk-openai'
import {slackSdkDef} from '@opensdks/sdk-slack'

const openai = initSDK(openaiSdkDef)

openai
  .POST('/chat/completions', {body: {messages: [], model: ''}})
  .then((r) => {
    r.data.choices
  })

const slack = initSDK(slackSdkDef)

slack.POST('/chat.postMessage', {
  params: {header: {token: ''}},
  body: {channel: 'hello'},
})
