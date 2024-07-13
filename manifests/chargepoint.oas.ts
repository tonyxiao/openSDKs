import type {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

export const oas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Chargepoint', version: '0.0.0'},
  servers: [
    {url: 'https://sso.chargepoint.com/api/v1', description: 'SSO'},
    {url: 'https://na.chargepoint.com', description: 'NA'},
  ],
  security: [{cookie: []}],
  components: {
    securitySchemes: {
      cookie: {type: 'apiKey', name: 'Cookie', in: 'header'},
    },
  },
  paths: {
    '/user/login': {
      post: jsonOperation('userLogin', {
        body: z.object({
          username: z.string(),
          password: z.string(),
          timezone: z
            .string()
            .optional()
            .openapi({example: 'America/Los_Angeles'}),
          timezone_offset: z.number().optional().openapi({example: 420}),
        }),
        response: z.object({
          token: z.string(),
          redirect_url: z.string(),
        }),
      }),
    },
  },
})

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
