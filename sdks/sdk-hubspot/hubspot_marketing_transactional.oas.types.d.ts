/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/marketing/v3/transactional/single-email/send': {
    /**
     * Send a single transactional email asynchronously.
     * @description Asynchronously send a transactional email. Returns the status of the email send with a statusId that can be used to continuously query for the status using the Email Send Status API.
     */
    post: operations['post-/marketing/v3/transactional/single-email/send_sendEmail']
  }
  '/marketing/v3/transactional/smtp-tokens': {
    /**
     * Query SMTP API tokens by campaign name or an emailCampaignId.
     * @description Query multiple SMTP API tokens by campaign name or a single token by emailCampaignId.
     */
    get: operations['get-/marketing/v3/transactional/smtp-tokens_getTokensPage']
    /**
     * Create a SMTP API token.
     * @description Create a SMTP API token.
     */
    post: operations['post-/marketing/v3/transactional/smtp-tokens_createToken']
  }
  '/marketing/v3/transactional/smtp-tokens/{tokenId}/password-reset': {
    /**
     * Reset the password of an existing token.
     * @description Allows the creation of a replacement password for a given token. Once the password is successfully reset, the old password for the token will be invalid.
     */
    post: operations['post-/marketing/v3/transactional/smtp-tokens/{tokenId}/password-reset_resetPassword']
  }
  '/marketing/v3/transactional/smtp-tokens/{tokenId}': {
    /**
     * Query a single token by ID.
     * @description Query a single token by ID.
     */
    get: operations['get-/marketing/v3/transactional/smtp-tokens/{tokenId}_getTokenById']
    /**
     * Delete a single token by ID.
     * @description Delete a single token by ID.
     */
    delete: operations['delete-/marketing/v3/transactional/smtp-tokens/{tokenId}_archiveToken']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    CollectionResponseSmtpApiTokenViewForwardPaging: {
      paging?: components['schemas']['ForwardPaging']
      results: components['schemas']['SmtpApiTokenView'][]
    }
    /** @description Describes the status of an email send request. */
    EmailSendStatusView: {
      eventId?: components['schemas']['EventIdView']
      /**
       * Format: date-time
       * @description Time when the send was completed.
       */
      completedAt?: string
      /** @description Identifier used to query the status of the send. */
      statusId: string
      /**
       * @description Result of the send.
       * @enum {string}
       */
      sendResult?:
        | 'SENT'
        | 'IDEMPOTENT_IGNORE'
        | 'QUEUED'
        | 'IDEMPOTENT_FAIL'
        | 'THROTTLED'
        | 'EMAIL_DISABLED'
        | 'PORTAL_SUSPENDED'
        | 'INVALID_TO_ADDRESS'
        | 'BLOCKED_DOMAIN'
        | 'PREVIOUSLY_BOUNCED'
        | 'EMAIL_UNCONFIRMED'
        | 'PREVIOUS_SPAM'
        | 'PREVIOUSLY_UNSUBSCRIBED_MESSAGE'
        | 'PREVIOUSLY_UNSUBSCRIBED_PORTAL'
        | 'INVALID_FROM_ADDRESS'
        | 'CAMPAIGN_CANCELLED'
        | 'VALIDATION_FAILED'
        | 'MTA_IGNORE'
        | 'BLOCKED_ADDRESS'
        | 'PORTAL_OVER_LIMIT'
        | 'PORTAL_EXPIRED'
        | 'PORTAL_MISSING_MARKETING_SCOPE'
        | 'MISSING_TEMPLATE_PROPERTIES'
        | 'MISSING_REQUIRED_PARAMETER'
        | 'PORTAL_AUTHENTICATION_FAILURE'
        | 'MISSING_CONTENT'
        | 'CORRUPT_INPUT'
        | 'TEMPLATE_RENDER_EXCEPTION'
        | 'GRAYMAIL_SUPPRESSED'
        | 'UNCONFIGURED_SENDING_DOMAIN'
        | 'UNDELIVERABLE'
        | 'CANCELLED_ABUSE'
        | 'QUARANTINED_ADDRESS'
        | 'ADDRESS_ONLY_ACCEPTED_ON_PROD'
        | 'PORTAL_NOT_AUTHORIZED_FOR_APPLICATION'
        | 'ADDRESS_LIST_BOMBED'
        | 'ADDRESS_OPTED_OUT'
        | 'RECIPIENT_FATIGUE_SUPPRESSED'
        | 'TOO_MANY_RECIPIENTS'
        | 'PREVIOUSLY_UNSUBSCRIBED_BRAND'
        | 'NON_MARKETABLE_CONTACT'
        | 'PREVIOUSLY_UNSUBSCRIBED_BUSINESS_UNIT'
        | 'GDPR_DOI_ENABLED'
      /**
       * Format: date-time
       * @description Time when the send was requested.
       */
      requestedAt?: string
      /**
       * Format: date-time
       * @description Time when the send began processing.
       */
      startedAt?: string
      /**
       * @description Status of the send request.
       * @enum {string}
       */
      status: 'PENDING' | 'PROCESSING' | 'CANCELED' | 'COMPLETE'
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
    /** @description A request object to create a SMTP API token */
    SmtpApiTokenRequestEgg: {
      /** @description Indicates whether a contact should be created for email recipients. */
      createContact: boolean
      /** @description A name for the campaign tied to the SMTP API token. */
      campaignName: string
    }
    ForwardPaging: {
      next?: components['schemas']['NextPage']
    }
    /** @description A request to send a single transactional email asynchronously. */
    PublicSingleSendRequestEgg: {
      /**
       * @description The customProperties field is a map of property values. Each property value contains a name and value property. Each property will be visible in the template under {{ custom.NAME }}.
       * Note: Custom properties do not currently support arrays. To provide a listing in an email, one workaround is to build an HTML list (either with tables or ul) and specify it as a custom property.
       */
      customProperties?: {
        [key: string]: Record<string, never>
      }
      /**
       * Format: int32
       * @description The content ID for the transactional email, which can be found in email tool UI.
       */
      emailId: number
      message: components['schemas']['PublicSingleSendEmail']
      /** @description The contactProperties field is a map of contact property values. Each contact property value contains a name and value property. Each property will get set on the contact record and will be visible in the template under {{ contact.NAME }}. Use these properties when you want to set a contact property while you’re sending the email. For example, when sending a reciept you may want to set a last_paid_date property, as the sending of the receipt will have information about the last payment. */
      contactProperties?: {
        [key: string]: string
      }
    }
    /** @description The ID of a send event. */
    EventIdView: {
      /**
       * Format: date-time
       * @description Time of event creation.
       */
      created: string
      /**
       * Format: uuid
       * @description Identifier of event.
       */
      id: string
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
    /** @description A SMTP API token provides both an ID and password that can be used to send email through the HubSpot SMTP API. */
    SmtpApiTokenView: {
      /**
       * Format: date-time
       * @description Timestamp generated when a token is created.
       */
      createdAt: string
      /** @description Password used to log into the HubSpot SMTP server. */
      password?: string
      /** @description Email address of the user that sent the token creation request. */
      createdBy: string
      /** @description Indicates whether a contact should be created for email recipients. */
      createContact: boolean
      /** @description User name to log into the HubSpot SMTP server. */
      id: string
      /** @description Identifier assigned to the campaign provided in the token creation request. */
      emailCampaignId: string
      /** @description A name for the campaign tied to the token. */
      campaignName: string
    }
    NextPage: {
      link?: string
      after: string
    }
    /** @description A JSON object containing anything you want to override. */
    PublicSingleSendEmail: {
      /** @description List of email addresses to send as Cc. */
      cc?: string[]
      /** @description ID for a particular send. No more than one email will be sent per sendId. */
      sendId?: string
      /** @description List of email addresses to send as Bcc. */
      bcc?: string[]
      /** @description List of Reply-To header values for the email. */
      replyTo?: string[]
      /** @description The From header for the email. */
      from?: string
      /** @description The recipient of the email. */
      to: string
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
   * Send a single transactional email asynchronously.
   * @description Asynchronously send a transactional email. Returns the status of the email send with a statusId that can be used to continuously query for the status using the Email Send Status API.
   */
  'post-/marketing/v3/transactional/single-email/send_sendEmail': {
    /** @description A request object describing the email to send. */
    requestBody: {
      content: {
        'application/json': components['schemas']['PublicSingleSendRequestEgg']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['EmailSendStatusView']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Query SMTP API tokens by campaign name or an emailCampaignId.
   * @description Query multiple SMTP API tokens by campaign name or a single token by emailCampaignId.
   */
  'get-/marketing/v3/transactional/smtp-tokens_getTokensPage': {
    parameters: {
      query?: {
        /** @description A name for the campaign tied to the SMTP API token. */
        campaignName?: string
        /** @description Identifier assigned to the campaign provided during the token creation. */
        emailCampaignId?: string
        /** @description Starting point to get the next set of results. */
        after?: string
        /** @description Maximum number of tokens to return. */
        limit?: number
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['CollectionResponseSmtpApiTokenViewForwardPaging']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Create a SMTP API token.
   * @description Create a SMTP API token.
   */
  'post-/marketing/v3/transactional/smtp-tokens_createToken': {
    /** @description A request object that includes the campaign name tied to the token and whether contacts should be created for email recipients. */
    requestBody: {
      content: {
        'application/json': components['schemas']['SmtpApiTokenRequestEgg']
      }
    }
    responses: {
      /** @description successful operation */
      201: {
        content: {
          'application/json': components['schemas']['SmtpApiTokenView']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Reset the password of an existing token.
   * @description Allows the creation of a replacement password for a given token. Once the password is successfully reset, the old password for the token will be invalid.
   */
  'post-/marketing/v3/transactional/smtp-tokens/{tokenId}/password-reset_resetPassword': {
    parameters: {
      path: {
        /** @description Identifier generated when a token is created. */
        tokenId: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['SmtpApiTokenView']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Query a single token by ID.
   * @description Query a single token by ID.
   */
  'get-/marketing/v3/transactional/smtp-tokens/{tokenId}_getTokenById': {
    parameters: {
      path: {
        /** @description Identifier generated when a token is created. */
        tokenId: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['SmtpApiTokenView']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Delete a single token by ID.
   * @description Delete a single token by ID.
   */
  'delete-/marketing/v3/transactional/smtp-tokens/{tokenId}_archiveToken': {
    parameters: {
      path: {
        /** @description Identifier generated when a token is created. */
        tokenId: string
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
