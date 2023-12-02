
```ts

const discord = createSdk(discordSdkDef, {
  links: [
    rateLimitLink({storage: AsyncStorage}),
    retryLink(),
    authorizationLink({storage: AsyncStorage}),
    logLink({verbose: true}),
  ]
})
```