// @ts-nocheck
/* eslint-disable promise/catch-or-return */
import createClient from 'openapi-fetch'
import {applyLinks, fetchLink, logLink} from '@opensdks/fetch-links'

const customFetch = (url, init) =>
  applyLinks(new Request(url, init), [
    logLink(),
    // other links as desired...
    fetchLink(),
  ])

const client = createClient({
  fetch: customFetch,
  baseUrl: 'https://httpbin.org',
})

client.GET('/anything', {}).then((r) => console.log(r.data))
