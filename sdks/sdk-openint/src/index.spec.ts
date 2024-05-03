import {jest} from '@jest/globals'
import initOpenIntSDK from './index.js'

jest.setTimeout(70 * 15 * 1000) // In case of cold start

test('healthcheck with default init', async () => {
  const openint = initOpenIntSDK({headers: {}})
  expect(await openint.GET('/health').then((r) => r.data)).toBeTruthy()
})
