/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/crm/v3/extensions/calling/{appId}/settings': {
    /**
     * Get calling settings
     * @description Returns the calling extension settings configured for your app.
     */
    get: operations['get-/crm/v3/extensions/calling/{appId}/settings_getById']
    /**
     * Configure a calling extension
     * @description Used to set the menu label, target iframe URL, and dimensions for your calling extension.
     */
    post: operations['post-/crm/v3/extensions/calling/{appId}/settings_create']
    /**
     * Delete calling settings
     * @description Deletes this calling extension. This will remove your service as an option for all connected accounts.
     */
    delete: operations['delete-/crm/v3/extensions/calling/{appId}/settings_archive']
    /**
     * Update settings
     * @description Updates existing calling extension settings.
     */
    patch: operations['patch-/crm/v3/extensions/calling/{appId}/settings_update']
  }
  '/crm/v3/extensions/calling/{appId}/settings/recording': {
    get: operations['get-/crm/v3/extensions/calling/{appId}/settings/recording_getUrlFormat']
    post: operations['post-/crm/v3/extensions/calling/{appId}/settings/recording_registerUrlFormat']
    patch: operations['patch-/crm/v3/extensions/calling/{appId}/settings/recording_updateUrlFormat']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    ErrorDetail: {
      /** @description A specific category that contains more specific detail about the error */
      subCategory?: string
      /** @description The status code associated with the error detail */
      code?: string
      /** @description The name of the field or parameter in which the error was found. */
      in?: string
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
      /** @description A human readable message describing the error along with remediation steps where appropriate */
      message: string
    }
    /** @description Current settings state */
    SettingsResponse: {
      /**
       * Format: date-time
       * @description When this calling extension was created.
       */
      createdAt: string
      /** @description When true, you are indicating that your service is compatible with engagement v2 service and can be used with custom objects. */
      supportsCustomObjects: boolean
      /** @description When true, your service will appear as an option under the *Call* action in contact records of connected accounts. */
      isReady: boolean
      /** @description The name of your calling service to display to users. */
      name: string
      /**
       * Format: int32
       * @description The target width of the iframe that will contain your phone/calling UI.
       */
      width: number
      /** @description The URL to your phone/calling UI, built with the [Calling SDK](#). */
      url: string
      /**
       * Format: int32
       * @description The target height of the iframe that will contain your phone/calling UI.
       */
      height: number
      /**
       * Format: date-time
       * @description The last time the settings for this calling extension were modified.
       */
      updatedAt: string
    }
    RecordingSettingsResponse: {
      urlToRetrieveAuthedRecording: string
    }
    RecordingSettingsPatchRequest: {
      urlToRetrieveAuthedRecording?: string
    }
    RecordingSettingsRequest: {
      urlToRetrieveAuthedRecording: string
    }
    /**
     * @description Settings create request
     * @example {
     *   "name": "HubPhone",
     *   "url": "https://www.example.com/hubspot/iframe",
     *   "width": 200,
     *   "height": 350,
     *   "isReady": true,
     *   "supportsCustomObjects": true
     * }
     */
    SettingsRequest: {
      /**
       * @description When true, you are indicating that your service is compatible with engagement v2 service and can be used with custom objects.
       * @example true
       */
      supportsCustomObjects?: boolean
      /**
       * @description When true, your service will appear as an option under the *Call* action in contact records of connected accounts.
       * @example true
       */
      isReady?: boolean
      /**
       * @description The name of your calling service to display to users.
       * @example HubPhone
       */
      name: string
      /**
       * Format: int32
       * @description The target width of the iframe that will contain your phone/calling UI.
       * @example 200
       */
      width?: number
      /**
       * @description The URL to your phone/calling UI, built with the [Calling SDK](#).
       * @example https://www.example.com/hubspot/iframe
       */
      url: string
      /**
       * Format: int32
       * @description The target height of the iframe that will contain your phone/calling UI.
       * @example 350
       */
      height?: number
    }
    /** @description Settings update request */
    SettingsPatchRequest: {
      /** @description When true, you are indicating that your service is compatible with engagement v2 service and can be used with custom objects. */
      supportsCustomObjects?: boolean
      /** @description When true, your service will appear as an option under the *Call* action in contact records of connected accounts. */
      isReady?: boolean
      /** @description The name of your calling service to display to users. */
      name?: string
      /**
       * Format: int32
       * @description The target width of the iframe that will contain your phone/calling UI.
       */
      width?: number
      /** @description The URL to your phone/calling UI, built with the [Calling SDK](#). */
      url?: string
      /**
       * Format: int32
       * @description The target height of the iframe that will contain your phone/calling UI.
       */
      height?: number
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
      /** @description A specific category that contains more specific detail about the error */
      subCategory?: string
      /**
       * @description Context about the error condition
       * @example {
       *   "missingScopes": [
       *     "scope1",
       *     "scope2"
       *   ],
       *   "invalidPropertyName": [
       *     "propertyValue"
       *   ]
       * }
       */
      context?: {
        [key: string]: string[]
      }
      /**
       * Format: uuid
       * @description A unique identifier for the request. Include this value with any error reports or support tickets
       * @example aeb5f871-7f07-4993-9211-075dc63e7cbf
       */
      correlationId: string
      /**
       * @description A map of link names to associated URIs containing documentation about the error or recommended remediation steps
       * @example {
       *   "knowledge-base": "https://www.hubspot.com/products/service/knowledge-base"
       * }
       */
      links?: {
        [key: string]: string
      }
      /**
       * @description A human readable message describing the error along with remediation steps where appropriate
       * @example Invalid input (details will vary based on the error)
       */
      message: string
      /**
       * @description The error category
       * @example VALIDATION_ERROR
       */
      category: string
      /** @description further information about the error */
      errors?: components['schemas']['ErrorDetail'][]
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
   * Get calling settings
   * @description Returns the calling extension settings configured for your app.
   */
  'get-/crm/v3/extensions/calling/{appId}/settings_getById': {
    parameters: {
      path: {
        /** @description The ID of the target app. */
        appId: number
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['SettingsResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Configure a calling extension
   * @description Used to set the menu label, target iframe URL, and dimensions for your calling extension.
   */
  'post-/crm/v3/extensions/calling/{appId}/settings_create': {
    parameters: {
      path: {
        /** @description The ID of the target app. */
        appId: number
      }
    }
    /** @description Settings state to create with. */
    requestBody: {
      content: {
        'application/json': components['schemas']['SettingsRequest']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['SettingsResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Delete calling settings
   * @description Deletes this calling extension. This will remove your service as an option for all connected accounts.
   */
  'delete-/crm/v3/extensions/calling/{appId}/settings_archive': {
    parameters: {
      path: {
        /** @description The ID of the target app. */
        appId: number
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
   * Update settings
   * @description Updates existing calling extension settings.
   */
  'patch-/crm/v3/extensions/calling/{appId}/settings_update': {
    parameters: {
      path: {
        /** @description The ID of the target app. */
        appId: number
      }
    }
    /** @description Updated details for the settings. */
    requestBody: {
      content: {
        'application/json': components['schemas']['SettingsPatchRequest']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['SettingsResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  'get-/crm/v3/extensions/calling/{appId}/settings/recording_getUrlFormat': {
    parameters: {
      path: {
        appId: number
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['RecordingSettingsResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  'post-/crm/v3/extensions/calling/{appId}/settings/recording_registerUrlFormat': {
    parameters: {
      path: {
        appId: number
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['RecordingSettingsRequest']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['RecordingSettingsResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  'patch-/crm/v3/extensions/calling/{appId}/settings/recording_updateUrlFormat': {
    parameters: {
      path: {
        appId: number
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['RecordingSettingsPatchRequest']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['RecordingSettingsResponse']
        }
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
