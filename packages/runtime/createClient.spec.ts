import {createFormUrlEncodedBodySerializer} from '@opensdks/runtime'

test('application/x-www-form-urlencoded defaut dot style', () => {
  const formUrlEncodedBodySerializer = createFormUrlEncodedBodySerializer({})
  expect(formUrlEncodedBodySerializer({a: 1, b: 2} as never)).toEqual('a=1&b=2')

  expect(
    formUrlEncodedBodySerializer({
      account: 'acct_111222',
      components: {account_onboarding: {enabled: true}},
    } as never),
  ).toEqual('account=acct_111222&components.account_onboarding.enabled=true')

  expect(
    formUrlEncodedBodySerializer({
      account: 'acct_111222',
      components: {
        nested: ['hello', 'world'],
      },
    } as never),
  ).toEqual(
    'account=acct_111222&components.nested.0=hello&components.nested.1=world',
  )
})

test('application/x-www-form-urlencoded bracket style', () => {
  const formUrlEncodedBodySerializer = createFormUrlEncodedBodySerializer({
    keypathStyle: 'bracket',
  })

  expect(formUrlEncodedBodySerializer({} as never)).toEqual('')
  expect(formUrlEncodedBodySerializer([] as never)).toEqual('')

  expect(formUrlEncodedBodySerializer({a: 1, b: 2} as never)).toEqual('a=1&b=2')
  expect(formUrlEncodedBodySerializer(['a', 'b'] as never)).toEqual('0=a&1=b')

  expect(
    formUrlEncodedBodySerializer({a: new Date(), b: '2'} as never),
  ).toEqual('b=2')

  expect(
    formUrlEncodedBodySerializer({
      account: 'acct_111222',
      components: {
        account_onboarding: {enabled: true},
        nested: ['hello', {key: 'world'}],
      },
    } as never),
  ).toEqual(
    'account=acct_111222&components[account_onboarding][enabled]=true&components[nested][0]=hello&components[nested][1][key]=world',
  )
})
