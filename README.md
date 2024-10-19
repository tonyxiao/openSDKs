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
  <a aria-label="Join the community on GitHub" href="https://discord.gg/dHdefDmjnK">
    <img alt="" src="website/public/join-the-community.svg">
  </a>
</p>

> **NOTE:**
> This repo is fully working but documentation is still work in progress. In the mean time please check the [examples folder](./examples) folder for usage guide and the [sdks folder](./sdks) for a list of pre-packaged SDKs.

OpenSDKs is a repository of type-safe and standardized SDKs for all your APIs - powered by a single lightweight and extensible `runtime` that embraces Web Standards and HTTP, and a `cli` that can generate a custom SDKs from any OpenAPI spec.

```sh
npm install @opensdks/runtime
npm install -D @opensdks/cli
```

![Demo](./examples/demo.gif)

<h2>Table of Contents</h2>

- [Quick start](#quick-start)
  - [Use pre-packaged SDK](#use-pre-packaged-sdk)
  - [Bring your own OpenAPI spec (WIP)](#bring-your-own-openapi-spec-wip)
- [Why (aka the problem)](#why-aka-the-problem)
  - [Most SDKs are leaky abstractions on top of HTTP APIs](#most-sdks-are-leaky-abstractions-on-top-of-http-apis)
  - [SDKs force technical choices on you that get in your way](#sdks-force-technical-choices-on-you-that-get-in-your-way)
  - [Some SDKs are poorly built / maintained, and some APIs don't have SDKs at alls](#some-sdks-are-poorly-built--maintained-and-some-apis-dont-have-sdks-at-alls)
  - [Lack of consistency makes it hard to scale if you work with lots of SDKs / APIs](#lack-of-consistency-makes-it-hard-to-scale-if-you-work-with-lots-of-sdks--apis)
- [Features](#features)
  - [0️⃣ Zero abstraction, it's just (typesafe) HTTP](#0️⃣-zero-abstraction-its-just-typesafe-http)
  - [✅ Work by default in all environments](#-work-by-default-in-all-environments)
  - [📚 In-editor API reference you actually want to read](#-in-editor-api-reference-you-actually-want-to-read)
  - [💪 Powerful \& extensible middlewares when you need them (`Links`)](#-powerful--extensible-middlewares-when-you-need-them-links)
  - [💡 Automatic consistency that lets you scale infra and learn once, use everywhere](#-automatic-consistency-that-lets-you-scale-infra-and-learn-once-use-everywhere)
- [Links](#links)
  - [Built-in links](#built-in-links)
  - [Custom links](#custom-links)
- [List of pre-packaged SDKs](#list-of-pre-packaged-sdks)
  - [Contribute a new SDK](#contribute-a-new-sdk)
- [Usage Examples](#usage-examples)
- [FAQs](#faqs)
  - [The API I need does not have an OpenAPI spec!](#the-api-i-need-does-not-have-an-openapi-spec)
  - [But I would prefer adhoc ts types because codegen is annoying](#but-i-would-prefer-adhoc-ts-types-because-codegen-is-annoying)
  - [What if an existing / official spec is wrong, incomplete or un-ergonomic?](#what-if-an-existing--official-spec-is-wrong-incomplete-or-un-ergonomic)
  - [How are links executed under the hood?](#how-are-links-executed-under-the-hood)
  - [Why would I want to use this instead of the native SDK provided by each API vendor?](#why-would-i-want-to-use-this-instead-of-the-native-sdk-provided-by-each-api-vendor)
  - [This looks great. Can I use this for our internal / private API?](#this-looks-great-can-i-use-this-for-our-internal--private-api)
  - [I don't like types, should I still use OpenSDKs?](#i-dont-like-types-should-i-still-use-opensdks)
  - [What do you plan to work on next?](#what-do-you-plan-to-work-on-next)
  - [How does this relate to trpc? Does this replace it?](#how-does-this-relate-to-trpc-does-this-replace-it)
- [Community](#community)
- [Contributors](#contributors)
- [Credits](#credits)

## Quick start

### Use pre-packaged SDK

If the API you are looking to work with is already a [pre-packaged SDK](#list-of-pre-packaged-sdks), then you can import and use directly.

```ts
import {initSDK} from '@opensdks/runtime'
import {githubSdkDef} from '@opensdks/sdk-github'

const github = initSDK(githubSdkDef, {
  headers: {authorization: `Bearer ${process.env['GITHUB_TOKEN']}`},
})

const res = await github.GET('/repos/{owner}/{repo}/commits', {
  params: {path: {owner: 'tonyxiao', repo: 'openSDKs'}},
})
console.log(res.data[0]?.committer)
//                          ^? (property) committer: {
//                                 name?: string | null | undefined;
//                                 email?: string | null | undefined;
//                                 login: string;
//                                 id: number;
//                                 node_id: string;
//                                 avatar_url: string;
//                                 gravatar_id: string | null;
//                                 url: string;
//                                 html_url: string;
//                                 ... 11 more ...;
//                                 starred_at?: string | undefined;
//                             } | null | undefined
```

### Bring your own OpenAPI spec (WIP)

You can also work with any API by generating a client using the OpenAPI spec.

```sh
npx @opensdks/cli generate $YOUR_OPENAPI_URL --name $YOUR_API_NAME
# e.g.
# npx @opensdks/cli generate https://raw.githubusercontent.com/openai/openai-openapi/master/openapi.yaml --name openAI --output openai.ts
```

```ts
import initOpenAISDK from './openai'

const openai = initOpenAISDK({
  headers: {
    authorization: `Bearer ${process.env['OPENAI_SECRET_KEY']}`,
  },
})

const {data} = await openai.GET('/models')
//      ^ data is fully typed! @example https://share.cleanshot.com/Wv69QY1R
```

## Why (aka the problem)

### Most SDKs are leaky abstractions on top of HTTP APIs

Unlike SDKs offered by major platforms like iOS, Windows, or Unity that are valuable by themselves, most 3rd party SDKs are merely glorified API clients that supposedly make it easier to interact with the underlying HTTP-based API. The problem is that these glue code often introduce what are known as '[leaky abstractions](https://www.joelonsoftware.com/2002/11/11/the-law-of-leaky-abstractions/)', obscuring what is happening under the hood while introducing its own nuances and a dual-learning curve.

For example, debugging is much more difficult without easy access to the underlying HTTP request, and often times the HTTP API have more up to date and better documentation than SDK for a specific programming language so you end up having to reference the API anyways.

What's worse is sometimes essential information such as rate limiting details that would have been accessible in HTTP headers are inaccessible when using the SDK (I'm looking at you Hubspot!), forcing you to monkey-patch or completely opt-out of the SDK for specific requests.

### SDKs force technical choices on you that get in your way

SDKs, by design, operate directly within your codebase, and this in-process nature means their technical choices and dependencies can negatively impact your applications.

For instance, for a long time the OpenAI SDK used axios for HTTP requests, which uses APIs that are not available in edge environments. Therefore for their docs Vercel had to recommend a community SDK called [openai-edge](https://github.com/dan-kwiat/openai-edge) that worked for their edge runtime. Other times vendors choose to ship platform-specific SDKs (e.g. [stripe-node](https://github.com/stripe/stripe-node)), forcing you to polyfill or implement hacky bundler workarounds if you are building an isomorphic application.

SDKs may also choose to make asynchronous requests for performance, but in a typical serverless environment [all async workloads must finish](https://levelup.gitconnected.com/avoiding-the-pitfalls-of-async-node-js-functions-in-aws-lambda-941220582e7a) before the HTTP handler completes. Hopefully your SDK of choice provides you a way to await for requests to flush, otherwise you are pretty much guaranteed data loss or subtle bugs.

Logging is another common issue. Your engineers may spend hours coming through your codebase to make sure every log statement is properly instrumented, only to get surprised by a [rogue console.log](https://github.com/HubSpot/hubspot-api-nodejs/blob/bb202a08ddb48f9967b5db36de9bcebe3c3b9aae/src/services/decorators/RetryDecorator.ts#L74-L76) deep inside a SDK that you have no control over messing up your observability setup and eating into your logs storage.

### Some SDKs are poorly built / maintained, and some APIs don't have SDKs at alls

Case in point, as of the time of this writing (Jan 19, 2024), the [PagerDuty JS SDK](https://github.com/PagerDuty/PDJS) was last updated 2 years ago, even though the API itself was updated just [last week](https://developer.pagerduty.com/api-reference/f1a95bb9397ba-changelog). Needless to say, to learn how you use the SDK, you are asked to refer to the API documentation.

Even major APIs like Salesforce don't have their own SDKs, instead you will have to rely on community built [jsforce](https://github.com/jsforce/jsforce), which unfortunately has a 13 year old untyped JavaScript codebase that still transpiles its code back to ECMAScript 5 (2009), presumably for Internet Explorer support? Good luck keeping your own bundle size lean and startup time fast. Understandable though, as it is hard especially for a team of volunteers to justify a rewrite when it still "technically works".

And sometimes a provider (ahem [Apollo](https://apolloio.github.io/apollo-api-docs)) doesn't even have an SDK at all, and you are having to essentially build a wrapper client "SDK" in your own codebase so you can interact with them, which is arguably preferable than using an out of date SDK that introduces confusion and bundle bloat.

It's not their fault really. The core business of API providers is their applications & APIs, and writing well built, extensible SDK in language they may or may not have experience in is not an easy job, no to mention staying on top of changes as programming languages themselves evolve (e.g. introduction of the fetch API). Some of those API providers are large and slow moving companies, others are tiny startups starved of engineering resources. Expecting all them to build great SDKs is unfortunately not realistic.

### Lack of consistency makes it hard to scale if you work with lots of SDKs / APIs

All of the problems listed above compounds if you work with multiple SDKs / APIs (e.g. if you have lots of integrations within your product). Trying to achieve consistent behavior across things like logging, error handling, and retries become nearly impossible as the number of integrations increase. Some companies that work with lots of APIs (e.g. integrations platform) end up ditching SDKs entirely for this reason and revert to making raw HTTP requests, but then they lose out on type safety and other convenience that SDK provides.

And thats why OpenSDKs exists - to give you a single extensible SDK runtime that lets you work with all APIs in a typesafe and consistent way.

## Features

### 0️⃣ Zero abstraction, it's just (typesafe) HTTP

Once initialized, the methods available map one to one to the underlying HTTP API so there is nothing to learn. If you know how to HTTP, you know how to use OpenSDK.

```typescript
const res = await github.GET('/repos/{owner}/{repo}/commits', {
  params: {path: {owner: 'tonyxiao', repo: 'openSDKs'}},
})
console.log(res.data[0]?.committer?.name)
//                                   ^? (property) name?: string | null | undefined
```

Working directly with HTTP doesn't mean you have to lose type-safety though. Both the request (including path, params, headers and body) and response are fully typed with auto-complete support, enabling both productivity and correctness.

![Demo](./examples/demo.gif)

### ✅ Work by default in all environments

OpenSDKs use the fetch API by default (swappable if you prefer axios or any other request lib) which is pretty much universally available on all environment that javascript runs on. From node.js, to browser, to deno, to bun, to vercel edge, to even completely bespoke environments such as the [coda pack runtime](https://coda.io/packs/build/latest/guides/basics/fetcher/). This also means that caching works out of the box in environments like next.js that extends the fetch API for efficient rendering of server components.

### 📚 In-editor API reference you actually want to read

Instead of navigating through thousands of lines of code across multiple files, OpenSDKs provide a streamlined in-editor documentation experience. This means you no longer need to leave your editor to consult API documentation, which is frequently more convenient than going to an API's online documentation.

![Demo](./examples/demo-api-reference.gif)

### 💪 Powerful & extensible middlewares when you need them (`Links`)

Inspired by [trpc link](https://trpc.io/docs/client/links) and [Apollo link](https://www.apollographql.com/docs/react/api/link/introduction/), OpenSDKs runtime includes a composable set of middlewares called Links that are atomic in scope and can add incredibly powerful functionalities in an easy to understand way. For example

```ts
const discord = createSdk(discordSdkDef, {
  links: [
    rateLimitLink({backend: RedisCache}),
    retryLink(),
    authorizationLink({storage: AsyncStorage}), // Store credentials in react native environmemnt
    oauth2RefreshLink({onChange: () => {}}),
    logLink({verbose: true}),
    errorHandlingMiddleware(),
    axiosLink(), // Use axios instead of fetch
    (req, next) => {
      // Do something custom here...
      return next(req)
    },
  ],
})
```

This interface is one of the best ways to extend the sdk / runtime with your own custom functionalities. See [Links](#links) section for more details.

### 💡 Automatic consistency that lets you scale infra and learn once, use everywhere

Because each SDK is just an adapter that plugs into the same underlying runtime & cli, things like API documentation, error handling and request interface are automaticaly consistent, making it much easier to enforce global patterns like logging and metrics in your codebase and scale your integrations infrastructure.

An added bonus is that you no longer have a dual-learning curve whenever your product needs to use a new API, and can therefore build new integrations and go to production that much faster.

## Links

When an SDK is initialized, it receives an array of Links that are chained together to return.

Link is a function that accepts two arguments, a standard web `Request` and a `next` parameter, and it must asynchronously return a standard web `Response`. It may do so by calling the next link in the chain or returning a response directly (in which case it is called a terminating link).

```ts
type Link = (
  req: Request,
  next: (req: Request) => Promise<Response>,
) => Promise<Response>
```

### Built-in links

| Link                  | Description                                                                                                                                                                                                                                                                                                                                                                       | Accepted options                                                                                         |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------- |
| `logLink`             | Print request / response to a configurable destination for debugging / monitoring                                                                                                                                                                                                                                                                                                 | `log?: typeof console.log`                                                                               |
| `retryLink`           | Retry request that have failed due to 5xx error with expotential backup                                                                                                                                                                                                                                                                                                           | `maxRetries?: number`                                                                                    |
| `throwLink`           | Great for simulating error conditions and writing tests. Customize the error that gets thrown in `getError` or return `null` to let the request through to the next link in chain.                                                                                                                                                                                                | `getError: (req) => Error                                                                                | null`                |
| `fetchTermLink`       | Terminating link that uses `fetch` to send request to the backend server. You may provide a                                                                                                                                                                                                                                                                                       | `fetch?: typeof globalThis.fetch`                                                                        |
| `axiosTermLink`       | Terminating link that uses `axios` to send request to the backend server. It does not include its                                                                                                                                                                                                                                                                                 | `axios: typeof import('axios').default`                                                                  |
| `oauthLink`           | Adds `Authorization: Bearer $accessToken` header to the request. Optionally checks for validity of the `accessToken` and proactive refresh the `accessToken` before making the actual request.                                                                                                                                                                                    | `tokens: OauthTokens`<br />`refreshConfig: OauthConfig`<br />`onRefresh?: (tokens: OauthTokens) => void` |
| `runtimeValidateLink` | Validate the actual request & response payload using the provided OpenAPI spec at runtime. This is especialy helpful when interacting with flaky 3rd party APIs that don't provide or stick with their spec. It can also catch the inevitable bugs in your own client code because JavaScript is ultimately a dynamic language (Don't tell me you have never used an `as any` 😈) | `oas: oas30.OpenAPIObject                                                                                | oas31.OpenAPIObject` |
| `rateLimitLink`       | Most APIs have rate limit that needs to be respected. This link can either delay the request to stay below the rate limit or throw a `RateLimited` error so you can handle it in your client / UI. It would be even better if it could be backed by something like Redis so you don't blow past your limit in a multi-process / serverless environment.                           | TBD                                                                                                      |

There are plenty of other good ideas for links, for example I would love to see a `mockLink` that uses the OpenAPI spec to starting a fully fledged mock server, or a `remoteLogLink` that sends the Request / Response to chromeDevTools or Pulse app inspection in a GUI. Please create issues for new ideas or better yet create a PR and contribute! :)

### Custom links

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

Because Links simply use the web standard Request & Response objects, the terminating `fetchLink` is also a trivial one liner.

```ts
const fetchLink: Link = (req) => fetch(req)
```

To use a custom link, simply pass it into the `link` array when initializing the SDK. e.g.

```ts
initSdk(sdDef, {
  links: (defaultLinks) => [
    (req, next) => {
      console.log('My custom link just got a request', req.url)
      return next(req)
    },
    ...defaultLinks,
  ],
})
```

## List of pre-packaged SDKs

A pre-packaged SDK is not limited to just a pre-generated API client (i.e. it can be more than just running `npx @opensdks/cli generate` on an OpenAPI spec). It also handles things like adding credentials the request and providing additional functionality beyond HTTP Endpoint wrapper. For example the QBO SDK contains methds to make it easier to make a QBO `query` and paginate through all records via an `AsyncIterator`

**Partial list of SDKs**

| Package                 | OpenAPI Spec Source                                                                                                                                                                                                                                                      | Version |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `@opensdks/sdk-github`  | [github/rest-api-description](https://raw.githubusercontent.com/github/rest-api-description/main/descriptions-next/api.github.com/api.github.com.json)                                                                                                                   | `0.0.1` |
| `@opensdks/sdk-apollo`  | `apollo.openapi.ts`                                                                                                                                                                                                                                                      | `0.0.1` |
| `@opensdks/sdk-slack`   | [apis.guru:slack.com/1.7.0](https://api.apis.guru/v2/specs/slack.com/1.7.0/openapi.json)                                                                                                                                                                                 | `1.7.0` |
| `@opensdks/sdk-twilio`  | [github:twilio/twilio-oai/api_v2010](https://raw.githubusercontent.com/twilio/twilio-oai/main/spec/json/twilio_api_v2010.json)<br />[github:twilio/twilio-oai/messaging_v1](https://raw.githubusercontent.com/twilio/twilio-oai/main/spec/json/twilio_messaging_v1.json) | `0.0.1` |
| `@opensdks/sdk-venice`  |                                                                                                                                                                                                                                                                          |         |
| `@opensdks/sdk-discord` |                                                                                                                                                                                                                                                                          |         |
| `@opensdks/sdk-openai`  |                                                                                                                                                                                                                                                                          |         |
| `@opensdks/sdk-plaid`   |                                                                                                                                                                                                                                                                          |         |
|                         |                                                                                                                                                                                                                                                                          |         |

For the most up to date list, see the [sdks folder](./sdks)

### Contribute a new SDK

> We are working on tooling to make this much easier, in the meantime you can follow the guidelines below. When in doubt, look at how other SDKs are implemented and follow the pattern.

1. Duplicate an existing folder inside [sdks](./sdks) as a template and rename it to be an unique name in the format of `sdk-$name`. Depending on the API you are working with, each of the following in would be the best starting point

   1. sdk-github: Simplest case with a single up to date OpenAPI spec
   2. sdk-twilio: Multiple OpenAPI spec in a single SDK
   3. sdk-apollo: Poliyfilling OpenAPI spec for API that does not natively have one
   4. sdk-salesloft: Extending the OpenAPI spec for an api that technically has a spec but is incomplete / out of date
   5. sdk-qbo: Support a non-RESTful HTTP api a with OpenAPI spec polyfill plus custom methods to handle custom sql-like QUERY for Quickbooks Online

2. Update references to match your API in `package.json`

   1. `name` field
   2. `download*` command in `scripts` field. If available, get OpenAPI spec from a url and save into the package as `$name.oas.json`. This step should depend on the internet
   3. `generate*` command in `scripts` field. Optionally generate OpenAPI spec json, then generate the `$name.oas.meta.ts` and `$name.oas.types.d.ts` via the `@opensdks/cli` . Unlike `download`, this step should NOT depend on the internet.

3. Modify `index.ts`

   1. Add in custom initialization parameters (typically auth credentials)
   2. (Optionally) extend the sdk definition in `index.ts` in the `createClient` property, for example adding support for custom non-RESTful api endpoints or simplify pagination with `AyncIterator` .
   3. Add an `index.spec.ts` ideally to ensure it works with a sample credential

4. Submit a PR 🎆

## Usage Examples

https://github.com/tonyxiao/openSDKs/blob/a3281e910c489fbeb7c70787a3fe6da5ca5f525f/examples/example.ts#L1-L128

https://github.com/tonyxiao/openSDKs/blob/a3281e910c489fbeb7c70787a3fe6da5ca5f525f/examples/summarize-pr.ts#L1-L54

For a full app example, check out the [`What did we work on app`](https://github.com/dosu-ai/what-did-we-work-on/). Demo link is here [https://what-did-we-work-on.vercel.app/](https://what-did-we-work-on.vercel.app/).

## FAQs

### The API I need does not have an OpenAPI spec!

You can polyfill it by create your own spec document and you don't need the API provider's permission to do so. After all a spec is nothing but a standardized description of the inputs expected by and output return by the API. And this is a lot easier than you might think because

1. You don't have to describe all the endpoints, only the ones you need to use, identical to how you are already manually adhoc-typing those `axios.get` or `(o)fetch` requets anyways and
2. With the help of `zod-openapi` it is boilerplate-free and you can use the full power of TS to avoid repeating yourself and auto-complete your way to success.

For an example, see `apollo.openapi.ts` in `sdk-apollo`

### But I would prefer adhoc ts types because codegen is annoying

Agreed codegen is annoying. The good news is that our chosen OpenAPI spec authoring library `zod-openapi` is buit on top of zod and if you use that you'd already have TypeScript types without any codegen! We would like to create a type utility that can transform the inferred types into the same structure as generated types expected by `@opensdks/runtime` so you can have a tight codegen-less feedback loop when polyfill-ing APIs. There are already prior art of this in `zodios` and `fets` so we know it's possible. Contribute if you'd like to see it sooner!

When publshing an idk-package however, you should always publish the `oas.json` file along with generated types, this is because 1) having OpenAPI document unlocks interoperatability & powerful functionality (such as the planned `runtimeValidateLink`) and 2) type inferance can be very taxing for the ts compiler and you wouldn't want to incur this cost unless you are the one authoring the spec. (The github generated types is 100k LOC, now try that with Zodios-style inference and watch your editor go up in flames 🔥) On that note, if you notice your IDE becoming slow you might also consider switching over to codegen pattern to help your compiler (and thus yourself) out. Luckily by building on top of `zod-openapi`, you can get the best of both worlds.

### What if an existing / official spec is wrong, incomplete or un-ergonomic?

We can use the source spec as starting point and modify it. For example the Slack OpenAPI spec requires a `token` header parameter for basically every `operation`, instead of properly leveraging `securitySchemas` and make it "generic" so to speak. Therefore we post-process the openapi spec in `slack.openapi.ts` to remove these `token` parameters so that the sdk consumer can just pass `token` once during initialization rather than on every request separately.

### How are links executed under the hood?

It actually a trivial recursive function which would have been a single line of code if not for the fact that we need to check every there is at least one link that actually terminates the request and returns a response to the client

```ts
function applyLinks(request: Request, links: Link[]): Promise<Response> {
  const [link, ...rest] = links
  if (!link) {
    throw new Error('Terminating link missing in links chain')
  }
  return link(request, (req) => applyLinks(req, rest))
}
```

Because links operate on standard web Request / Response objects, you can also use them outside of `@opensdks/runtime`. For example, here's how you can create a custom fetch function with links

```ts
import {applyLinks} from '@opensdks/links'

const myFetch: typeof globalThis.fetch = (url, init) =>
  applyLinks(new Request(url, init), [
    // add your own custom links, just don't forget to terminate
    logLink(),
    fetchLink(),
  ])

await myFetch('https://httpbin.org/get')
// [log] Request: HTTP GET https://httpbin.org/get
// [log] Response: 200 from https://httpbin.org/get
```

If you are creative, you can even find other uses for links For example, you can use links insde next.js' new app directory route handlers.

```ts
// @file: app/my-endpoint/route.ts
import {applyLinks} from '@opensdks/links'

const handler = (req) => {
  // do something
  return NextResponse.json({some: 'data'})
}

export function GET(req: NextRequest) {
  return applyLinks(req, [logLink(), handler])
}
```

### Why would I want to use this instead of the native SDK provided by each API vendor?

I mean did you read the [why](#why) section? 😅

Ok more seriously, it's easier to answer the reverse question - "when should I use the native SDK provided by API vendor instead of the standardized OpenSDKs"?

- You only work with a single api and therefore don't need to care about infrastructure consistency across them

- You prefer a different call style (e.g. `stripe.customers.list()` vs. `stripe.GET('/customers')` )
- You need features that are not yet supported by OpenSDKs
  - Examples of this include streaming responses, or support for converting JSON into non-JSON values (e.g. ISO date strings to/from `Date` objects)
  - Please do open a github issues though so we can prioiritize those based on demand.
- You want your life to be difficult (sorry did I say I was going to be serious? 🙊)

It's worth noting that the best APIs already generate SDKs from OpenAPI specs (e.g. Github, Slack, OpenAI) so an OpenSDK would therefore give you the exact same set of typesafe endpoints as custom SDK, just in more a consistent and extensible way.

### This looks great. Can I use this for our internal / private API?

Yes as long as you have a RESTful API. OpenSDKs works best if your API already produces an OpenAPI spec, otherwise you can always polyfill one (we have many examples of this, e.g. [sdk-apollo](./sdks/sdk-apollo)).

If you already use tech such as GraphQL / trpc / grpc / direct db access in React server component that comes with type safety out of the box, then OpenSDKs would not be necessary.

There are other protocols that don't have inherent type safety such as json-rpc that could benefit from OpenSDKs. We are looking to support those too, please open an issue to let us know your use case.

### I don't like types, should I still use OpenSDKs?

🤷 I feel bad for you, but you can still use this library from JS. You will still benefit from the extensibility provided by links and pre-packaged SDKs that expose additional functionalities on top of api calls. For example, see the `getAll` method inside [sdk-qbo](./sdks/sdk-qbo) that returns an `AsyncIterator` that uses Quickbooks' custom query language to paginate through all entities of a given type.

### What do you plan to work on next?

You tell us! Check out our roadmap on Github and tell us what's important to you.

### How does this relate to trpc? Does this replace it?

No not at all. In all likelihood you will using OpenSDKs together with trpc.

trpc is designed for internal client-server communication in your full-stack TypeScript web app, and it is useless when you don't have access to the server's source code, assuming it is even written in TypeScript to begin with.

On the other hand OpenSDKs is most valuable when you are working with multiple 3rd party APIs that you don't control, where each SDK is either an `npm install` or `npx @opensdks/cli generate` away.

## Releasing a package

0. Ensure you have built the CLI by running `cd packages/cli && pnpm install && pnpm run build`
1. Make any changes to the `src` folder of the package, usually in the `src/{name}.oas.ts` file
2. Run `turbo run download --filter {package-name i.e. sdk-qbo}` to download the package
3. Run `turbo run generate --filter {package-name i.e. sdk-qbo}` to generate the package
4. Run `turbo run build --filter {package-name i.e. sdk-qbo}` to build the package
5. Ensure that your changes made it to the auto generated files in the package top level folder (i.e. `{name}.oas.types.d.ts` & `{name}.oas.json`)
6. Make sure you have bumped the version in `package.json` of the package you are releasing
7. Run `pnpm -r publish --no-git-checks` to release the package from the directory of the package
8. Push your changes to the repository

## Community

The OpenSDKs roadmap can be found on [GitHub Projects](https://github.com/orgs/tonyxiao/projects/2).

Follow us on [Twitter](https://twitter.com/openSDKs) for updates.

To get support from the team and chat with other community members you can join the [OpenSDKs Discord](https://discord.gg/dHdefDmjnK).

## Contributors

<img src="https://contributors-img.web.app/image?repo=tonyxiao/openSDKs"/>

## Credits

- [drwpow/openapi-typescript](github.com/drwpow/openapi-typescript) - OpenSDKs would not be exist if not for the amazing work done by @drwpow. `@opensdks/runtime` depends on `openapi-fetch` and `@opensdks/cli` 's `generate` command uses `openapi-typescript` under the hood.
- [APIs-guru/openapi-directory](https://github.com/APIs-guru/openapi-directory) - For creating the largest OpenAPI spec registry in the world. I just wish more people knew about you.
- [trpc/trpc](https://github.com/trpc/trpc) - For pioneering such an amazing deveoper experience! We borrowed a lot of ideas from you (ok fine I know you borrowed links from apollo too :P), in particular using ES proxy to allow VSCode to `go to definition` from api call site directly to route definition is amazing, and we are shamelessly borrowing that.
- [apollographql/apollo-client](https://github.com/apollographql/apollo-client) - for being the OG of links (as far as I know!) and certainly for introducing me to them. I am still missing `apollo-link-state` and `graphql-anywhere` to this date. Would you ever bring it back? :/
