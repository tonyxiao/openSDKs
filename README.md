<p align="center">
  <a href="https://opensdks.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="website/public/logo-dark.png" />
      <source media="(prefers-color-scheme: light)" srcset="website/public/logo-light.png" />
      <img alt="Shows a black logo in light color mode and a white one in dark color mode." src="website/public/logo-light.png">
    </picture>
    <h1 align="center">OpenSDKs</h1>
    <p align="center">Type-safe, extensible and standardized API clients</p>
  </a>
</p>

<p align="center">
  <a aria-label="Join the community on GitHub" href="https://github.com/orgs/opensdks-org/projects/2">
    <img alt="" src="website/public/join-the-community.svg">
  </a>
</p>

> **NOTE:**
> This repo is fully working but documentation is still work in progress. In the mean time please check the [examples folder](./examples) folder for usage guide and the [sdks folder](./sdks) for a list of pre-packaged SDKs.

OpenSDKs is a repository of type-safe, ready-to-use SDKs, for all your external APIs - powered by a zero abstraction lightweight runtime that embraces fetch and HTTP.

## Basic Usage

Example 1: Use `sdks/sdk-github` to list commits

```typescript
import {initSDK} from '@opensdks/runtime'
import {githubSdkDef} from '@opensdks/sdk-github'

const github = initSDK(githubSdkDef, {
  headers: {authorization: `Bearer ${process.env['GITHUB_TOKEN']}`},
})

const {data: commits} = await github.GET('/repos/{owner}/{repo}/commits', {
  params: {path: {owner: 'opensdks-org', repo: 'openSDKs'}},
})
console.log(commits)
//           ^?
```

Example 2: Use `sdks/sdk-slack` to send message

```ts
import {initSDK} from '@opensdks/runtime'
import {slackSdkDef} from '@opensdks/sdk-slack'

export const slack = initSDK(slackSdkDef, {
  headers: {token: process.env['SLACK_TOKEN']!},
})
const {data: message} = await slack.POST('/chat.postMessage', {
  body: {channel: 'general', text: 'Hello OpenSDKs!'},
})
console.log(message)
//            ^?
```

## Features

- ✅&nbsp; End-to-end type-safety for all third-party SDKs you consume
- 🧙‍♂️&nbsp; Easily add any SDKs that you want to use.
- 🐎&nbsp; Snappy DX - quick type lookup without leaving the code editor.

### Zero abstraction, it's just HTTP

Most SDKs are merely thin layers on top of HTTP APIs, but they are [leaky abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/) that poorly hide what is going on in the HTTP layer. So you find yourself referring to both the SDK docs and the HTTP api docs, and when something doesn't behave as you expect you are left debugging both the SDK code as well as the underlying HTTP request & response.

Instead, OpenSDK calls map one to one to the underlying HTTP API so there is nothing to learn and nothing to debug. If you know how to HTTP, you know how to use OpenSDK.

```typescript
void github.GET('/repos/{owner}/{repo}/commits', {
  params: {path: {owner: 'opensdks-org', repo: 'openSDKs'}},
})
```

### Powerful middleware when you need them

In the future we will implement features like tRPC links for extensibility for all SDKs. tRPC links can
be found here: [https://trpc.io/docs/client/links](https://trpc.io/docs/client/links)

```ts
const discord = createSdk(discordSdkDef, {
  links: [
    rateLimitLink({storage: AsyncStorage}),
    retryLink(),
    authorizationLink({storage: AsyncStorage}),
    oauth1RefreshLink({onChange: () => {}}),
    logLink({verbose: true}),
    errorHandlingMiddleware(),
    axios(),
    fetchMiddleware(),
  ],
})
```

### Work by default in all environments

OpenSDKs are versatile, functioning across all browsers. Unlike some SDKs that rely on `axios`, OpenSDKs use `fetch` and include `customFetch` for environments lacking native `fetch` support, ensuring consistent operation in any setting.

### In-editor API reference you actually want to read

Thanks to leveraging [openapi-typescript](https://github.com/drwpow/openapi-typescript/tree/main/packages/openapi-typescript), instead of navigating through thousands of lines of code across multiple files, OpenSDKs provide a streamlined in-editor documentation experience. This means developers no longer need to leave their editor to consult API documentation, as everything is conveniently embedded within the specs. Additionally, OpenSDKs ensure end-to-end type safety, enhancing both the efficiency and reliability of the development process.

### Know one, know all

In traditional settings, each API client behaves uniquely, requiring developers to learn the nuances of every specific SDK. However, with OpenSDKs, there's a unifying similarity in how all APIs behave. This consistency significantly reduces the learning curve, making it easier for developers to transition between different APIs without the need to relearn or adjust to a new environment.

## Examples

https://github.com/opensdks-org/openSDKs/blob/a3281e910c489fbeb7c70787a3fe6da5ca5f525f/examples/example.ts#L1-L128

https://github.com/opensdks-org/openSDKs/blob/a3281e910c489fbeb7c70787a3fe6da5ca5f525f/examples/summarize-pr.ts#L1-L54

For a full app example, check out the [`What did we work on app`](https://github.com/dosu-ai/what-did-we-work-on/). Demo link is here [https://what-did-we-work-on.vercel.app//](https://what-did-we-work-on.vercel.app//).

## Community

The OpenSDKs roadmap can be found on [GitHub Projects](https://github.com/orgs/opensdks-org/projects/2).

To chat with other community members you can join the [OpenSDKs Discord](https://discord.gg/6VNXagtqZK).

[Twitter](https://twitter.com/openSDKs)

## Add a missing SDK

To contribute new SDKs to the OpenSDKs suite, you can follow the [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Contributors

<img src="https://contributors-img.web.app/image?repo=opensdks-org/openSDKs"/>

## Credits

- [drwpow/openapi-typescript](github.com/drwpow/openapi-typescript) - OpenSDKs would not be exist if not for the amazing work done by @drwpow. `@opensdks/runtime` depends on `openapi-fetch` and `@opensdks/cli` 's `generate` command uses `openapi-typescript` under the hood.
- [APIs-guru/openapi-directory](https://github.com/APIs-guru/openapi-directory) - For creating the largest OpenAPI spec registry in the world. I just wish more people knew about you.
- [trpc/trpc](https://github.com/trpc/trpc) - For pioneering such an amazing deveoper experience! We borrowed a lot of ideas from you (ok fine I know you borrowed links from apollo too :P), in particular using ES proxy to allow VSCode to `go to definition` from api call site directly to route definition is amazing, and we are shamelessly borrowing that.
- [apollographql/apollo-client](https://github.com/apollographql/apollo-client) - for being the OG of links (as far as I know!) and certainly for introducing me to them. I am still missing `apollo-link-state` and `graphql-anywhere` to this date. Would you ever bring it back? :/
