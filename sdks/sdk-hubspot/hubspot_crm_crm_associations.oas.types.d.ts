/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/{fromObjectType}/{toObjectType}/batch/archive': {
    /**
     * Delete
     * @description Batch delete associations for objects
     */
    post: operations['post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/archive']
  }
  '/{fromObjectType}/{toObjectType}/batch/associate/default': {
    /**
     * Create Default Associations
     * @description Create the default (most generic) association type between two object types
     */
    post: operations['post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/associate/default']
  }
  '/{fromObjectType}/{toObjectType}/batch/create': {
    /**
     * Create
     * @description Batch create associations for objects
     */
    post: operations['post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/create']
  }
  '/{fromObjectType}/{toObjectType}/batch/labels/archive': {
    /**
     * Delete Specific Labels
     * @description Batch delete specific association labels for objects. Deleting an unlabeled association will also delete all labeled associations between those two objects
     */
    post: operations['post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/labels/archive']
  }
  '/{fromObjectType}/{toObjectType}/batch/read': {
    /**
     * Read
     * @description Batch read associations for objects to specific object type. The 'after' field in a returned paging object  can be added alongside the 'id' to retrieve the next page of associations from that objectId. The 'link' field is deprecated and should be ignored.
     */
    post: operations['post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/read']
  }
  '/{fromObjectType}/{toObjectType}/labels': {
    /**
     * Read
     * @description Returns all association types between two object types
     */
    get: operations['get-/crm/v4/associations/{fromObjectType}/{toObjectType}/labels']
    /**
     * Update
     * @description Update a user defined association definition
     */
    put: operations['put-/crm/v4/associations/{fromObjectType}/{toObjectType}/labels']
    /**
     * Create
     * @description Create a user defined association definition
     */
    post: operations['post-/crm/v4/associations/{fromObjectType}/{toObjectType}/labels']
  }
  '/{fromObjectType}/{toObjectType}/labels/{associationTypeId}': {
    /**
     * Delete
     * @description Deletes an association definition
     */
    delete: operations['delete-/crm/v4/associations/{fromObjectType}/{toObjectType}/labels/{associationTypeId}']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    StandardError: {
      status: string
      id?: string
      category: components['schemas']['ErrorCategory']
      subCategory?: Record<string, never>
      message: string
      errors: components['schemas']['ErrorDetail'][]
      context: {
        [key: string]: string[]
      }
      links: {
        [key: string]: string
      }
    }
    LabelsBetweenObjectPair: {
      fromObjectTypeId: string
      /** Format: int32 */
      fromObjectId: number
      toObjectTypeId: string
      /** Format: int32 */
      toObjectId: number
      labels: string[]
    }
    PublicAssociationMultiWithLabel: {
      from: components['schemas']['PublicObjectId']
      to: components['schemas']['MultiAssociatedObjectWithLabel'][]
      paging?: components['schemas']['Paging']
    }
    BatchInputPublicDefaultAssociationMultiPost: {
      inputs: components['schemas']['PublicDefaultAssociationMultiPost'][]
    }
    BatchInputPublicAssociationMultiArchive: {
      inputs: components['schemas']['PublicAssociationMultiArchive'][]
    }
    PublicAssociationDefinitionUpdateRequest: {
      label: string
      /** Format: int32 */
      associationTypeId: number
    }
    MultiAssociatedObjectWithLabel: {
      /** Format: int32 */
      toObjectId: number
      associationTypes: components['schemas']['AssociationSpecWithLabel'][]
    }
    ErrorDetail: {
      /** @description A human readable message describing the error along with remediation steps where appropriate */
      message: string
      /** @description The name of the field or parameter in which the error was found. */
      in?: string
      /** @description The status code associated with the error detail */
      code?: string
      /** @description A specific category that contains more specific detail about the error */
      subCategory?: string
      /**
       * @description Context about the error condition
       * @example {
       *   "missingScopes": [
       *     "scope1",
       *     "scope2"
       *   ]
       * }
       */
      context?: {
        [key: string]: string[]
      }
    }
    AssociationSpecWithLabel: {
      /** @enum {string} */
      category: 'HUBSPOT_DEFINED' | 'USER_DEFINED' | 'INTEGRATOR_DEFINED'
      /** Format: int32 */
      typeId: number
      label?: string
    }
    PublicAssociationMultiPost: {
      from: components['schemas']['PublicObjectId']
      to: components['schemas']['PublicObjectId']
      types: components['schemas']['AssociationSpec'][]
    }
    BatchResponseLabelsBetweenObjectPair: {
      /** @enum {string} */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
      results: components['schemas']['LabelsBetweenObjectPair'][]
      /** Format: date-time */
      requestedAt?: string
      /** Format: date-time */
      startedAt: string
      /** Format: date-time */
      completedAt: string
      links?: {
        [key: string]: string
      }
    }
    PublicObjectId: {
      id: string
    }
    PublicAssociationDefinitionCreateRequest: {
      label: string
      name: string
    }
    PublicAssociationMultiArchive: {
      from: components['schemas']['PublicObjectId']
      to: components['schemas']['PublicObjectId'][]
    }
    BatchResponsePublicAssociationMultiWithLabelWithErrors: {
      /** @enum {string} */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
      results: components['schemas']['PublicAssociationMultiWithLabel'][]
      /** Format: int32 */
      numErrors?: number
      errors?: components['schemas']['StandardError'][]
      /** Format: date-time */
      requestedAt?: string
      /** Format: date-time */
      startedAt: string
      /** Format: date-time */
      completedAt: string
      links?: {
        [key: string]: string
      }
    }
    Paging: {
      next?: components['schemas']['NextPage']
      prev?: components['schemas']['PreviousPage']
    }
    PublicDefaultAssociation: {
      from: components['schemas']['PublicObjectId']
      to: components['schemas']['PublicObjectId']
      associationSpec: components['schemas']['AssociationSpec']
    }
    /**
     * @example {
     *   "message": "Invalid input (details will vary based on the error)",
     *   "correlationId": "aeb5f871-7f07-4993-9211-075dc63e7cbf",
     *   "category": "VALIDATION_ERROR",
     *   "links": {
     *     "knowledge-base": "https://www.hubspot.com/products/service/knowledge-base"
     *   }
     * }
     */
    Error: {
      /**
       * @description A human readable message describing the error along with remediation steps where appropriate
       * @example An error occurred
       */
      message: string
      /**
       * Format: uuid
       * @description A unique identifier for the request. Include this value with any error reports or support tickets
       * @example aeb5f871-7f07-4993-9211-075dc63e7cbf
       */
      correlationId: string
      /** @description The error category */
      category: string
      /** @description A specific category that contains more specific detail about the error */
      subCategory?: string
      /** @description further information about the error */
      errors?: components['schemas']['ErrorDetail'][]
      /**
       * @description Context about the error condition
       * @example {
       *   "invalidPropertyName": [
       *     "propertyValue"
       *   ],
       *   "missingScopes": [
       *     "scope1",
       *     "scope2"
       *   ]
       * }
       */
      context?: {
        [key: string]: string[]
      }
      /** @description A map of link names to associated URIs containing documentation about the error or recommended remediation steps */
      links?: {
        [key: string]: string
      }
    }
    BatchInputPublicAssociationMultiPost: {
      inputs: components['schemas']['PublicAssociationMultiPost'][]
    }
    PublicDefaultAssociationMultiPost: {
      from: components['schemas']['PublicObjectId']
      to: components['schemas']['PublicObjectId']
    }
    BatchResponsePublicDefaultAssociation: {
      /** @enum {string} */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
      results: components['schemas']['PublicDefaultAssociation'][]
      /** Format: int32 */
      numErrors?: number
      errors?: components['schemas']['StandardError'][]
      /** Format: date-time */
      requestedAt?: string
      /** Format: date-time */
      startedAt: string
      /** Format: date-time */
      completedAt: string
      links?: {
        [key: string]: string
      }
    }
    BatchResponsePublicAssociationMultiWithLabel: {
      /** @enum {string} */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
      results: components['schemas']['PublicAssociationMultiWithLabel'][]
      /** Format: date-time */
      requestedAt?: string
      /** Format: date-time */
      startedAt: string
      /** Format: date-time */
      completedAt: string
      links?: {
        [key: string]: string
      }
    }
    BatchInputPublicFetchAssociationsBatchRequest: {
      inputs: components['schemas']['PublicFetchAssociationsBatchRequest'][]
    }
    AssociationSpec: {
      /** @enum {string} */
      associationCategory:
        | 'HUBSPOT_DEFINED'
        | 'USER_DEFINED'
        | 'INTEGRATOR_DEFINED'
      /** Format: int32 */
      associationTypeId: number
    }
    ErrorCategory: {
      name: string
      /** @enum {string} */
      httpStatus:
        | 'CONTINUE'
        | 'SWITCHING_PROTOCOLS'
        | 'PROCESSING'
        | 'OK'
        | 'CREATED'
        | 'ACCEPTED'
        | 'NON_AUTHORITATIVE_INFORMATION'
        | 'NO_CONTENT'
        | 'RESET_CONTENT'
        | 'PARTIAL_CONTENT'
        | 'MULTI_STATUS'
        | 'ALREADY_REPORTED'
        | 'IM_USED'
        | 'MULTIPLE_CHOICES'
        | 'MOVED_PERMANENTLY'
        | 'FOUND'
        | 'SEE_OTHER'
        | 'NOT_MODIFIED'
        | 'USE_PROXY'
        | 'TEMPORARY_REDIRECT'
        | 'PERMANENT_REDIRECT'
        | 'BAD_REQUEST'
        | 'UNAUTHORIZED'
        | 'PAYMENT_REQUIRED'
        | 'FORBIDDEN'
        | 'NOT_FOUND'
        | 'METHOD_NOT_ALLOWED'
        | 'NOT_ACCEPTABLE'
        | 'PROXY_AUTHENTICATION_REQUIRED'
        | 'REQUEST_TIMEOUT'
        | 'CONFLICT'
        | 'GONE'
        | 'LENGTH_REQUIRED'
        | 'PRECONDITION_FAILED'
        | 'REQUEST_ENTITY_TOO_LARGE'
        | 'REQUEST_URI_TOO_LONG'
        | 'UNSUPPORTED_MEDIA_TYPE'
        | 'REQUESTED_RANGE_NOT_SATISFIABLE'
        | 'EXPECTATION_FAILED'
        | 'IM_A_TEAPOT'
        | 'MISDIRECTED_REQUEST'
        | 'UNPROCESSABLE_ENTITY'
        | 'LOCKED'
        | 'FAILED_DEPENDENCY'
        | 'UPGRADE_REQUIRED'
        | 'PRECONDITION_REQUIRED'
        | 'TOO_MANY_REQUESTS'
        | 'REQUEST_HEADERS_FIELDS_TOO_LARGE'
        | 'INTERNAL_STALE_SERVICE_DISCOVERY'
        | 'UNAVAILABLE_FOR_LEGAL_REASONS'
        | 'MIGRATION_IN_PROGRESS'
        | 'INTERNAL_SERVER_ERROR'
        | 'NOT_IMPLEMENTED'
        | 'BAD_GATEWAY'
        | 'SERVICE_UNAVAILABLE'
        | 'GATEWAY_TIMEOUT'
        | 'HTTP_VERSION_NOT_SUPPORTED'
        | 'VARIANT_ALSO_NEGOTIATES'
        | 'INSUFFICIENT_STORAGE'
        | 'LOOP_DETECTED'
        | 'NOT_EXTENDED'
        | 'NETWORK_AUTHENTICATION_REQUIRED'
    }
    CollectionResponseAssociationSpecWithLabelNoPaging: {
      results: components['schemas']['AssociationSpecWithLabel'][]
    }
    BatchResponseLabelsBetweenObjectPairWithErrors: {
      /** @enum {string} */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
      results: components['schemas']['LabelsBetweenObjectPair'][]
      /** Format: int32 */
      numErrors?: number
      errors?: components['schemas']['StandardError'][]
      /** Format: date-time */
      requestedAt?: string
      /** Format: date-time */
      startedAt: string
      /** Format: date-time */
      completedAt: string
      links?: {
        [key: string]: string
      }
    }
    PreviousPage: {
      before: string
      link?: string
    }
    NextPage: {
      after: string
      link?: string
    }
    PublicFetchAssociationsBatchRequest: {
      id: string
      after?: string
    }
  }
  responses: {
    /** @description An error occurred. */
    Error: {
      content: {
        '*/*': components['schemas']['Error']
      }
    }
  }
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type $defs = Record<string, never>

export type external = Record<string, never>

export interface operations {
  /**
   * Delete
   * @description Batch delete associations for objects
   */
  'post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/archive': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputPublicAssociationMultiArchive']
      }
    }
    responses: {
      /** @description No content */
      204: {
        content: {}
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Create Default Associations
   * @description Create the default (most generic) association type between two object types
   */
  'post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/associate/default': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputPublicDefaultAssociationMultiPost']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['BatchResponsePublicDefaultAssociation']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Create
   * @description Batch create associations for objects
   */
  'post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/create': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputPublicAssociationMultiPost']
      }
    }
    responses: {
      /** @description successful operation */
      201: {
        content: {
          'application/json': components['schemas']['BatchResponseLabelsBetweenObjectPair']
        }
      }
      /** @description multiple statuses */
      207: {
        content: {
          'application/json': components['schemas']['BatchResponseLabelsBetweenObjectPairWithErrors']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Delete Specific Labels
   * @description Batch delete specific association labels for objects. Deleting an unlabeled association will also delete all labeled associations between those two objects
   */
  'post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/labels/archive': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputPublicAssociationMultiPost']
      }
    }
    responses: {
      /** @description No content */
      204: {
        content: {}
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Read
   * @description Batch read associations for objects to specific object type. The 'after' field in a returned paging object  can be added alongside the 'id' to retrieve the next page of associations from that objectId. The 'link' field is deprecated and should be ignored.
   */
  'post-/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/read': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputPublicFetchAssociationsBatchRequest']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['BatchResponsePublicAssociationMultiWithLabel']
        }
      }
      /** @description multiple statuses */
      207: {
        content: {
          'application/json': components['schemas']['BatchResponsePublicAssociationMultiWithLabelWithErrors']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Read
   * @description Returns all association types between two object types
   */
  'get-/crm/v4/associations/{fromObjectType}/{toObjectType}/labels': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['CollectionResponseAssociationSpecWithLabelNoPaging']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Update
   * @description Update a user defined association definition
   */
  'put-/crm/v4/associations/{fromObjectType}/{toObjectType}/labels': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['PublicAssociationDefinitionUpdateRequest']
      }
    }
    responses: {
      /** @description No content */
      204: {
        content: {}
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Create
   * @description Create a user defined association definition
   */
  'post-/crm/v4/associations/{fromObjectType}/{toObjectType}/labels': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['PublicAssociationDefinitionCreateRequest']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['CollectionResponseAssociationSpecWithLabelNoPaging']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Delete
   * @description Deletes an association definition
   */
  'delete-/crm/v4/associations/{fromObjectType}/{toObjectType}/labels/{associationTypeId}': {
    parameters: {
      path: {
        fromObjectType: string
        toObjectType: string
        associationTypeId: number
      }
    }
    responses: {
      /** @description No content */
      204: {
        content: {}
      }
      default: components['responses']['Error']
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
