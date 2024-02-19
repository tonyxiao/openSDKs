/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/marketing/v3/marketing-events/events/upsert': {
    /**
     * Create or update multiple marketing events
     * @description Upset multiple Marketing Event. If there is an existing Marketing event with the specified id, it will be updated; otherwise a new event will be created.
     */
    post: operations['post-/marketing/v3/marketing-events/events/upsert_doUpsert']
  }
  '/marketing/v3/marketing-events/attendance/{externalEventId}/{subscriberState}/create': {
    /**
     * Record
     * @description Record a subscription state between multiple HubSpot contacts and a marketing event, using HubSpot contact ids.
     */
    post: operations['post-/marketing/v3/marketing-events/attendance/{externalEventId}/{subscriberState}/create_create']
  }
  '/marketing/v3/marketing-events/attendance/{externalEventId}/{subscriberState}/email-create': {
    /**
     * Record
     * @description Record a subscription state between multiple HubSpot contacts and a marketing event, using contact email addresses. If contact is not present it will be automatically created.
     */
    post: operations['post-/marketing/v3/marketing-events/attendance/{externalEventId}/{subscriberState}/email-create_createByEmail']
  }
  '/marketing/v3/marketing-events/events/{externalEventId}/{subscriberState}/email-upsert': {
    /**
     * Record
     * @description Record a subscription state between multiple HubSpot contacts and a marketing event, using contact email addresses. Note that the contact must already exist in HubSpot; a contact will not be created.
     */
    post: operations['post-/marketing/v3/marketing-events/events/{externalEventId}/{subscriberState}/email-upsert_doEmailUpsertById']
  }
  '/marketing/v3/marketing-events/events/{externalEventId}/complete': {
    post: operations['post-/marketing/v3/marketing-events/events/{externalEventId}/complete_complete']
  }
  '/marketing/v3/marketing-events/events/{externalEventId}/{subscriberState}/upsert': {
    /**
     * Record
     * @description Record a subscription state between multiple HubSpot contacts and a marketing event, using HubSpot contact ids. Note that the contact must already exist in HubSpot; a contact will not be create.
     */
    post: operations['post-/marketing/v3/marketing-events/events/{externalEventId}/{subscriberState}/upsert_doUpsertById']
  }
  '/marketing/v3/marketing-events/events': {
    /**
     * Create a marketing event
     * @description Creates a new marketing event in HubSpot
     */
    post: operations['post-/marketing/v3/marketing-events/events_create']
  }
  '/marketing/v3/marketing-events/events/delete': {
    /**
     * Delete multiple marketing events
     * @description Bulk delete a number of marketing events in HubSpot
     */
    post: operations['post-/marketing/v3/marketing-events/events/delete_archiveBatch']
  }
  '/marketing/v3/marketing-events/events/{externalEventId}/cancel': {
    /**
     * Mark a marketing event as cancelled
     * @description Mark a marketing event as cancelled.
     */
    post: operations['post-/marketing/v3/marketing-events/events/{externalEventId}/cancel_doCancel']
  }
  '/marketing/v3/marketing-events/{appId}/settings': {
    /**
     * Retrieve the application settings
     * @description Retrieve the current settings for the application.
     */
    get: operations['get-/marketing/v3/marketing-events/{appId}/settings_getAll']
    /**
     * Update the application settings
     * @description Create or update the current settings for the application.
     */
    post: operations['post-/marketing/v3/marketing-events/{appId}/settings_create']
  }
  '/marketing/v3/marketing-events/events/search': {
    /**
     * Search for marketing events
     * @description Search for marketing events that have an event id that starts with the query string
     */
    get: operations['get-/marketing/v3/marketing-events/events/search_doSearch']
  }
  '/marketing/v3/marketing-events/events/{externalEventId}': {
    /**
     * Get a marketing event
     * @description Returns the details of the Marketing Event with the specified id, if one exists.
     */
    get: operations['get-/marketing/v3/marketing-events/events/{externalEventId}_getById']
    /**
     * Create or update a marketing event
     * @description Upsets a Marketing Event. If there is an existing Marketing event with the specified id, it will be updated; otherwise a new event will be created.
     */
    put: operations['put-/marketing/v3/marketing-events/events/{externalEventId}_replace']
    /**
     * Delete a marketing event
     * @description Deletes an existing Marketing Event with the specified id, if one exists.
     */
    delete: operations['delete-/marketing/v3/marketing-events/events/{externalEventId}_archive']
    /**
     * Update a marketing event
     * @description Updates an existing Marketing Event with the specified id, if one exists.
     */
    patch: operations['patch-/marketing/v3/marketing-events/events/{externalEventId}_update']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    CollectionResponseMarketingEventExternalUniqueIdentifierNoPaging: {
      results: components['schemas']['MarketingEventExternalUniqueIdentifier'][]
    }
    StandardError: {
      subCategory?: Record<string, never>
      context: {
        [key: string]: string[]
      }
      links: {
        [key: string]: string
      }
      id?: string
      category: string
      message: string
      errors: components['schemas']['ErrorDetail'][]
      status: string
    }
    MarketingEventCreateRequestParams: {
      /**
       * Format: date-time
       * @description The start date and time of the marketing event.
       */
      startDateTime?: string
      /**
       * @description A list of PropertyValues. These can be whatever kind of property names and values you want. However, they must already exist on the HubSpot account's definition of the MarketingEvent Object. If they don't they will be filtered out and not set.
       * In order to do this you'll need to create a new PropertyGroup on the HubSpot account's MarketingEvent object for your specific app and create the Custom Property you want to track on that HubSpot account. Do not create any new default properties on the MarketingEvent object as that will apply to all HubSpot accounts.
       */
      customProperties?: components['schemas']['PropertyValue'][]
      /** @description The accountId that is associated with this marketing event in the external event application. */
      externalAccountId: string
      /** @description Indicates if the marketing event has been cancelled.  Defaults to `false` */
      eventCancelled?: boolean
      /** @description The name of the organizer of the marketing event. */
      eventOrganizer: string
      /** @description A URL in the external event application where the marketing event can be managed. */
      eventUrl?: string
      /** @description The id of the marketing event in the external event application. */
      externalEventId: string
      /** @description The description of the marketing event. */
      eventDescription?: string
      /** @description The name of the marketing event. */
      eventName: string
      /** @description Describes what type of event this is.  For example: `WEBINAR`, `CONFERENCE`, `WORKSHOP` */
      eventType?: string
      /**
       * Format: date-time
       * @description The end date and time of the marketing event.
       */
      endDateTime?: string
    }
    MarketingEventCompleteRequestParams: {
      /** Format: date-time */
      startDateTime: string
      /** Format: date-time */
      endDateTime: string
    }
    SubscriberEmailResponse: {
      /** Format: int32 */
      vid: number
      email: string
    }
    EventDetailSettings: {
      /**
       * Format: int32
       * @description The id of the application the settings are for
       */
      appId: number
      /** @description The url that will be used to fetch marketing event details by id */
      eventDetailsUrl: string
    }
    MarketingEventPublicReadResponse: {
      /**
       * Format: int32
       * @description The number of HubSpot contacts that registered for this marketing event.
       */
      registrants: number
      /** @description The name of the organizer of the marketing event. */
      eventOrganizer: string
      /** @description A URL in the external event application where the marketing event can be managed. */
      eventUrl?: string
      /**
       * Format: int32
       * @description The number of HubSpot contacts that attended this marketing event.
       */
      attendees: number
      /** @description The type of the marketing event. */
      eventType?: string
      /**
       * Format: date-time
       * @description The end date and time of the marketing event.
       */
      endDateTime?: string
      /**
       * Format: int32
       * @description The number of HubSpot contacts that registered for this marketing event, but did not attend. This field only had a value when the event is over.
       */
      noShows: number
      /**
       * Format: int32
       * @description The number of HubSpot contacts that registered for this marketing event, but later cancelled their registration.
       */
      cancellations: number
      /** Format: date-time */
      createdAt: string
      /**
       * Format: date-time
       * @description The start date and time of the marketing event.
       */
      startDateTime?: string
      /**
       * @description A list of PropertyValues. These can be whatever kind of property names and values you want. However, they must already exist on the HubSpot account's definition of the MarketingEvent Object. If they don't they will be filtered out and not set.
       * In order to do this you'll need to create a new PropertyGroup on the HubSpot account's MarketingEvent object for your specific app and create the Custom Property you want to track on that HubSpot account. Do not create any new default properties on the MarketingEvent object as that will apply to all HubSpot accounts.
       */
      customProperties?: components['schemas']['PropertyValue'][]
      /** @description Indicates if the marketing event has been cancelled. */
      eventCancelled?: boolean
      /** @description The id of the marketing event in the external event application. */
      externalEventId: string
      /** @description The description of the marketing event. */
      eventDescription?: string
      /** @description The name of the marketing event. */
      eventName: string
      id: string
      /** Format: date-time */
      updatedAt: string
    }
    MarketingEventSubscriber: {
      /** Format: int32 */
      vid?: number
      properties?: {
        [key: string]: string
      }
      /**
       * Format: int64
       * @description The date and time at which the contact subscribed to the event.
       */
      interactionDateTime: number
    }
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
    MarketingEventEmailSubscriber: {
      contactProperties?: {
        [key: string]: string
      }
      properties?: {
        [key: string]: string
      }
      /** @description The email address of the contact in HubSpot to associate with the event. */
      email: string
      /**
       * Format: int64
       * @description The date and time at which the contact subscribed to the event.
       */
      interactionDateTime: number
    }
    EventDetailSettingsUrl: {
      /** @description The url that will be used to fetch marketing event details by id. Must contain a `%s` character sequence that will be substituted with the event id. For example: `https://my.event.app/events/%s` */
      eventDetailsUrl: string
    }
    /** @description List of marketing event details to create or update */
    BatchInputMarketingEventEmailSubscriber: {
      /** @description List of marketing event details to create or update */
      inputs: components['schemas']['MarketingEventEmailSubscriber'][]
    }
    MarketingEventExternalUniqueIdentifier: {
      /** @description The accountId that is associated with this marketing event in the external event application. */
      externalAccountId: string
      /** @description The id of the marketing event in the external event application. */
      externalEventId: string
      /**
       * Format: int32
       * @description The id of the application that created the marketing event in HubSpot.
       */
      appId: number
    }
    SubscriberVidResponse: {
      /** Format: int32 */
      vid: number
    }
    BatchInputMarketingEventCreateRequestParams: {
      inputs: components['schemas']['MarketingEventCreateRequestParams'][]
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
    PropertyValue: {
      sourceId: string
      selectedByUser: boolean
      sourceLabel: string
      /** @enum {string} */
      source:
        | 'IMPORT'
        | 'API'
        | 'FORM'
        | 'ANALYTICS'
        | 'MIGRATION'
        | 'SALESFORCE'
        | 'INTEGRATION'
        | 'CONTACTS_WEB'
        | 'WAL_INCREMENTAL'
        | 'TASK'
        | 'EMAIL'
        | 'WORKFLOWS'
        | 'CALCULATED'
        | 'SOCIAL'
        | 'BATCH_UPDATE'
        | 'SIGNALS'
        | 'BIDEN'
        | 'DEFAULT'
        | 'COMPANIES'
        | 'DEALS'
        | 'ASSISTS'
        | 'PRESENTATIONS'
        | 'TALLY'
        | 'SIDEKICK'
        | 'CRM_UI'
        | 'MERGE_CONTACTS'
        | 'PORTAL_USER_ASSOCIATOR'
        | 'INTEGRATIONS_PLATFORM'
        | 'BCC_TO_CRM'
        | 'FORWARD_TO_CRM'
        | 'ENGAGEMENTS'
        | 'SALES'
        | 'HEISENBERG'
        | 'LEADIN'
        | 'GMAIL_INTEGRATION'
        | 'ACADEMY'
        | 'SALES_MESSAGES'
        | 'AVATARS_SERVICE'
        | 'MERGE_COMPANIES'
        | 'SEQUENCES'
        | 'COMPANY_FAMILIES'
        | 'MOBILE_IOS'
        | 'MOBILE_ANDROID'
        | 'CONTACTS'
        | 'ASSOCIATIONS'
        | 'EXTENSION'
        | 'SUCCESS'
        | 'BOT'
        | 'INTEGRATIONS_SYNC'
        | 'AUTOMATION_PLATFORM'
        | 'CONVERSATIONS'
        | 'EMAIL_INTEGRATION'
        | 'CONTENT_MEMBERSHIP'
        | 'QUOTES'
        | 'BET_ASSIGNMENT'
        | 'QUOTAS'
        | 'BET_CRM_CONNECTOR'
        | 'MEETINGS'
        | 'MERGE_OBJECTS'
        | 'RECYCLING_BIN'
        | 'ADS'
        | 'AI_GROUP'
        | 'COMMUNICATOR'
        | 'SETTINGS'
        | 'PROPERTY_SETTINGS'
        | 'PIPELINE_SETTINGS'
        | 'COMPANY_INSIGHTS'
        | 'BEHAVIORAL_EVENTS'
        | 'PAYMENTS'
        | 'GOALS'
        | 'PORTAL_OBJECT_SYNC'
        | 'APPROVALS'
        | 'FILE_MANAGER'
        | 'MARKETPLACE'
        | 'INTERNAL_PROCESSING'
        | 'FORECASTING'
        | 'SLACK_INTEGRATION'
        | 'CRM_UI_BULK_ACTION'
        | 'WORKFLOW_CONTACT_DELETE_ACTION'
      /** Format: int32 */
      updatedByUserId?: number
      /** Format: int64 */
      persistenceTimestamp?: number
      /** @description Source metadata encoded as a base64 string. For example: `ZXhhbXBsZSBzdHJpbmc=` */
      sourceMetadata: string
      sourceVid: number[]
      requestId: string
      name: string
      useTimestampAsPersistenceTimestamp?: boolean
      value: string
      /** Format: int64 */
      selectedByUserTimestamp: number
      /** Format: int64 */
      timestamp: number
      isLargeValue?: boolean
    }
    BatchInputMarketingEventExternalUniqueIdentifier: {
      inputs: components['schemas']['MarketingEventExternalUniqueIdentifier'][]
    }
    MarketingEventUpdateRequestParams: {
      /**
       * Format: date-time
       * @description The start date and time of the marketing event.
       */
      startDateTime?: string
      /**
       * @description A list of PropertyValues. These can be whatever kind of property names and values you want. However, they must already exist on the HubSpot account's definition of the MarketingEvent Object. If they don't they will be filtered out and not set.
       * In order to do this you'll need to create a new PropertyGroup on the HubSpot account's MarketingEvent object for your specific app and create the Custom Property you want to track on that HubSpot account. Do not create any new default properties on the MarketingEvent object as that will apply to all HubSpot accounts.
       */
      customProperties?: components['schemas']['PropertyValue'][]
      /** @description Indicates if the marketing event has been cancelled. Defaults to `false` */
      eventCancelled?: boolean
      /** @description The name of the organizer of the marketing event. */
      eventOrganizer?: string
      /** @description A URL in the external event application where the marketing event can be managed. */
      eventUrl?: string
      /** @description The description of the marketing event. */
      eventDescription?: string
      /** @description The name of the marketing event. */
      eventName?: string
      /** @description Describes what type of event this is.  For example: `WEBINAR`, `CONFERENCE`, `WORKSHOP` */
      eventType?: string
      /**
       * Format: date-time
       * @description The end date and time of the marketing event.
       */
      endDateTime?: string
    }
    BatchResponseSubscriberEmailResponse: {
      /** Format: date-time */
      completedAt: string
      /** Format: int32 */
      numErrors?: number
      /** Format: date-time */
      requestedAt?: string
      /** Format: date-time */
      startedAt: string
      links?: {
        [key: string]: string
      }
      results: components['schemas']['SubscriberEmailResponse'][]
      errors?: components['schemas']['StandardError'][]
      /** @enum {string} */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
    }
    MarketingEventPublicDefaultResponse: {
      /** Format: date-time */
      createdAt: string
      /**
       * Format: date-time
       * @description The start date and time of the marketing event.
       */
      startDateTime?: string
      /**
       * @description A list of PropertyValues. These can be whatever kind of property names and values you want. However, they must already exist on the HubSpot account's definition of the MarketingEvent Object. If they don't they will be filtered out and not set.
       * In order to do this you'll need to create a new PropertyGroup on the HubSpot account's MarketingEvent object for your specific app and create the Custom Property you want to track on that HubSpot account. Do not create any new default properties on the MarketingEvent object as that will apply to all HubSpot accounts.
       */
      customProperties?: components['schemas']['PropertyValue'][]
      /** @description Indicates if the marketing event has been cancelled. */
      eventCancelled?: boolean
      /** @description The name of the organizer of the marketing event. */
      eventOrganizer: string
      /** @description A URL in the external event application where the marketing event can be managed. */
      eventUrl?: string
      /** @description The description of the marketing event. */
      eventDescription?: string
      /** @description The name of the marketing event. */
      eventName: string
      /** @description The type of the marketing event. */
      eventType?: string
      id: string
      /**
       * Format: date-time
       * @description The end date and time of the marketing event.
       */
      endDateTime?: string
      /** Format: date-time */
      updatedAt: string
    }
    BatchResponseSubscriberVidResponse: {
      /** Format: date-time */
      completedAt: string
      /** Format: int32 */
      numErrors?: number
      /** Format: date-time */
      requestedAt?: string
      /** Format: date-time */
      startedAt: string
      links?: {
        [key: string]: string
      }
      results: components['schemas']['SubscriberVidResponse'][]
      errors?: components['schemas']['StandardError'][]
      /** @enum {string} */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
    }
    MarketingEventDefaultResponse: {
      /**
       * Format: date-time
       * @description The start date and time of the marketing event.
       */
      startDateTime?: string
      /**
       * @description A list of PropertyValues. These can be whatever kind of property names and values you want. However, they must already exist on the HubSpot account's definition of the MarketingEvent Object. If they don't they will be filtered out and not set.
       * In order to do this you'll need to create a new PropertyGroup on the HubSpot account's MarketingEvent object for your specific app and create the Custom Property you want to track on that HubSpot account. Do not create any new default properties on the MarketingEvent object as that will apply to all HubSpot accounts.
       */
      customProperties?: components['schemas']['PropertyValue'][]
      /** @description Indicates if the marketing event has been cancelled. */
      eventCancelled?: boolean
      /** @description The name of the organizer of the marketing event. */
      eventOrganizer: string
      /** @description The URL in the external event application where the marketing event can be managed. */
      eventUrl?: string
      /** @description The description of the marketing event. */
      eventDescription?: string
      /** @description The name of the marketing event. */
      eventName: string
      /** @description The type of the marketing event. */
      eventType?: string
      /**
       * Format: date-time
       * @description The end date and time of the marketing event.
       */
      endDateTime?: string
    }
    /** @description List of HubSpot contacts to subscribe to the marketing event */
    BatchInputMarketingEventSubscriber: {
      /** @description List of HubSpot contacts to subscribe to the marketing event */
      inputs: components['schemas']['MarketingEventSubscriber'][]
    }
    BatchResponseMarketingEventPublicDefaultResponse: {
      /** Format: date-time */
      completedAt: string
      /** Format: int32 */
      numErrors?: number
      /** Format: date-time */
      requestedAt?: string
      /** Format: date-time */
      startedAt: string
      links?: {
        [key: string]: string
      }
      results: components['schemas']['MarketingEventPublicDefaultResponse'][]
      errors?: components['schemas']['StandardError'][]
      /** @enum {string} */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
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
   * Create or update multiple marketing events
   * @description Upset multiple Marketing Event. If there is an existing Marketing event with the specified id, it will be updated; otherwise a new event will be created.
   */
  'post-/marketing/v3/marketing-events/events/upsert_doUpsert': {
    /** @description The details of the marketing events to upsert */
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputMarketingEventCreateRequestParams']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['BatchResponseMarketingEventPublicDefaultResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Record
   * @description Record a subscription state between multiple HubSpot contacts and a marketing event, using HubSpot contact ids.
   */
  'post-/marketing/v3/marketing-events/attendance/{externalEventId}/{subscriberState}/create_create': {
    parameters: {
      query?: {
        /** @description The account id associated with the marketing event */
        externalAccountId?: string
      }
      path: {
        /** @description The id of the marketing event */
        externalEventId: string
        /** @description The new subscriber state for the HubSpot contacts and the specified marketing event. For example: 'register', 'attend' or 'cancel'. */
        subscriberState: string
      }
    }
    /** @description The details of the contacts to subscribe to the event. Parameters of join and left time if state is Attended. */
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputMarketingEventSubscriber']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['BatchResponseSubscriberVidResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Record
   * @description Record a subscription state between multiple HubSpot contacts and a marketing event, using contact email addresses. If contact is not present it will be automatically created.
   */
  'post-/marketing/v3/marketing-events/attendance/{externalEventId}/{subscriberState}/email-create_createByEmail': {
    parameters: {
      query?: {
        /** @description The account id associated with the marketing event */
        externalAccountId?: string
      }
      path: {
        /** @description The id of the marketing event */
        externalEventId: string
        /** @description The new subscriber state for the HubSpot contacts and the specified marketing event. For example: 'register', 'attend' or 'cancel'. */
        subscriberState: string
      }
    }
    /** @description The details of the contacts to subscribe to the event. Parameters of join and left time if state is Attended. */
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputMarketingEventEmailSubscriber']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['BatchResponseSubscriberEmailResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Record
   * @description Record a subscription state between multiple HubSpot contacts and a marketing event, using contact email addresses. Note that the contact must already exist in HubSpot; a contact will not be created.
   */
  'post-/marketing/v3/marketing-events/events/{externalEventId}/{subscriberState}/email-upsert_doEmailUpsertById': {
    parameters: {
      query: {
        /** @description The account id associated with the marketing event */
        externalAccountId: string
      }
      path: {
        /** @description The id of the marketing event */
        externalEventId: string
        /** @description The new subscriber state for the HubSpot contacts and the specified marketing event */
        subscriberState: string
      }
    }
    /** @description The details of the contacts to subscribe to the event */
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputMarketingEventEmailSubscriber']
      }
    }
    responses: {
      default: components['responses']['Error']
    }
  }
  'post-/marketing/v3/marketing-events/events/{externalEventId}/complete_complete': {
    parameters: {
      query: {
        externalAccountId: string
      }
      path: {
        externalEventId: string
      }
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['MarketingEventCompleteRequestParams']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['MarketingEventDefaultResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Record
   * @description Record a subscription state between multiple HubSpot contacts and a marketing event, using HubSpot contact ids. Note that the contact must already exist in HubSpot; a contact will not be create.
   */
  'post-/marketing/v3/marketing-events/events/{externalEventId}/{subscriberState}/upsert_doUpsertById': {
    parameters: {
      query: {
        /** @description The account id associated with the marketing event */
        externalAccountId: string
      }
      path: {
        /** @description The id of the marketing event */
        externalEventId: string
        /** @description The new subscriber state for the HubSpot contacts and the specified marketing event */
        subscriberState: string
      }
    }
    /** @description The details of the contacts to subscribe to the event */
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputMarketingEventSubscriber']
      }
    }
    responses: {
      default: components['responses']['Error']
    }
  }
  /**
   * Create a marketing event
   * @description Creates a new marketing event in HubSpot
   */
  'post-/marketing/v3/marketing-events/events_create': {
    /** @description The details of the marketing event to create */
    requestBody: {
      content: {
        'application/json': components['schemas']['MarketingEventCreateRequestParams']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['MarketingEventDefaultResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Delete multiple marketing events
   * @description Bulk delete a number of marketing events in HubSpot
   */
  'post-/marketing/v3/marketing-events/events/delete_archiveBatch': {
    /** @description The details of the marketing events to delete */
    requestBody: {
      content: {
        'application/json': components['schemas']['BatchInputMarketingEventExternalUniqueIdentifier']
      }
    }
    responses: {
      default: components['responses']['Error']
    }
  }
  /**
   * Mark a marketing event as cancelled
   * @description Mark a marketing event as cancelled.
   */
  'post-/marketing/v3/marketing-events/events/{externalEventId}/cancel_doCancel': {
    parameters: {
      query: {
        /** @description The account id associated with the marketing event */
        externalAccountId: string
      }
      path: {
        /** @description The id of the marketing event to mark as cancelled */
        externalEventId: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['MarketingEventDefaultResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Retrieve the application settings
   * @description Retrieve the current settings for the application.
   */
  'get-/marketing/v3/marketing-events/{appId}/settings_getAll': {
    parameters: {
      path: {
        /** @description The id of the application to retrieve the settings for. */
        appId: number
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['EventDetailSettings']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Update the application settings
   * @description Create or update the current settings for the application.
   */
  'post-/marketing/v3/marketing-events/{appId}/settings_create': {
    parameters: {
      path: {
        /** @description The id of the application to update the settings for. */
        appId: number
      }
    }
    /** @description The new application settings */
    requestBody: {
      content: {
        'application/json': components['schemas']['EventDetailSettingsUrl']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['EventDetailSettings']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Search for marketing events
   * @description Search for marketing events that have an event id that starts with the query string
   */
  'get-/marketing/v3/marketing-events/events/search_doSearch': {
    parameters: {
      query: {
        /** @description The id of the marketing event in the external event application */
        q: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['CollectionResponseMarketingEventExternalUniqueIdentifierNoPaging']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Get a marketing event
   * @description Returns the details of the Marketing Event with the specified id, if one exists.
   */
  'get-/marketing/v3/marketing-events/events/{externalEventId}_getById': {
    parameters: {
      query: {
        /** @description The account id associated with the marketing event */
        externalAccountId: string
      }
      path: {
        /** @description The id of the marketing event to return */
        externalEventId: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['MarketingEventPublicReadResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Create or update a marketing event
   * @description Upsets a Marketing Event. If there is an existing Marketing event with the specified id, it will be updated; otherwise a new event will be created.
   */
  'put-/marketing/v3/marketing-events/events/{externalEventId}_replace': {
    parameters: {
      path: {
        /** @description The id of the marketing event to upsert */
        externalEventId: string
      }
    }
    /** @description The details of the marketing event to upsert */
    requestBody: {
      content: {
        'application/json': components['schemas']['MarketingEventCreateRequestParams']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['MarketingEventPublicDefaultResponse']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Delete a marketing event
   * @description Deletes an existing Marketing Event with the specified id, if one exists.
   */
  'delete-/marketing/v3/marketing-events/events/{externalEventId}_archive': {
    parameters: {
      query: {
        /** @description The account id associated with the marketing event */
        externalAccountId: string
      }
      path: {
        /** @description The id of the marketing event to delete */
        externalEventId: string
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
   * Update a marketing event
   * @description Updates an existing Marketing Event with the specified id, if one exists.
   */
  'patch-/marketing/v3/marketing-events/events/{externalEventId}_update': {
    parameters: {
      query: {
        /** @description The account id associated with the marketing event */
        externalAccountId: string
      }
      path: {
        /** @description The id of the marketing event to update */
        externalEventId: string
      }
    }
    /** @description The details of the marketing event to update */
    requestBody: {
      content: {
        'application/json': components['schemas']['MarketingEventUpdateRequestParams']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['MarketingEventPublicDefaultResponse']
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