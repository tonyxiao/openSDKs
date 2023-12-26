import {modifyRequest, modifyUrl} from './modifyRequestResponse.js'

test('modifyUrl', () => {
  expect(
    modifyUrl('https://httpbin.org/anything', {protocol: 'http:'}),
  ).toEqual('http://httpbin.org/anything')
  expect(modifyUrl('https://httpbin.org/anything', {protocol: 'http'})).toEqual(
    'http://httpbin.org/anything',
  )
  expect(modifyUrl('https://httpbin.org/anything', {port: '3000'})).toEqual(
    'https://httpbin.org:3000/anything',
  )
})

test('modifyUrl searchParams', () => {
  expect(
    modifyUrl('https://httpbin.org/anything', {searchParams: {a: 1}}),
  ).toEqual('https://httpbin.org/anything?a=1')

  expect(modifyUrl('/anything', {searchParams: {a: 1}})).toEqual(
    '/anything?a=1',
  )

  expect(modifyUrl('/anything?va=11', {searchParams: {a: 1}})).toEqual(
    '/anything?va=11&a=1',
  )
  expect(
    modifyUrl('/anything?va=11', {searchParams: (sp) => sp.delete('va')}),
  ).toEqual('/anything')
})

test('modifyRequest', () => {
  const req = new Request('https://httpbin.org/anything', {method: 'GET'})

  expect(req.body).toBeNull()
  const req2 = modifyRequest(req, {
    method: 'HEAD',
    url: {searchParams: {hello: 'world'}},
  })
  expect(req2.method).toEqual('HEAD')
  expect(req2.body).toBeNull()
  expect(req2.url).toEqual('https://httpbin.org/anything?hello=world')
})

test('modifyRequest with body', () => {
  expect(
    () =>
      new Request('https://httpbin.org/anything', {method: 'GET', body: '123'}),
  ).toThrow('Request with GET/HEAD method cannot have body.')
})
