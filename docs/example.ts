import {createClient} from '@opensdks/core'
import type {githubTypes} from '@opensdks/sdk-github'

const github = createClient<githubTypes['paths']>({
  baseUrl: 'https://api.github.com',
  headers: {
    authorization: `Bearer ${process.env['GITHUB_TOKEN']}`,
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

void github
  .GET('/orgs/{org}/actions/secrets', {params: {path: {org: 'usevenice'}}})
  .then((r) => {
    console.log(r.data)
  })
