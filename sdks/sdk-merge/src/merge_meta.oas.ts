import {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

export type Integration = z.infer<typeof integration>
export const integration = z
  .object({
    name: z.string(),
    slug: z.string(),
    image: z.string(),
    square_image: z.string(),
    color: z.string(),
    categories: z.array(z.string()),
  })
  .openapi({ref: 'integration'})

export const oas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Merge API', version: '0.0.0'},
  servers: [{url: 'https://api.merge.dev'}],
  security: [{apikey: []}, {x_account_token: []}],
  components: {
    securitySchemes: {
      x_account_token: {type: 'apiKey', name: 'X-Account-Token', in: 'header'},
      apikey: {type: 'oauth2', name: 'authorization', in: 'header'},
    },
  },
  paths: {
    '/api/integrations/': {
      get: jsonOperation('Request All Merge Integrations', {
        response: z.array(integration),
      }),
    },
    '/api/organizations/integrations': {
      get: jsonOperation("Request My Organization's Enabled Integrations", {
        response: z.object({
          next: z.string().nullish(),
          previous: z.string().nullish(),
          results: z.array(integration),
        }),
      }),
    },
  },
})

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
