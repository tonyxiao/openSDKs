import {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

export const category = z
  .enum([
    'hris',
    'ats',
    'accounting',
    'ticketing',
    'crm',
    'mktg',
    'filestorage',
  ])
  .openapi({ref: 'category'})

export type Integration = z.infer<typeof integration>
export const integration = z
  .object({
    name: z.string(),
    slug: z.string(),
    image: z.string(),
    square_image: z.string(),
    color: z.string(),
    categories: z.array(category),
  })
  .openapi({ref: 'integration'})

export const oas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Merge API', version: '0.0.0'},
  servers: [{url: 'https://api.merge.dev/api'}],
  security: [{apikey: []}, {x_account_token: []}],
  components: {
    securitySchemes: {
      x_account_token: {type: 'apiKey', name: 'X-Account-Token', in: 'header'},
      apikey: {type: 'oauth2', name: 'authorization', in: 'header'},
    },
  },
  paths: {
    '/integrations/': {
      get: jsonOperation('Request All Merge Integrations', {
        response: z.array(integration),
      }),
    },
    '/organizations/integrations': {
      get: jsonOperation("Request My Organization's Enabled Integrations", {
        response: z.object({
          next: z.string().nullish(),
          previous: z.string().nullish(),
          results: z.array(integration),
        }),
      }),
    },
    '/account-token/{public_token}': {
      get: jsonOperation('Request Account Token', {
        path: z.object({public_token: z.string()}),
        response: z.object({account_token: z.string(), integration}),
      }),
    },
    '/create-link-token': {
      post: jsonOperation('Create Link Token', {
        body: z.object({
          /** Unique ID for your end user */ end_user_origin_id: z.string(),
          end_user_organization_name: z.string(),
          end_user_email_address: z.string(),
          categories: z.array(category),
          integration: z.string().nullish(),
        }),
        response: z.object({
          link_token: z.string(),
          integration_name: z.string().nullish(),
        }),
      }),
    },
  },
})

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
