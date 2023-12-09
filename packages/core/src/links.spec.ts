import type {Operation} from './links'
import {applyLinks, fetchLink, logLink, retryLink, throwLink} from './links'

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

describe('fetchLink', () => {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */

  test('GET anything', async () => {
    const res = await applyLinks(op, [fetchLink()])
    expect(res.status).toEqual(200)
    const data = await res.json()
    expect(data).toMatchObject({url: op.url.href})
    expect(data.headers['Content-Type']).toBeUndefined()
  })

  test('POST json body', async () => {
    const res = await applyLinks(
      {...op, method: 'POST', body: {hello: 'world'}},
      [fetchLink()],
    )
    const data = await res.json()
    expect(data.json).toEqual({hello: 'world'})
    expect(data.headers['Content-Type']).toEqual('application/json')
  })

  test('POST text body', async () => {
    const res = await applyLinks({...op, method: 'POST', body: 'hello world'}, [
      fetchLink(),
    ])
    const data = await res.json()
    expect(data.data).toEqual('hello world')
    expect(data.headers['Content-Type']).toEqual('text/plain;charset=UTF-8')
  })

  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
})
