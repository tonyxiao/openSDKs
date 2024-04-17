import {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

const greenhouseDepartment = z.object({
  id: z.number(),
  name: z.string(),
  parent_id: z.string().nullish(),
  parent_department_external_ids: z.string().nullish(),
  child_ids: z.array(z.number()).nullish(),
  child_department_external_ids: z.array(z.number()).nullish(),
  external_id: z.string(),
})

// TODO (@tony): Support children field recursively. Would you know a workaround?
// export type GreenhouseDepartment = z.infer<typeof greenhouseDepartmentBase> & {
//   children: GreenhouseDepartment[]
// }

// export let greenhouseDepartment: z.ZodType<GreenhouseDepartment> =
//   greenhouseDepartmentBase.extend({
//     children: z.lazy(() => greenhouseDepartment.array()),
//   })

export const oas: OpenAPISpec = createDocument({
  openapi: '3.1.0',
  info: {title: 'Greenhouse Harvest API', version: '0.0.0'},
  servers: [{url: 'https://harvest.greenhouse.io'}],
  security: [{api_key: []}],
  components: {
    securitySchemes: {
      api_key: {type: 'apiKey', name: 'api_key', in: 'query'},
    },
  },
  paths: {
    '/v1/departments/{id}': {
      get: jsonOperation('getDepartment', {
        path: z.object({
          id: z.string().describe('The ID of the department to retrieve'),
        }),
        response: greenhouseDepartment,
        query: z.object({
          render_as: z
            .enum(['list', 'tree'])
            .default('list')
            .nullish()
            .describe(
              "This parameter defines how to represent the list of departments. The default value is 'list’, which returns a flat list of departments. If this is set to 'tree’, departments are represented in a tree-like structure where they may include sub-departments as children.",
            ),
        }),
      }),
    },
    '/v1/departments': {
      get: jsonOperation('getDepartments', {
        response: z.array(greenhouseDepartment),
        query: z.object({
          render_as: z
            .enum(['list', 'tree'])
            .default('list')
            .nullish()
            .describe(
              "This parameter defines how to represent the list of departments. The default value is 'list’, which returns a flat list of departments. If this is set to 'tree’, departments are represented in a tree-like structure where they may include sub-departments as children.",
            ),
          per_page: z
            .number()
            .min(1)
            .max(500)
            .optional()
            .describe(
              'Return up to this number of objects per response. Must be an integer between 1 and 500. Defaults to 100.',
            )
            .default(100),
          page: z
            .number()
            .optional()
            .describe(
              'A cursor for use in pagination. Returns the n-th chunk of per_page objects.',
            ),
          external_id: z
            .string()
            .optional()
            .describe(
              'If supplied, only return department(s) with that external ID.',
            ),
        }),
      }),
    },
  },
})

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
