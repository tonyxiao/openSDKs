/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/oauth2/auth': {
    /** /oauth2/auth */
    get: operations['start-the-oauth2-flow']
  }
  '/oauth2/token': {
    /** /oauth2/token */
    post: operations['obtain-the-access-token-with-authorization-code-grant-type']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: never
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /** /oauth2/auth */
  'start-the-oauth2-flow': {
    parameters: {
      query: {
        /** @description The client ID you received from Mercury when you registered the client. */
        client_id: string
        /** @description The URL in your application where users will be sent after authorization. Must match one of the URLs registered with the client */
        redirect_uri: string
        /** @description A space-separated list of scopes that your client requests. */
        scope: string
        /** @description An unguessable random string, at least 8 characters long, used to protect against cross-site request forgery attacks. */
        state: string
        /** @description Tells the authorization server which type of grant to execute. Must have value "code". */
        response_type: string
        /** @description Required for clients with PKCE flow. Base64-URL-encoded string of the SHA256 hash of the code verifier. */
        code_challenge?: string
        /** @description Required for clients with PKCE flow. Must have value S256, the SHA256 function used to hash the code challenge. */
        code_challenge_method?: string
      }
    }
    responses: {
      /** @description 302 */
      302: {
        content: {
          'text/plain': unknown
        }
      }
    }
  }
  /** /oauth2/token */
  'obtain-the-access-token-with-authorization-code-grant-type': {
    parameters: {
      header?: {
        /** @description Basic base64(`client_id` + ":" + `client_secret`). Do not include this header for clients with PKCE. */
        Authorization?: string
      }
    }
    requestBody?: {
      content: {
        'application/json': {
          /**
           * @description Must be either `authorization_code` or `refresh_token`.
           * @default authorization_code
           */
          grant_type: string
          /** @description The client ID you received from Mercury when you registered the client. */
          client_id: string
          /** @description The authorization code that the application received with redirect. Use together with `grant_type=authorization_code`. */
          code?: string
          /** @description The refresh token from the last grant if the `offline_access` scope was included. Use together with `grant_type=refresh_token`. */
          refresh_token?: string
          /** @description The URL in your application where users are sent after authorization. Required for `grant_type=authorization_code`. */
          redirect_uri?: string
          /** @description Required for clients with PKCE flow when using authorization code. Use together with `grant_type=authorization_code`. This is the value whose hash was sent as `code_challenge` when starting the flow.. */
          code_verifier?: string
        }
      }
    }
    responses: {
      /** @description 200 */
      200: {
        content: {
          'application/json': {
            /** @example ePtOutNdgWGW0U_fqD5jYAeqRWZS3Lq42ta006AU1SY.33kXEy9SjfcInzrAEdIwA10vY2eB3coQR4B5rmYZkA0 */
            access_token?: string
            /**
             * @default 0
             * @example 3599
             */
            expires_in?: number
            /** @example xyW_aYamSQaEhh6gzWCjuL6QO9Gfw_zFBY8dwFT04zw.tLKYDaNs12JVxtb53LKh5Na_W_FWOAdw7roaryUfZUI */
            refresh_token?: string
            /** @example read offline_access */
            scope?: string
            /** @example bearer */
            token_type?: string
          }
        }
      }
      /** @description 400 */
      400: {
        content: {
          'application/json': {
            /** @example invalid_grant */
            error?: string
            /** @example The provided authorization grant (e.g., authorization code, resource owner credentials) or refresh token is invalid, expired, revoked, does not match the redirection URI used in the authorization request, or was issued to another client. not_found */
            error_description?: string
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
