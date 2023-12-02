// codegen:start {preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "./**/*.{d,spec,test,fixture,gen,node,bootstrap}.{ts,tsx}"}
export * from './createClient'
export * from './createOauthClient'
export * from './HTTPError'
export * from './proxy.bootstrap'
// codegen:end

import type { oas30, oas31 } from 'openapi3-ts'


export type OpenAPISpec = oas30.OpenAPIObject | oas31.OpenAPIObject

// export interface SdkTypes {
//   components: unknown
//   external: unknown
//   operations: unknown
//   paths: unknown
//   webhooks: unknown
// }

/** Get this from openapi */
export interface SdkDefinition<Paths extends {}> {
  _types: {paths: Paths}
  oas: OpenAPISpec
}
