import {Octokit} from '@octokit/rest'
import Twilio from 'twilio'
import {initSDK} from '@opensdks/core'
import {apolloSdkDef} from '@opensdks/sdk-apollo'
import {discordSdkDef} from '@opensdks/sdk-discord'
import {githubSdkDef} from '@opensdks/sdk-github'
import {openaiSdkDef} from '@opensdks/sdk-openai'
import {plaidSdkDef} from '@opensdks/sdk-plaid'
import {slackSdkDef} from '@opensdks/sdk-slack'
import {twilioSdkDef} from '@opensdks/sdk-twilio'
import {veniceSdkDef} from '@opensdks/sdk-venice'

// Comparison between GitHub vanilla octokit client and openSDKs client
const github = initSDK(githubSdkDef, {
  headers: {
    authorization: `Bearer ${process.env['GITHUB_TOKEN']}`,
    'x-github-api-version': '2022-11-28',
  },
})

void github
  .GET('/repos/{owner}/{repo}/commits', {
    params: {path: {owner: 'useVenice', repo: 'openSDKs'}},
  })
  .then((r) => {
    r.data.forEach((data) => {
      console.log(data.commit)
    })
  })

const octokit = new Octokit()

void octokit.rest.repos
  .listCommits({
    owner: 'useVenice',
    repo: 'openSDKs',
  })
  .then((r) => {
    r.data.forEach((data) => {
      console.log(data.commit)
    })
  })

// MARK: - Twilio example

// Comparison between Twilio vanilla API and openSDKs client
// highlighting type safety

const accountSid = process.env['TWILIO_ACCOUNT_SID']!
const authToken = process.env['TWILIO_AUTH_TOKEN']!

const twilio = initSDK(twilioSdkDef, {accountSid, authToken})

void twilio.api_v2010
  .POST('/2010-04-01/Accounts/{AccountSid}/Messages.json', {
    params: {path: {AccountSid: accountSid}},
    body: {
      Body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      From: '+15017122661',
      To: '+15558675310',
    },
  })
  .then((r) => console.log(r.data))
  //     ^?
  .catch(console.log)

const client = Twilio(accountSid, authToken)

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+15017122661',
    to: '+15558675310',
  })
  .then((message) => console.log(message.sid))
  //       ^?
  .catch(console.log)

// Other examples
export const plaid = initSDK(plaidSdkDef, {
  headers: {
    'PLAID-CLIENT-ID': process.env['PLAID_CLIENT_ID']!,
    'PLAID-SECRET': process.env['PLAID_SECRET']!,
  },
})

export const discord = initSDK(discordSdkDef, {
  headers: {authorization: `Bearer ${process.env['DISCORD_API_KEY']}`},
})
export const openai = initSDK(openaiSdkDef, {
  headers: {authorization: `Bearer ${process.env['OPENAI_API_KEY']}`},
})
export const slack = initSDK(slackSdkDef, {
  headers: {token: process.env['SLACK_TOKEN']!},
})

export const apollo = initSDK(apolloSdkDef, {
  api_key: process.env['APOLLO_API_KEY']!,
})
export const venice = initSDK(veniceSdkDef, {
  headers: {'x-apikey': process.env['VENICE_API_KEY']},
})

void github
  .GET('/orgs/{org}/actions/secrets', {params: {path: {org: 'usevenice'}}})
  .then((r) => {
    console.log(r.data.secrets[0]?.selected_repositories_url)
  })

void venice.GET('/core/resource').then((r) => console.log(r.data))

void apollo.GET('/v1/email_accounts').then((r) => console.log(r.data))

void slack.POST('/chat.postMessage', {
  body: {channel: 'C01U6P7LZ9M', text: 'Hello world!'},
})
