/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/crm/v3/schemas/{objectType}': {
    /**
     * Get an existing schema
     * @description Returns an existing object schema.
     */
    get: operations['get-/crm/v3/schemas/{objectType}_getById']
    /**
     * Delete a schema
     * @description Deletes a schema. Any existing records of this schema must be deleted **first**. Otherwise this call will fail.
     */
    delete: operations['delete-/crm/v3/schemas/{objectType}_archive']
    /**
     * Update a schema
     * @description Update the details for an existing object schema.
     */
    patch: operations['patch-/crm/v3/schemas/{objectType}_update']
  }
  '/crm/v3/schemas/{objectType}/associations': {
    /**
     * Create an association
     * @description Defines a new association between the primary schema's object type and other object types.
     */
    post: operations['post-/crm/v3/schemas/{objectType}/associations_createAssociation']
  }
  '/crm/v3/schemas/{objectType}/purge': {
    /** @deprecated */
    delete: operations['delete-/crm/v3/schemas/{objectType}/purge_purge']
  }
  '/crm/v3/schemas/{objectType}/associations/{associationIdentifier}': {
    /**
     * Remove an association
     * @description Removes an existing association from a schema.
     */
    delete: operations['delete-/crm/v3/schemas/{objectType}/associations/{associationIdentifier}_archiveAssociation']
  }
  '/crm/v3/schemas': {
    /**
     * Get all schemas
     * @description Returns all object schemas that have been defined for your account.
     */
    get: operations['get-/crm/v3/schemas_getAll']
    /**
     * Create a new schema
     * @description Define a new object schema, along with custom properties and associations. The entire object schema, including its object type ID, properties, and associations will be returned in the response.
     */
    post: operations['post-/crm/v3/schemas_create']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    /**
     * @description Defines attributes to update on an object type.
     * @example {
     *   "primaryDisplayProperty": "my_object_property",
     *   "requiredProperties": [
     *     "my_object_property"
     *   ],
     *   "searchableProperties": [
     *     "my_object_property"
     *   ]
     * }
     */
    ObjectTypeDefinitionPatch: {
      /** @description The names of secondary properties for this object. These will be displayed as secondary on the HubSpot record page for this object type. */
      secondaryDisplayProperties?: string[]
      /**
       * @description The names of properties that should be **required** when creating an object of this type.
       * @example [
       *   "my_object_property"
       * ]
       */
      requiredProperties?: string[]
      /**
       * @description Names of properties that will be indexed for this object type in by HubSpot's product search.
       * @example [
       *   "my_object_property"
       * ]
       */
      searchableProperties?: string[]
      /**
       * @description The name of the primary property for this object. This will be displayed as primary on the HubSpot record page for this object type.
       * @example my_object_property
       */
      primaryDisplayProperty?: string
      description?: string
      restorable?: boolean
      labels?: components['schemas']['ObjectTypeDefinitionLabels']
    }
    CollectionResponseObjectSchemaNoPaging: {
      results: components['schemas']['ObjectSchema'][]
    }
    /**
     * @description Defines an object type.
     * @example {
     *   "id": "123456",
     *   "createdAt": "2020-02-20T18:07:11.390Z",
     *   "updatedAt": "2020-02-21T14:13:28.818002Z",
     *   "labels": {
     *     "singular": "My object",
     *     "plural": "My objects"
     *   },
     *   "requiredProperties": [
     *     "my_object_property"
     *   ],
     *   "searchableProperties": [
     *     "my_object_property"
     *   ],
     *   "primaryDisplayProperty": "my_object_property",
     *   "portalId": 12345678,
     *   "metaType": "PORTAL_SPECIFIC",
     *   "name": "my_object"
     * }
     */
    ObjectTypeDefinition: {
      /** @description The names of secondary properties for this object. These will be displayed as secondary on the HubSpot record page for this object type. */
      secondaryDisplayProperties?: string[]
      objectTypeId?: string
      description?: string
      fullyQualifiedName?: string
      labels: components['schemas']['ObjectTypeDefinitionLabels']
      archived?: boolean
      /**
       * Format: date-time
       * @description When the object type was created.
       */
      createdAt?: string
      /**
       * @description The names of properties that should be **required** when creating an object of this type.
       * @example [
       *   "my_object_property"
       * ]
       */
      requiredProperties: string[]
      /**
       * @description Names of properties that will be indexed for this object type in by HubSpot's product search.
       * @example [
       *   "my_object_property"
       * ]
       */
      searchableProperties?: string[]
      /**
       * Format: int32
       * @description The ID of the account that this object type is specific to.
       * @example 12345678
       */
      portalId?: number
      /**
       * @description The name of the primary property for this object. This will be displayed as primary on the HubSpot record page for this object type.
       * @example my_object_property
       */
      primaryDisplayProperty?: string
      /**
       * @description A unique name for this object. For internal use only.
       * @example my_object
       */
      name: string
      /**
       * @description A unique ID for this object type. Will be defined as {meta-type}-{unique ID}.
       * @example 123456
       */
      id: string
      /**
       * Format: date-time
       * @description When the object type was last updated.
       */
      updatedAt?: string
    }
    /**
     * @description Defines a enumeration property option
     * @example {
     *   "label": "Option A",
     *   "description": "Choice number one",
     *   "value": "A",
     *   "displayOrder": 1,
     *   "hidden": false
     * }
     */
    OptionInput: {
      /**
       * @description Hidden options won't be shown in HubSpot.
       * @example false
       */
      hidden: boolean
      /**
       * Format: int32
       * @description Options are shown in order starting with the lowest positive integer value. Values of -1 will cause the option to be displayed after any positive values.
       * @example 1
       */
      displayOrder: number
      /**
       * @description A description of the option.
       * @example Choice number one
       */
      description?: string
      /**
       * @description A human-readable option label that will be shown in HubSpot.
       * @example Option A
       */
      label: string
      /**
       * @description The internal value of the option, which must be used when setting the property value through the API.
       * @example A
       */
      value: string
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
    /**
     * @description Defines a property to create.
     * @example {
     *   "label": "My object property",
     *   "type": "enumeration",
     *   "fieldType": "select",
     *   "groupName": "my_object_information",
     *   "displayOrder": 2,
     *   "hasUniqueValue": false,
     *   "options": [
     *     {
     *       "label": "Option A",
     *       "description": "Choice number one",
     *       "value": "A",
     *       "displayOrder": 1
     *     },
     *     {
     *       "label": "Option B",
     *       "description": "Choice number two",
     *       "value": "B",
     *       "displayOrder": 2
     *     }
     *   ]
     * }
     */
    ObjectTypePropertyCreate: {
      hidden?: boolean
      /**
       * @description Controls how the property options will be sorted in the HubSpot UI.
       * @enum {string}
       */
      optionSortStrategy?: 'DISPLAY_ORDER' | 'ALPHABETICAL'
      /**
       * Format: int32
       * @description The order that this property should be displayed in the HubSpot UI relative to other properties for this object type. Properties are displayed in order starting with the lowest positive integer value. A value of -1 will cause the property to be displayed **after** any positive values.
       * @example 2
       */
      displayOrder?: number
      /** @description A description of the property that will be shown as help text in HubSpot. */
      description?: string
      /** @description Whether the property will display the currency symbol in the HubSpot UI. */
      showCurrencySymbol?: boolean
      /**
       * @description A human-readable property label that will be shown in HubSpot.
       * @example My object property
       */
      label: string
      /**
       * @description The data type of the property.
       * @example enumeration
       * @enum {string}
       */
      type: 'string' | 'number' | 'date' | 'datetime' | 'enumeration' | 'bool'
      /** @description Whether the property can be used in a HubSpot form. */
      formField?: boolean
      /**
       * @description The name of the group this property belongs to.
       * @example my_object_information
       */
      groupName?: string
      /** @description Defines the options this property will return, e.g. OWNER would return name of users on the portal. */
      referencedObjectType?: string
      /**
       * @description Controls how text properties are formatted in the HubSpot UI
       * @enum {string}
       */
      textDisplayHint?:
        | 'unformatted_single_line'
        | 'multi_line'
        | 'email'
        | 'phone_number'
        | 'domain_name'
        | 'ip_address'
        | 'physical_address'
        | 'postal_code'
      /** @description The internal property name, which must be used when referencing the property from the API. */
      name: string
      /**
       * @description A list of available options for the property. This field is only required for enumerated properties.
       * @example [
       *   {
       *     "label": "Option A",
       *     "value": "A",
       *     "description": "Choice number one",
       *     "displayOrder": 1
       *   },
       *   {
       *     "label": "Option B",
       *     "value": "B",
       *     "description": "Choice number two",
       *     "displayOrder": 2
       *   }
       * ]
       */
      options?: components['schemas']['OptionInput'][]
      /** @description Allow users to search for information entered to this field (limited to 3 properties) */
      searchableInGlobalSearch?: boolean
      /**
       * @description Controls how numeric properties are formatted in the HubSpot UI
       * @enum {string}
       */
      numberDisplayHint?:
        | 'unformatted'
        | 'formatted'
        | 'currency'
        | 'percentage'
        | 'duration'
        | 'probability'
      /**
       * @description Whether or not the property's value must be unique. Once set, this can't be changed.
       * @example false
       */
      hasUniqueValue?: boolean
      /**
       * @description Controls how the property appears in HubSpot.
       * @example select
       */
      fieldType: string
    }
    PropertyModificationMetadata: {
      readOnlyOptions?: boolean
      readOnlyValue: boolean
      readOnlyDefinition: boolean
      archivable: boolean
    }
    /**
     * @description Defines an association between two object types.
     * @example {
     *   "fromObjectTypeId": "2-123456",
     *   "toObjectTypeId": "contact",
     *   "name": "my_object_to_contact"
     * }
     */
    AssociationDefinitionEgg: {
      /**
       * @description ID of the primary object type to link from.
       * @example 2-123456
       */
      fromObjectTypeId: string
      /**
       * @description A unique name for this association.
       * @example my_object_to_contact
       */
      name?: string
      /**
       * @description ID of the target object type ID to link to.
       * @example contact
       */
      toObjectTypeId: string
    }
    /**
     * @description Defines an association between two object types.
     * @example {
     *   "id": "105",
     *   "fromObjectTypeId": "2-123456",
     *   "toObjectTypeId": "0-1",
     *   "name": "my_object_to_contact"
     * }
     */
    AssociationDefinition: {
      /**
       * Format: date-time
       * @description When the association was defined.
       */
      createdAt?: string
      /**
       * @description ID of the primary object type to link from.
       * @example 2-123456
       */
      fromObjectTypeId: string
      /**
       * @description A unique name for this association.
       * @example my_object_to_contact
       */
      name?: string
      /**
       * @description A unique ID for this association.
       * @example 105
       */
      id: string
      /**
       * @description ID of the target object type ID to link to.
       * @example 0-1
       */
      toObjectTypeId: string
      /**
       * Format: date-time
       * @description When the association was last updated.
       */
      updatedAt?: string
    }
    /**
     * @description Defines an object schema, including its properties and associations.
     * @example {
     *   "id": "123456",
     *   "createdAt": "2020-02-20T18:07:11.390Z",
     *   "updatedAt": "2020-02-20T18:09:07.555Z",
     *   "properties": [
     *     {
     *       "updatedAt": "2020-02-20T18:07:11.802Z",
     *       "createdAt": "2020-02-20T18:07:11.802Z",
     *       "name": "my_object_property",
     *       "label": "My object property",
     *       "type": "string",
     *       "fieldType": "text",
     *       "groupName": "my_object_information",
     *       "displayOrder": -1,
     *       "calculated": false,
     *       "externalOptions": false,
     *       "archived": false,
     *       "hasUniqueValue": false
     *     }
     *   ],
     *   "associations": [
     *     {
     *       "id": "123",
     *       "fromObjectTypeId": "2-123456",
     *       "toObjectTypeId": "0-1",
     *       "name": "my_object_to_contact"
     *     }
     *   ],
     *   "labels": {
     *     "singular": "My object",
     *     "plural": "My objects"
     *   },
     *   "requiredProperties": [
     *     "my_object_property"
     *   ],
     *   "searchableProperties": [
     *     "my_object_property"
     *   ],
     *   "primaryDisplayProperty": "my_object_property",
     *   "metaType": "PORTAL_SPECIFIC",
     *   "fullyQualifiedName": "p7878787_my_object\"",
     *   "name": "my_object"
     * }
     */
    ObjectSchema: {
      /**
       * @description Associations defined for a given object type.
       * @example [
       *   {
       *     "id": "123",
       *     "name": "my_object_to_contact",
       *     "toObjectTypeId": "0-1",
       *     "fromObjectTypeId": "2-123456"
       *   }
       * ]
       */
      associations: components['schemas']['AssociationDefinition'][]
      /** @description The names of secondary properties for this object. These will be displayed as secondary on the HubSpot record page for this object type. */
      secondaryDisplayProperties?: string[]
      objectTypeId?: string
      description?: string
      /**
       * @description An assigned unique ID for the object, including portal ID and object name.
       * @example p7878787_my_object"
       */
      fullyQualifiedName?: string
      labels: components['schemas']['ObjectTypeDefinitionLabels']
      archived?: boolean
      /**
       * Format: date-time
       * @description When the object schema was created.
       */
      createdAt?: string
      /**
       * @description The names of properties that should be **required** when creating an object of this type.
       * @example [
       *   "my_object_property"
       * ]
       */
      requiredProperties: string[]
      /**
       * @description Names of properties that will be indexed for this object type in by HubSpot's product search.
       * @example [
       *   "my_object_property"
       * ]
       */
      searchableProperties?: string[]
      /**
       * @description The name of the primary property for this object. This will be displayed as primary on the HubSpot record page for this object type.
       * @example my_object_property
       */
      primaryDisplayProperty?: string
      /**
       * @description A unique name for the schema's object type.
       * @example my_object
       */
      name: string
      /**
       * @description A unique ID for this schema's object type. Will be defined as {meta-type}-{unique ID}.
       * @example 123456
       */
      id: string
      /**
       * @description Properties defined for this object type.
       * @example [
       *   {
       *     "name": "my_object_property",
       *     "type": "string",
       *     "label": "My object property",
       *     "archived": false,
       *     "createdAt": "2020-02-20T18:07:11.802Z",
       *     "fieldType": "text",
       *     "groupName": "my_object_information",
       *     "updatedAt": "2020-02-20T18:07:11.802Z",
       *     "calculated": false,
       *     "displayOrder": -1,
       *     "hasUniqueValue": false,
       *     "externalOptions": false
       *   }
       * ]
       */
      properties: components['schemas']['Property'][]
      /**
       * Format: date-time
       * @description When the object schema was last updated.
       */
      updatedAt?: string
    }
    /**
     * @description Defines a new object type, its properties, and associations.
     * @example {
     *   "name": "my_object",
     *   "labels": {
     *     "singular": "My object",
     *     "plural": "My objects"
     *   },
     *   "primaryDisplayProperty": "my_object_property",
     *   "requiredProperties": [
     *     "my_object_property"
     *   ],
     *   "properties": [
     *     {
     *       "name": "my_object_property",
     *       "label": "My object property",
     *       "isPrimaryDisplayLabel": true
     *     }
     *   ],
     *   "associatedObjects": [
     *     "CONTACT"
     *   ],
     *   "metaType": "PORTAL_SPECIFIC"
     * }
     */
    ObjectSchemaEgg: {
      /** @description The names of secondary properties for this object. These will be displayed as secondary on the HubSpot record page for this object type. */
      secondaryDisplayProperties?: string[]
      /**
       * @description The names of properties that should be **required** when creating an object of this type.
       * @example [
       *   "my_object_property"
       * ]
       */
      requiredProperties: string[]
      /** @description Names of properties that will be indexed for this object type in by HubSpot's product search. */
      searchableProperties?: string[]
      /**
       * @description The name of the primary property for this object. This will be displayed as primary on the HubSpot record page for this object type.
       * @example my_object_property
       */
      primaryDisplayProperty?: string
      /**
       * @description A unique name for this object. For internal use only.
       * @example my_object
       */
      name: string
      description?: string
      /**
       * @description Associations defined for this object type.
       * @example [
       *   "CONTACT"
       * ]
       */
      associatedObjects: string[]
      /**
       * @description Properties defined for this object type.
       * @example [
       *   {
       *     "name": "my_object_property",
       *     "label": "My object property",
       *     "isPrimaryDisplayLabel": true
       *   }
       * ]
       */
      properties: components['schemas']['ObjectTypePropertyCreate'][]
      labels: components['schemas']['ObjectTypeDefinitionLabels']
    }
    /**
     * @description Singular and plural labels for the object. Used in CRM display.
     * @example {
     *   "singular": "My object",
     *   "plural": "My objects"
     * }
     */
    ObjectTypeDefinitionLabels: {
      /**
       * @description The word for multiple objects. (There’s no way to change this later.)
       * @example My objects
       */
      plural?: string
      /**
       * @description The word for one object. (There’s no way to change this later.)
       * @example My object
       */
      singular?: string
    }
    /**
     * @description The options available when a property is an enumeration
     * @example {
     *   "label": "Option A",
     *   "description": "Choice number one",
     *   "value": "A",
     *   "displayOrder": 1,
     *   "hidden": false
     * }
     */
    Option: {
      /**
       * @description Hidden options will not be displayed in HubSpot.
       * @example false
       */
      hidden: boolean
      /**
       * Format: int32
       * @description Options are displayed in order starting with the lowest positive integer value. Values of -1 will cause the option to be displayed after any positive values.
       * @example 1
       */
      displayOrder?: number
      /**
       * @description A description of the option.
       * @example Choice number one
       */
      description?: string
      /**
       * @description A human-readable option label that will be shown in HubSpot.
       * @example Option A
       */
      label: string
      /**
       * @description The internal value of the option, which must be used when setting the property value through the API.
       * @example A
       */
      value: string
    }
    /**
     * @description Defines a property
     * @example {
     *   "name": "my_object_property",
     *   "label": "My object property",
     *   "type": "enumeration",
     *   "fieldType": "select",
     *   "groupName": "my_object_information",
     *   "displayOrder": 2,
     *   "hasUniqueValue": false,
     *   "modificationMetadata": {
     *     "readOnlyOptions": false,
     *     "readOnlyValue": false,
     *     "readOnlyDefinition": false,
     *     "archivable": true
     *   },
     *   "options": [
     *     {
     *       "label": "Option A",
     *       "description": "Choice number one",
     *       "value": "A",
     *       "displayOrder": 1,
     *       "hidden": false
     *     },
     *     {
     *       "label": "Option B",
     *       "description": "Choice number two",
     *       "value": "B",
     *       "displayOrder": 2,
     *       "hidden": false
     *     }
     *   ]
     * }
     */
    Property: {
      /** @description The internal ID of the user who created the property in HubSpot. This field may not exist if the property was created outside of HubSpot. */
      createdUserId?: string
      hidden?: boolean
      modificationMetadata?: components['schemas']['PropertyModificationMetadata']
      /**
       * Format: int32
       * @description The order that this property should be displayed in the HubSpot UI relative to other properties for this object type. Properties are displayed in order starting with the lowest positive integer value. A value of -1 will cause the property to be displayed **after** any positive values.
       * @example 2
       */
      displayOrder?: number
      /** @description A description of the property that will be shown as help text in HubSpot. */
      description: string
      /** @description Whether the property will display the currency symbol set in the account settings. */
      showCurrencySymbol?: boolean
      /**
       * @description A human-readable property label that will be shown in HubSpot.
       * @example My object property
       */
      label: string
      /**
       * @description The property data type.
       * @example enumeration
       */
      type: string
      /** @description This will be true for default object properties built into HubSpot. */
      hubspotDefined?: boolean
      /** @description Whether or not the property can be used in a HubSpot form. */
      formField?: boolean
      /**
       * Format: date-time
       * @description When the property was created
       */
      createdAt?: string
      /**
       * Format: date-time
       * @description When the property was archived.
       */
      archivedAt?: string
      /** @description Whether or not the property is archived. */
      archived?: boolean
      /**
       * @description The name of the property group the property belongs to.
       * @example my_object_information
       */
      groupName: string
      /** @description If this property is related to other object(s), they'll be listed here. */
      referencedObjectType?: string
      /**
       * @description The internal property name, which must be used when referencing the property via the API.
       * @example my_object_property
       */
      name: string
      /**
       * @description A list of valid options for the property. This field is required for enumerated properties, but will be empty for other property types.
       * @example [
       *   {
       *     "label": "Option A",
       *     "value": "A",
       *     "hidden": false,
       *     "description": "Choice number one",
       *     "displayOrder": 1
       *   },
       *   {
       *     "label": "Option B",
       *     "value": "B",
       *     "hidden": false,
       *     "description": "Choice number two",
       *     "displayOrder": 2
       *   }
       * ]
       */
      options: components['schemas']['Option'][]
      calculationFormula?: string
      /**
       * @description Whether or not the property's value must be unique. Once set, this can't be changed.
       * @example false
       */
      hasUniqueValue?: boolean
      /**
       * @description Controls how the property appears in HubSpot.
       * @example select
       */
      fieldType: string
      /** @description The internal user ID of the user who updated the property in HubSpot. This field may not exist if the property was updated outside of HubSpot. */
      updatedUserId?: string
      /** @description For default properties, true indicates that the property is calculated by a HubSpot process. It has no effect for custom properties. */
      calculated?: boolean
      /** @description For default properties, true indicates that the options are stored externally to the property settings. */
      externalOptions?: boolean
      /** Format: date-time */
      updatedAt?: string
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
   * Get an existing schema
   * @description Returns an existing object schema.
   */
  'get-/crm/v3/schemas/{objectType}_getById': {
    parameters: {
      path: {
        /** @description Fully qualified name or object type ID of your schema. */
        objectType: string
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['ObjectSchema']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Delete a schema
   * @description Deletes a schema. Any existing records of this schema must be deleted **first**. Otherwise this call will fail.
   */
  'delete-/crm/v3/schemas/{objectType}_archive': {
    parameters: {
      query?: {
        /** @description Whether to return only results that have been archived. */
        archived?: boolean
      }
      path: {
        /** @description Fully qualified name or object type ID of your schema. */
        objectType: string
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
   * Update a schema
   * @description Update the details for an existing object schema.
   */
  'patch-/crm/v3/schemas/{objectType}_update': {
    parameters: {
      path: {
        /** @description Fully qualified name or object type ID of your schema. */
        objectType: string
      }
    }
    /** @description Attributes to update in your schema. */
    requestBody: {
      content: {
        'application/json': components['schemas']['ObjectTypeDefinitionPatch']
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['ObjectTypeDefinition']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Create an association
   * @description Defines a new association between the primary schema's object type and other object types.
   */
  'post-/crm/v3/schemas/{objectType}/associations_createAssociation': {
    parameters: {
      path: {
        /** @description Fully qualified name or object type ID of your schema. */
        objectType: string
      }
    }
    /** @description Attributes that define the association. */
    requestBody: {
      content: {
        'application/json': components['schemas']['AssociationDefinitionEgg']
      }
    }
    responses: {
      /** @description successful operation */
      201: {
        content: {
          'application/json': components['schemas']['AssociationDefinition']
        }
      }
      default: components['responses']['Error']
    }
  }
  /** @deprecated */
  'delete-/crm/v3/schemas/{objectType}/purge_purge': {
    parameters: {
      path: {
        objectType: string
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
   * Remove an association
   * @description Removes an existing association from a schema.
   */
  'delete-/crm/v3/schemas/{objectType}/associations/{associationIdentifier}_archiveAssociation': {
    parameters: {
      path: {
        /** @description Fully qualified name or object type ID of your schema. */
        objectType: string
        /** @description Unique ID of the association to remove. */
        associationIdentifier: string
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
   * Get all schemas
   * @description Returns all object schemas that have been defined for your account.
   */
  'get-/crm/v3/schemas_getAll': {
    parameters: {
      query?: {
        /** @description Whether to return only results that have been archived. */
        archived?: boolean
      }
    }
    responses: {
      /** @description successful operation */
      200: {
        content: {
          'application/json': components['schemas']['CollectionResponseObjectSchemaNoPaging']
        }
      }
      default: components['responses']['Error']
    }
  }
  /**
   * Create a new schema
   * @description Define a new object schema, along with custom properties and associations. The entire object schema, including its object type ID, properties, and associations will be returned in the response.
   */
  'post-/crm/v3/schemas_create': {
    /** @description Object schema definition, including properties and associations. */
    requestBody: {
      content: {
        'application/json': components['schemas']['ObjectSchemaEgg']
      }
    }
    responses: {
      /** @description successful operation */
      201: {
        content: {
          'application/json': components['schemas']['ObjectSchema']
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