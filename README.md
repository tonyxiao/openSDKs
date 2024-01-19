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

OpenSDKs is a repository of type-safe and standardized SDKs for all your APIs - powered by a single lightweight and extensible runtime that embraces Web Standards and HTTP. 

```sh
npm install @opensdks/runtime
```
<h2>Table of Contents</h2>

- [Quick start](#quick-start)
  - [Pre-packaged SDK](#pre-packaged-sdk)
  - [Bring your own OpenAPI spec (WIP)](#bring-your-own-openapi-spec-wip)
- [Why (aka the problem)](#why-aka-the-problem)
- [Features](#features)
  - [Zero abstraction, it's just HTTP](#zero-abstraction-its-just-http)
  - [Powerful middleware when you need them](#powerful-middleware-when-you-need-them)
  - [Work by default in all environments](#work-by-default-in-all-environments)
  - [In-editor API reference you actually want to read](#in-editor-api-reference-you-actually-want-to-read)
  - [Know one, know all](#know-one-know-all)
  - [Powerful middlewares when you need them (`Links`)](#powerful-middlewares-when-you-need-them-links)
    - [Built-in links](#built-in-links)
    - [Custom links](#custom-links)
- [Pre-packaged SDKs](#pre-packaged-sdks)
- [Contribute new SDK](#contribute-new-sdk)
- [Examples](#examples)
- [FAQs](#faqs)
  - [The API I need does not have a spec!](#the-api-i-need-does-not-have-a-spec)
  - [But I would prefer adhoc ts types because codegen is annoying](#but-i-would-prefer-adhoc-ts-types-because-codegen-is-annoying)
  - [What if an existing / official spec is wrong, incomplete or un-ergonomic?](#what-if-an-existing--official-spec-is-wrong-incomplete-or-un-ergonomic)
  - [How are links executed under the hood?](#how-are-links-executed-under-the-hood)
  - [Why would I want to use this instead of the custom SDK provided each API vendor?](#why-would-i-want-to-use-this-instead-of-the-custom-sdk-provided-each-api-vendor)
  - [Should I use this for our internal / private API?](#should-i-use-this-for-our-internal--private-api)
  - [I don't like types, should I still use OpenSDKs?](#i-dont-like-types-should-i-still-use-opensdks)
  - [What do you plan to work on next?](#what-do-you-plan-to-work-on-next)
  - [How does this relate to trpc? Does this replace it?](#how-does-this-relate-to-trpc-does-this-replace-it)
- [Community](#community)
- [Contributors](#contributors)
- [Credits](#credits)

## Quick start

### Use pre-packaged SDK

If the API you are looking to work with is already a [pre-packaged SDK](#sdks), then you can import and use directly. 

```ts
import {initSDK} from '@opensdks/runtime'
import {githubSdkDef} from '@opensdks/sdk-github'

const github = initSDK(githubSdkDef, {
  headers: {authorization: `Bearer ${process.env['GITHUB_TOKEN']}`},
})

const {data: commits} = await github.GET('/repos/{owner}/{repo}/commits', {
  params: {path: {owner: 'opensdks-org', repo: 'openSDKs'}},
})
```

### Bring your own OpenAPI spec (WIP)

You can also work with any API by generating a client using the OpenAPI spec. 

```sh
npx @opensdks/cli generate $YOUR_OPENAPI_URL --meta-dir ./ --types-dir ./
```

```ts
import {initSdk} from '@opensdks/runtime'
import sdkDef from './your_sdk'

const sdk = initSdk(sdkDef, {
    headers: { /* Add your own authentication here */ } 
})

const {data} = await sdk.GET('/your_rest_endpoint')
//      ^ data is fully typed!
```



## Why (aka the problem)

### SDKs introduce leaky abstractions on top of HTTP
- Hard to understand what's happening under the hood. Have to learn both the API and the SDK. 
- Rate limiting info not available

### SDKs make technical choices for you and get in your way
- Fetch vs. Axios
- Where to log

### Some SDKs are poorly built / maintained, and some APIs don't have SDKs at alls



### Problem compounds quickly if you work with multiple APIs / SDKs. 
- really hard to do consistent error handling
- So you say fuck it i'm just gonna do HTTP keeping it simple forget SDKs. But then you lose out on all the type safety and other convenience SDK providers

- And that's why OpenSDKs exist





- Different SDKs behave differently, , and some APIs have no SDK at all
  - Making it a challenge to 









Type safety, consistency and extensibility. 

- Many popular SDKs suck
    - jsforce
    - logging anyone?

- SDKs take away your choice
    - HTTP request library
    - 

- Consistency is important
    - axios or fetch?
    - proxy config

- Type safety
    - Leveraging OpenAPI spec
    - 
- It's just HTTP!
    - Most of these so called "SDKs" are really just API clients, the job of an API client is to make it easier to interact with API, not introduce yet another leaky abstraction layer that you have to learn (and debug!)
- Powerful middleware's
    - Logging
    - Proxies
    - Retries
    - Rate limiting
    - Runtime validation & warning
- 
    - Most 
- Learn once, use everywhere
    - For public apis, for private apis, or even pick and choose

## Features

TODO(chatGPT): Generate an emoji for every bullet point

- Type safety

- It's just HTTP!

- Extensible architecture via links

  - Logging

  - Proxies

  - Retries

  - Rate limiting

  - Runtime validation & warning

- Generated code that you actually want to read (courtesy of openapi-typescript)

- Automatic `cli` with completion for every SDK (coming soon)

- Learn once, use everywhere

  - For public apis or for private apis

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

### Work by default in all environments

OpenSDKs are versatile, functioning across all browsers. Unlike some SDKs that rely on `axios`, OpenSDKs use `fetch` and include `customFetch` for environments lacking native `fetch` support, ensuring consistent operation in any setting.

### In-editor API reference you actually want to read

Thanks to leveraging [openapi-typescript](https://github.com/drwpow/openapi-typescript/tree/main/packages/openapi-typescript), instead of navigating through thousands of lines of code across multiple files, OpenSDKs provide a streamlined in-editor documentation experience. This means developers no longer need to leave their editor to consult API documentation, as everything is conveniently embedded within the specs. Additionally, OpenSDKs ensure end-to-end type safety, enhancing both the efficiency and reliability of the development process.

### Know one, know all

In traditional settings, each API client behaves uniquely, requiring developers to learn the nuances of every specific SDK. However, with OpenSDKs, there's a unifying similarity in how all APIs behave. This consistency significantly reduces the learning curve, making it easier for developers to transition between different APIs without the need to relearn or adjust to a new environment.

### Powerful middlewares when you need them (`Links`)

When an SDK is initialized, it receives an array of Links that are chained together to return.

Link is a function that accepts two arguments, a standard web `Request` and a `next` parameter, and it must asynchronously return a standard web `Response`. It may do so by calling the next link in the chain or returning a response directly (in which case it is called a terminating link).

```ts
type Link = (
  req: Request,
  next: (req: Request) => Promise<Response>,
) => Promise<Response>

```

Links are meant to be atomic in scope, but when composed together they can perform incredibly powerful functionality in an easy to understand way. For example 

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

For a diagram and better conceptual understanding, check out [trpc link](https://trpc.io/docs/client/links) and [Apollo link](https://www.apollographql.com/docs/react/api/link/introduction/) that OpenSDK's fetch links are inspired by.

#### Built-in links


| Link                  | Description                                                                                                                                                                                                                                                                                                                                                                       | Accepted options                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `logLink`             | Print request / response to a configurable destination for debugging / monitoring                                                                                                                                                                                                                                                                                                 | `log?: typeof console.log`                                                                               |
| `retryLink`           | Retry request that have failed due to 5xx error with expotential backup                                                                                                                                                                                                                                                                                                           | `maxRetries?: number`                                                                                    |
| `throwLink`           | Great for simulating error conditions and writing tests. Customize the error that gets thrown in `getError` or return `null` to let the request through to the next link in chain.                                                                                                                                                                                                | `getError: (req) => Error | null`                                                                        |
| `fetchTermLink`       | Terminating link that uses `fetch` to send request to the backend server. You may provide a                                                                                                                                                                                                                                                                                       | `fetch?: typeof globalThis.fetch`                                                                        |
| `axiosTermLink`       | Terminating link that uses `axios` to send request to the backend server. It does not include its                                                                                                                                                                                                                                                                                 | `axios: typeof import('axios').default`                                                                  |
| `oauthLink`           | Adds `Authorization: Bearer $accessToken` header to the request. Optionally checks for validity of the `accessToken` and proactive refresh the `accessToken` before making the actual request.                                                                                                                                                                                    | `tokens: OauthTokens`<br />`refreshConfig: OauthConfig`<br />`onRefresh?: (tokens: OauthTokens) => void` |
| `runtimeValidateLink` | Validate the actual request & response payload using the provided OpenAPI spec at runtime. This is especialy helpful when interacting with flaky 3rd party APIs that don't provide or stick with their spec. It can also catch the inevitable bugs in your own client code because JavaScript is ultimately a dynamic language (Don't tell me you have never used an `as any` 😈) | `oas: oas30.OpenAPIObject | oas31.OpenAPIObject`                                                         |
| `rateLimitLink`       | Most APIs have rate limit that needs to be respected. This link can either delay the request to stay below the rate limit or throw a `RateLimited` error so you can handle it in your client / UI. It would be even better if it could be backed by something like Redis so you don't blow past your limit in a multi-process / serverless environment.                           | TBD                                                                                                      |

There are plenty of other good ideas for links, for example I would love to see a `mockLink` that uses the OpenAPI spec to starting a fully fledged mock server, or a `remoteLogLink` that sends the Request / Response to chromeDevTools or Pulse app inspection in a GUI. Please create issues for new ideas or better yet create a PR and contribute! :)

#### Custom links

The simplest link is one that does nothing and simply passes the request along to the next one in the chain. 

```ts
const noopLink: Link = (req, next) => next(req)
```

If you have used axios before, you may know about `requestInterceptor` and `responseInterceptor`. They can be easily expressed as links (kind of like that concept in mathematics where a more general theorem simplifies down to a more specific theorem in specific situations)

```ts
const requestInterceptorLink: Link = (req, next) => {
  // do something with req, such as setting a header
  req.headers.set('x-api-key', 'my-super-secret-key')
  return next(req)
}

const responseInterceptorLink: Link = async (req, next) => {
  const res = await next(req)
  // do something with res, such as checking for errors
  if (res.status !== 200) {
    throw new Error(`Response failed with status ${res.status}`)
  }
  return res
}
```

Because Links simply use the web standard Request & Response objects, the terminating `fetchLink`  is also a trivial one liner. 

```ts
const fetchLink: Link = (req) => fetch(req)
```

To use a custom link, simply pass it into the `link` array when initializing the SDK. e.g.

```ts
initSdk(sdDef, {
  links: defaultLinks => [
    (req, next) => {
      console.log('My custom link just got a request', req.url)
      return next(req)
    },
    ...defaultLinks
	]
})
```

## Pre-packaged SDKs

A pre-packaged SDK is not limited to just a pre-generated API client (i.e. it can be more than just running `npx @opensdks/cli generate` on an OpenAPI spec). It also handles things like adding credentials the request and providing additional functionality beyond HTTP Endpoint wrapper. For example the QBO SDK contains methds to make it easier to make a QBO `query` and paginate through all records via an `AsyncIterator`

**Partial list of SDKs**

| Package                 | OpenAPI Spec Source                                          | Version |
| ----------------------- | ------------------------------------------------------------ | ------- |
| `@opensdks/sdk-github`  | [github/rest-api-description](https://raw.githubusercontent.com/github/rest-api-description/main/descriptions-next/api.github.com/api.github.com.json) | `0.0.1` |
| `@opensdks/sdk-apollo`  | `apollo.openapi.ts`                                          | `0.0.1` |
| `@opensdks/sdk-slack`   | [apis.guru:slack.com/1.7.0](https://api.apis.guru/v2/specs/slack.com/1.7.0/openapi.json) | `1.7.0` |
| `@opensdks/sdk-twilio`  | [github:twilio/twilio-oai/api_v2010](https://raw.githubusercontent.com/twilio/twilio-oai/main/spec/json/twilio_api_v2010.json)<br />[github:twilio/twilio-oai/messaging_v1](https://raw.githubusercontent.com/twilio/twilio-oai/main/spec/json/twilio_messaging_v1.json) | `0.0.1` |
| `@opensdks/sdk-venice`  |                                                              |         |
| `@opensdks/sdk-discord` |                                                              |         |
| `@opensdks/sdk-openai`  |                                                              |         |
| `@opensdks/sdk-plaid`   |                                                              |         |
|                         |                                                              |         |

For the most up to date list, see the [sdks folder](./sdks)****



## Contribute new SDK

1. Create a new directory in `sdks`  with a unique name prefixed with `sdk-$name`
2. Copy `tsconfig.json` and `package.json` over from another sdk folder, then update `$name` references and in particular the `download` and `generate` commands
   1. `download`: If available, get OpenAPI spec from a url and save into the package as `$name.oas.json`. This step should depend on the internet
   2. `generate`: Optionally generate `$name.oas.json` from code in case spec is not available from URL, Then generate typescript types into `$name.oas.d.ts`  via `@opensdks/cli` (or `openapi-typescript`)
3. Modify the generated `index.ts` to add in custom initialization parameters (typically auth credentials), add a test to ensure it works with a sample credential
4. (Optionally) extend the sdk definition in `index.ts` , for example adding support for `AyncIterator` pagination to make it more urgomomic if needed.
5. Submit a PR 🎆 



When in doubt, look at how other SDKs are implemented and follow the pattern. We plan to ship an `@opensdks/cli` for this to make this easier and more streamlined

- TODO: Here's a video of my doing it



- OpenAPI Spec

## Examples

https://github.com/opensdks-org/openSDKs/blob/a3281e910c489fbeb7c70787a3fe6da5ca5f525f/examples/example.ts#L1-L128

https://github.com/opensdks-org/openSDKs/blob/a3281e910c489fbeb7c70787a3fe6da5ca5f525f/examples/summarize-pr.ts#L1-L54

For a full app example, check out the [`What did we work on app`](https://github.com/dosu-ai/what-did-we-work-on/). Demo link is here [https://what-did-we-work-on.vercel.app//](https://what-did-we-work-on.vercel.app//).


## FAQs

### The API I need does not have a spec!

You can polyfill it by create your own spec document and you don't need the API provider's permission to do so. After all a spec is nothing but a standardized description of the inputs expected by and output return by the API. And this is a lot easier than you might think because 

1. You don't have to describe all the endpoints, only the ones you need to use, identical to how you are already manually adhoc-typing those `axios.get` or `(o)fetch` requets anyways and 
2. With the help of `zod-openapi` it is boilerplate-free and you can use the full power of TS to avoid repeating yourself and auto-complete your way to success. 

For an example, see `apollo.openapi.ts` in `sdk-apollo`

### But I would prefer adhoc ts types because codegen is annoying

Agreed codegen is annoying. The good news is that our chosen OpenAPI spec authoring library `zod-openapi` is buit on top of zod and if you use that you'd already have TypeScript types without any codegen! We would like to create a type utility that can transform the inferred types into the same structure as generated types expected by `@opensdks/runtime` so you can have a tight codegen-less feedback loop when polyfill-ing APIs. There are already prior art of this in `zodios` and `fets` so we know it's possible. Contribute if you'd like to see it sooner!

When publshing an idk-package however, you should always publish the `oas.json` file along with generated types, this is because 1) having OpenAPI document unlocks interoperatability & powerful functionality (such as the planned `runtimeValidateLink`)  and 2) type inferance can be very taxing for the ts compiler and you wouldn't want to incur this cost unless you are the one authoring the spec. (The github generated types is 100k LOC, now try that with Zodios-style inference and watch your editor go up in flames 🔥) On that note, if you notice your IDE becoming slow you might also consider switching over to codegen pattern to help your compiler (and thus yourself) out. Luckily by building on top of `zod-openapi`, you can get the best of both worlds. 

### What if an existing / official spec is wrong, incomplete or un-ergonomic?

We can use the source spec as starting point and modify it. For example the Slack OpenAPI spec requires a `token` header parameter for basically every `operation`, instead of properly leveraging `securitySchemas` and make it "generic" so to speak. Therefore we post-process the openapi spec in `slack.openapi.ts` to remove these `token` parameters so that the sdk consumer can just pass `token` once during initialization rather than on every request separately. 

### How are links executed under the hood?

It actually a trivial recursive function which would have been a single line of code if not for the fact that we need to check every there is at least one link that actually terminates the request and returns a response to the client

```ts
function applyLinks(
  request: Request,
  links: Link[],
): Promise<Response> {
  const [link, ...rest] = links
  if (!link) {
    throw new Error('Terminating link missing in links chain')
  }
  return link(request, (req) => applyLinks(req, rest))
}
```

Because links operate on standard web Request / Response objects, you can also use them outside of `@opensdks/runtime`. For example, here's how you can create a custom fetch function with links

```ts
import { applyLinks } from '@opensdks/links'

const myFetch: typeof globalThis.fetch = (url, init) => 
		applyLinks(
      new Request(url, init),
      [
      	// add your own custom links, just don't forget to terminate
        logLink(),
	      fetchLink()
    	]
    )

await myFetch('https://httpbin.org/get')
// [log] Request: HTTP GET https://httpbin.org/get
// [log] Response: 200 from https://httpbin.org/get
```

If you are creative, you can even find other uses for links For example, you can use links insde next.js' new app directory route handlers. 

```ts
// @file: app/my-endpoint/route.ts
import { applyLinks } from '@opensdks/links'

const handler = (req) => {
  // do something
  return NextResponse.json({some: 'data'}) 
}

export function GET(req: NextRequest) {
  return 	applyLinks(req, [logLink(), handler])
}
```

### Why would I want to use this instead of the custom SDK provided each API vendor?

I mean did you read the [why](#why) section? 

TODO(chatGPT)

Ok more seriously, it's easier to answer the reverse question. And here's a list of reasons for "when should I use the custom SDK provided by API vendor instead of the standardized OpenSDKs". 

- You prefer to not know about HTTP or a different call style (e.g. `stripe.customers.list()` )
- You need features that are not yet supported by OpenSDKs
  - Examples of this include streaming responses, or converting ISO date strings into `Date` objects
  - Please do open a github issues though so we can prioiritize those based on demand. 
- You only work with a single 3rd party API and don't need to care about consistensy across integrations. 
- You want your life to be difficult (sorry did I say I was going to be serious? 🧐)

It's worth noting that the best APIs already generate SDKs from OpenAPI specs (e.g. Github, Slack, OpenAI) so an OpenSDK would therefore give you the exact same set of typesafe endpoints as custom SDK, just in a consistent, zero-learning curve kind of way.

### Should I use this for our internal / private API?

 (Yes if you have RESTful API. In the future we might support other non-REST protocols like GraphQL or json-rpc)

TODO(chatGPT)

### I don't like types, should I still use OpenSDKs?

🤷 I feel bad for you, but I you can still use this library from JS. You can still benefit from links and pre-packaged SDKs that expose additional functionalities on top of api calls. For example, see the `getAll` method `sdk-qbo/index.ts` that returns an `AsyncIterator` that uses Quickbooks' custom query language to paginate through all entities of a given type.

TODO(chatGPT)

### What do you plan to work on next?

You tell us! Check out our roadmap on Github and tell us what's important to you. 

### How does this relate to trpc? Does this replace it?

No not at all. In all likelihood you will using OpenSDKs together with trpc. 

trpc is designed for for client-server communication in your full-stack TypeScript web app, and it is useless when you don't have access to the server's source code, assuming it is even written in TypeScript to begin with. 

On the other hand OpenSDKs is most valuable when you are working with multiple 3rd party APIs that you don't control. Each SDK is just an `npm install` away with zero incremental learning curve. 

TODO(chatGPT): 

## Community

The OpenSDKs roadmap can be found on [GitHub Projects](https://github.com/orgs/opensdks-org/projects/2).

To chat with other community members you can join the [OpenSDKs Discord](https://discord.gg/6VNXagtqZK).

[Twitter](https://twitter.com/openSDKs)

## Contributors

<img src="https://contributors-img.web.app/image?repo=opensdks-org/openSDKs"/>

## Credits

- [drwpow/openapi-typescript](github.com/drwpow/openapi-typescript) - OpenSDKs would not be exist if not for the amazing work done by @drwpow. `@opensdks/runtime` depends on `openapi-fetch` and `@opensdks/cli` 's `generate` command uses `openapi-typescript` under the hood. 
- [APIs-guru/openapi-directory](https://github.com/APIs-guru/openapi-directory) - For creating the largest OpenAPI spec registry in the world. I just wish more people knew about you. 
- [trpc/trpc](https://github.com/trpc/trpc) - For pioneering such an amazing deveoper experience! We borrowed a lot of ideas from you (ok fine I know you borrowed links from apollo too :P), in particular using ES proxy to allow VSCode to `go to definition` from api call site directly to route definition is amazing, and we are shamelessly borrowing that. 
- [apollographql/apollo-client](https://github.com/apollographql/apollo-client) - for being the OG of links (as far as I know!) and certainly for introducing me to them. I am still missing `apollo-link-state` and `graphql-anywhere` to this date. Would you ever bring it back? :/ 

