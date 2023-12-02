import {createClient} from '@opensdks/core'
import type {paths} from './venice.oas'

const venice = createClient<paths>({baseUrl: 'https://app.venice.is/api/v0'})

test('healthcheck', async () => {
  expect(await venice.GET('/health').then((r) => r.data)).toBeTruthy()
})
