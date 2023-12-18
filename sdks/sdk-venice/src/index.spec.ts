import {jest} from '@jest/globals'
import {initSDK} from '@opensdks/runtime'
import initVeniceSDK, {veniceSdkDef} from './index.js'

jest.setTimeout(70 * 15 * 1000) // In case of cold start

test('healthcheck', async () => {
  const venice = initSDK(veniceSdkDef, {headers: {}})
  expect(await venice.GET('/health').then((r) => r.data)).toBeTruthy()
})

test('healthcheck with default init', async () => {
  const venice = initVeniceSDK({headers: {}})
  expect(await venice.GET('/health').then((r) => r.data)).toBeTruthy()
})
