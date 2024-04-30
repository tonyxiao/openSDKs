import {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

const leverPosting = z
  .object({
    id: z.string(),
    text: z.string(),
    createdAt: z.number(),
    updatedAt: z.number(),
    user: z.string(),
    owner: z.string(),
    hiringManager: z.string(),
    confidentiality: z.enum(['non-confidential']),
    categories: z.object({
      team: z.string(),
      department: z.string(),
      location: z.string(),
      allLocations: z.array(z.string()),
      commitment: z.string(),
      level: z.string(),
    }),
    content: z.object({
      description: z.string(),
      descriptionHtml: z.string(),
      lists: z.array(
        z.object({
          text: z.string(),
          content: z.string(),
        }),
      ),
      closing: z.string(),
      closingHtml: z.string(),
    }),
    country: z.string(),
    tags: z.array(z.string()),
    state: z.enum(['published']),
    distributionChannels: z.array(z.enum(['internal', 'public'])),
    reqCode: z.string(),
    requisitionCodes: z.array(z.string()),
    salaryDescription: z.string(),
    salaryDescriptionHtml: z.string(),
    salaryRange: z.object({
      max: z.number(),
      min: z.number(),
      currency: z.string(),
      interval: z.enum(['per-year-salary']),
    }),
    urls: z.object({
      list: z.string().url(),
      show: z.string().url(),
      apply: z.string().url(),
    }),
    workplaceType: z.enum(['remote']),
  })
  .catchall(z.unknown())
  .openapi({ref: 'posting'})

export const oas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Lever API', version: '1.0.0'},
  servers: [{url: 'https://api.lever.co/v1'}],
  paths: {
    '/postings/{id}': {
      get: jsonOperation('getPosting', {
        path: z.object({
          id: z.string().describe('The ID of the posting to retrieve'),
        }),
        response: leverPosting,
      }),
    },
  },
})

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
