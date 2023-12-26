import {initSDK} from '@opensdks/runtime'
import {githubSdkDef} from '@opensdks/sdk-github'
import {slackSdkDef} from '@opensdks/sdk-slack'

const github = initSDK(githubSdkDef, {
  headers: {authorization: `Bearer ${process.env['GITHUB_TOKEN']}`},
})

const {data: commits} = await github.GET('/repos/{owner}/{repo}/commits', {
  params: {path: {owner: 'opensdks-org', repo: 'openSDKs'}},
})
console.log(commits)
//           ^?

export const slack = initSDK(slackSdkDef, {
  headers: {token: process.env['SLACK_TOKEN']!},
})
const {data: message} = await slack.POST('/chat.postMessage', {
  body: {channel: 'general', text: 'Hello OpenSDKs!'},
})
console.log(message)
//            ^?
