import {jest} from '@jest/globals'
import {initSDK} from '@opensdks/runtime'
import {veniceSdkDef} from './index.js'

jest.setTimeout(70 * 15 * 1000) // In case of cold start

const venice = initSDK(veniceSdkDef, {headers: {}})

test('healthcheck', async () => {
  expect(await venice.GET('/health').then((r) => r.data)).toBeTruthy()
})
