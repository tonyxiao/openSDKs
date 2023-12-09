import {initSDK} from '@opensdks/core'
import {apolloSdkDef} from './index'

const apollo = initSDK(apolloSdkDef, {
  api_key: process.env['APOLLO_API_KEY']!,
})

void apollo.GET('/v1/email_accounts')
