/* eslint-disable @typescript-eslint/no-non-null-assertion */
// For the full app, see https://what-did-we-work-on.vercel.app/

import {initSDK} from '@opensdks/core'
import {githubSdkDef, type githubTypes} from '@opensdks/sdk-github'
import {openaiSdkDef} from '@opensdks/sdk-openai'

const github = initSDK(githubSdkDef, {
  headers: {authorization: `Bearer ${process.env['GITHUB_TOKEN']}`},
})

const openai = initSDK(openaiSdkDef, {
  headers: {authorization: `Bearer ${process.env['OPENAI_API_KEY']}`},
})

export async function fetchCommits(prLink: string) {
  const prUrl = new URL(prLink)
  const [, owner, repo, , prNumber] = prUrl.pathname.split('/')

  return github
    .GET('/repos/{owner}/{repo}/pulls/{pull_number}/commits', {
      params: {
        path: {owner: owner!, repo: repo!, pull_number: Number(prNumber)},
      },
    })
    .then((r) => r.data)
}

type Commit = githubTypes['components']['schemas']['commit']

export const summarizeCommits = async (commits: Commit[]) => {
  const messages = commits.map((commit) => commit.commit.message).join('\n')
  const prompt = `I have a list of software commit messages and need a summary of the changes. Here are the commit messages:\n${messages}\nCan you provide a summary?`

  try {
    const response = await openai.POST('/chat/completions', {
      body: {
        model: 'gpt-3.5-turbo',
        max_tokens: 1000,
        messages: [
          {role: 'system', content: prompt},
          {role: 'user', content: messages},
        ],
      },
    })
    return response.data.choices[0]?.message.content
  } catch (err) {
    console.error('Error summarizing commits:', err)
    throw err
  }
}
