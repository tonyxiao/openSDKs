import {modifyRequest} from './modifyRequestResponse.js'

test('modifyRequest', () => {
  const req = new Request('https://httpbin.org/anything', {method: 'GET'})

  expect(req.body).toBeNull()
  const req2 = modifyRequest(req, {method: 'HEAD'})
  expect(req2.method).toEqual('HEAD')
  expect(req2.body).toBeNull()
})

test('modifyRequest with body', () => {
  expect(
    () =>
      new Request('https://httpbin.org/anything', {method: 'GET', body: '123'}),
  ).toThrow('Request with GET/HEAD method cannot have body.')
})
