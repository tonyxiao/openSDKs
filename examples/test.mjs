import {initSDK} from '@opensdks/runtime'
import {veniceSdkDef} from '@opensdks/sdk-venice'

const venice = initSDK(veniceSdkDef)

const res = await venice.GET('/health')

console.log(res.data)
