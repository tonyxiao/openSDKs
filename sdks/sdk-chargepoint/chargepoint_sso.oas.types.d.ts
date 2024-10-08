/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/user/login': {
    post: operations['userLogin']
  }
}

export type webhooks = Record<string, never>

export type components = Record<string, never>

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  userLogin: {
    requestBody?: {
      content: {
        'application/json': {
          username: string
          password: string
          /** @example America/Los_Angeles */
          timezone?: string
          /** @example 420 */
          timezone_offset?: number
        }
      }
    }
    responses: {
      200: {
        content: {
          'application/json': {
            token: string
            redirect_url: string
          }
        }
      }
    }
  }
}

export interface oasTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export default oasTypes
