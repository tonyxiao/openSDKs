const {initSDK} = require('@opensdks/runtime')
const {veniceSdkDef} = require('@opensdks/sdk-venice')

const venice = initSDK(veniceSdkDef)

void venice.GET('/health').then((r) => {
  console.log(r.data)
})
