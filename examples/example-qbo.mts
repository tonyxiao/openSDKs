import {initSDK} from '@opensdks/runtime'
import {qboSdkDef} from '@opensdks/sdk-qbo'

const realmId = process.env['QBO_REALM_ID']!

const qbo = initSDK(qboSdkDef, {
  realmId: process.env['QBO_REALM_ID']!,
  envName: 'sandbox',
  accessToken: '',
})

const r = await qbo.GET('/companyinfo/{id}', {params: {path: {id: realmId}}})
//    ^?
console.log(r.data)

await qbo.GET('/account/{id}', {params: {path: {id: '33'}}})

await qbo.query('SELECT * FROM Account')

// qbo.GET('/preferences').then((r) => {
//   console.log(r.data)
// })
