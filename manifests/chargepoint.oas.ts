import type {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

export const ssoOas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Chargepoint SSO', version: '0.0.0'},
  servers: [{url: 'https://sso.chargepoint.com/api/v1'}],
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

export const naOas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Chargepoint North America', version: '0.0.0'},
  servers: [{url: 'https://na.chargepoint.com/'}],
  security: [{cookie: []}],
  components: {
    securitySchemes: {
      cookie: {type: 'apiKey', name: 'Cookie', in: 'header'},
    },
  },
  paths: {
    '/index.php/community/getRegionQueues': {
      post: jsonOperation('getRegionQueues', {
        response: z.object({
          status: z.number(),
          response: z.object({
            message: z.object({
              regions: z.array(
                z.object({
                  regionId: z.string(),
                  name: z.string(),
                  neLat: z.string(),
                  neLng: z.string(),
                  swLat: z.string(),
                  swLng: z.string(),
                  includeDcFast: z.string(),
                  isDynamic: z.string(),
                  regionUntilTime: z.string(),
                  queueUntilTime: z.null(),
                  isActive: z.string(),
                  regionStatus: z.object({status: z.string()}),
                  schedulerData: z.array(z.unknown()),
                  portQueue: z.array(z.unknown()),
                  stationNum: z.number(),
                  responsePending: z.object({
                    deviceDetailId: z.string(),
                    deviceId: z.string(),
                    state: z.string(),
                  }),
                }),
              ),
              stationStatus: z.array(z.unknown()),
              mode: z.number(),
            }),
          }),
          stationStatus: z.array(z.unknown()),
        }),
      }),
    },
    '/index.php/community/activateRegion': {
      post: jsonOperation('activateRegion', {
        response: z.object({}),
      }),
    },
  },
})

export default [ssoOas, naOas]
