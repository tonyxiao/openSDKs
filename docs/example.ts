import {initSDK} from '@opensdks/core'
import {discordSdkDef} from '@opensdks/sdk-discord'
import {githubSdkDef} from '@opensdks/sdk-github'
import {openaiSdkDef} from '@opensdks/sdk-openai'
import {plaidSdkDef} from '@opensdks/sdk-plaid'
import {slackSdkDef} from '@opensdks/sdk-slack'
import {veniceSdkDef} from '@opensdks/sdk-venice'

export const github = initSDK(githubSdkDef, {
  headers: {
    authorization: `Bearer ${process.env['GITHUB_TOKEN']}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

export const plaid = initSDK(plaidSdkDef, {
  headers: {
    'PLAID-CLIENT-ID': '',
    'PLAID-SECRET': '',
  },
}) // Need clientId & secret

export const discord = initSDK(discordSdkDef)
export const openai = initSDK(openaiSdkDef)
export const slack = initSDK(slackSdkDef)
export const venice = initSDK(veniceSdkDef) // ApiKey or authToken

void github
  .GET('/orgs/{org}/actions/secrets', {params: {path: {org: 'usevenice'}}})
  .then((r) => {
    console.log(r.data.secrets[0]?.selected_repositories_url)
  })
