import axios from 'axios'
import type {Operation} from './links'
import {
  applyLinks,
  axiosLink,
  fetchLink,
  logLink,
  retryLink,
  throwLink,
} from './links'

const op: Operation = {
  url: new URL('https://httpbin.org/anything'),
  method: 'GET',
  headers: {},
}

describe('applyLinks', () => {
  test('Throw if no links provided', () => {
    expect(() => applyLinks(op, [])).toThrow('Terminating link missing')
  })

  test('Throw if missing terminating link', () => {
    expect(() => applyLinks(op, [(op, next) => next(op)])).toThrow(
      'Terminating link missing',
    )
  })
})

test('logLink', async () => {
  const lines: unknown[] = []
  const res = await applyLinks(op, [
    logLink({log: (...args) => lines.push(args)}),
    () => Promise.resolve(new Response(null, {status: 404})),
  ])
  expect(res.status).toEqual(404)
  expect(lines).toEqual([
    ['[#1 Request]', 'GET', 'https://httpbin.org/anything'],
    ['[#1 Response]', '', 404],
  ])
})

test('throwLink', async () => {
  await expect(
    applyLinks(op, [
      throwLink({maxCount: 1}),
      () => Promise.resolve(new Response(null, {status: 200})),
    ]),
  ).rejects.toThrow('Throwing #1')
})

describe('retryLink', () => {
  test('success', async () => {
    await expect(
      applyLinks(op, [
        retryLink({maxCount: 1}),
        throwLink({maxCount: 1}),
        () => Promise.resolve(new Response(null, {status: 200})),
      ]),
    ).resolves.toMatchObject({status: 200})
  })

  test('exhausted max tries', async () => {
    await expect(
      applyLinks(op, [
        retryLink({maxCount: 2}),
        throwLink({maxCount: 3}),
        () => Promise.resolve(new Response(null, {status: 200})),
      ]),
    ).rejects.toThrow('Throwing #3')
  })
})

describe.each([
  ['fetch', fetchLink()],
  ['axios', axiosLink({axios})],
])('%s links', (_, link) => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */

  test('GET anything', async () => {
    const res = await applyLinks(op, [link])
    expect(res.status).toEqual(200)
    const data = await res.json()
    expect(data).toMatchObject({url: op.url.href})
    expect(data.headers['Content-Type']).toBeUndefined()
  })

  test('POST json body', async () => {
    const res = await applyLinks(
      {...op, method: 'POST', body: {hello: 'world'}},
      [link],
    )
    const data = await res.json()
    expect(data.json).toEqual({hello: 'world'})
    expect(data.headers['Content-Type']).toContain('application/json')
  })

  test('POST text body', async () => {
    const res = await applyLinks(
      {
        ...op,
        method: 'POST',
        body: 'hello world',
      },
      [link],
    )
    const data = await res.json()
    expect(data.data).toEqual('hello world')
    expect(data.headers['Content-Type']).toContain('text/plain')
  })

  // TODO: Test error handling for both 4xx and 5xx errors

  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
})
