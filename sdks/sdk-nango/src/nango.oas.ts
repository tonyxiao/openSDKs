import {OpenAPISpec} from '@opensdks/runtime'
import {createDocument, jsonOperation, z} from '@opensdks/util-zod'

const zNangoProviderId = z
  .enum([
    'accelo',
    'adobe',
    'aircall',
    'airtable',
    'apollo',
    'amazon',
    'amplitude',
    'asana',
    'ashby',
    'atlassian',
    'bamboohr',
    'battlenet',
    'bitbucket',
    'boldsign',
    'box',
    'braintree',
    'braintree-sandbox',
    'brex',
    'brex-staging',
    'calendly',
    'clickup',
    'confluence',
    'contentstack',
    'deel',
    'deel-sandbox',
    'digitalocean',
    'discord',
    'docusign',
    'docusign-sandbox',
    'dropbox',
    'epic-games',
    'evaluagent',
    'eventbrite',
    'exact-online',
    'factorial',
    'facebook',
    'figjam',
    'figma',
    'fitbit',
    'freshbooks',
    'freshservice',
    'front',
    'github',
    'github-app',
    'gitlab',
    'gong',
    'google',
    'google-calendar',
    'google-mail',
    'google-sheet',
    'gorgias',
    'greenhouse',
    'gumroad',
    'gusto',
    'health-gorilla',
    'highlevel',
    'hubspot',
    'instagram',
    'intercom',
    'intuit',
    'jira',
    'keap',
    'lever',
    'lever-sandbox',
    'linear',
    'linkedin',
    'linkhut',
    'mailchimp',
    'microsoft-teams',
    'mixpanel',
    'miro',
    'monday',
    'mural',
    'nationbuilder',
    'netsuite',
    'notion',
    'one-drive',
    'osu',
    'outreach',
    'pagerduty',
    'pandadoc',
    'payfit',
    'pennylane',
    'pipedrive',
    'qualtrics',
    'quickbooks',
    'ramp',
    'ramp-sandbox',
    'reddit',
    'ring-central',
    'ring-central-sandbox',
    'segment',
    'sage',
    'salesforce',
    'salesforce-sandbox',
    'salesloft',
    'servicem8',
    'shopify',
    'shortcut',
    'slack',
    'smugmug',
    'splitwise',
    'spotify',
    'squareup',
    'squareup-sandbox',
    'stackexchange',
    'strava',
    'stripe',
    'stripe-express',
    'survey-monkey',
    'teamwork',
    'timely',
    'trello',
    'todoist',
    'twitch',
    'twitter',
    'twitter-v2',
    'twinfield',
    'typeform',
    'uber',
    'unauthenticated',
    'wakatime',
    'wave-accounting',
    'wildix-pbx',
    'workable',
    'xero',
    'yahoo',
    'yandex',
    'youtube',
    'zapier-nla',
    'zendesk',
    'zenefits',
    'zoho',
    'zoho-books',
    'zoho-crm',
    'zoho-desk',
    'zoho-inventory',
    'zoho-invoice',
    'zoom',
  ])
  .openapi({ref: 'ProviderId'})

export const zAuthMode = z
  .enum(['OAUTH2', 'OAUTH1', 'BASIC', 'API_KEY'])
  .openapi({ref: 'AuthMode'})

export type NangoProvider = z.infer<typeof zNangoProviderId>

export const zIntegrationShort = z.object({
  provider: zNangoProviderId,
  /** aka provider_config_key */
  unique_key: z.string(),
})

export const zConnectionShort = z.object({
  /**
   * This is a very mis-leading property name. It is typically the userId. Notably this means each user would only be able
   * to connect a single connection for each provider
   */
  connection_id: z.string(),
  created: z.string().datetime(),
  /** Now this is actually the unique id for the connection */
  id: z.number(),
  provider: z
    .string()
    .describe(
      'This is actually the provider_config_key instead of the provider id',
    ),
})

export const zConnection = zConnectionShort
  .extend({
    updated_at: z.string().datetime(),
    provider_config_key: z.string(),
    credentials: z.object({
      type: zAuthMode,
      /** For API key auth... */
      api_key: z.string().nullish(),
      access_token: z.string().optional(),
      refresh_token: z.string().optional(),
      expires_at: z.string().datetime(),
      raw: z.object({
        access_token: z.string(),
        expires_in: z.number(),
        expires_at: z.string().datetime(),
        /** Refresh token (Only returned if the REFRESH_TOKEN boolean parameter is set to true and the refresh token is available) */
        refresh_token: z.string().nullish(),
        refresh_token_expires_in: z.number().nullish(),
        token_type: z.string(), //'bearer',
        scope: z.string().optional(),
      }),
    }),
    connection_config: z
      .object({
        portalId: z.number().nullish(),
        instance_url: z.string().nullish(),
      })
      .catchall(z.unknown())
      .nullish(),
    metadata: z.record(z.unknown()).nullable(),
    credentials_iv: z.string(),
    credentials_tag: z.string(),
    environment_id: z.number(),
    deleted: z.boolean(),
    deleted_at: z.string().datetime().nullable(),
    last_fetched_at: z.string().datetime().nullable(),
  })
  .openapi({ref: 'Connection'})

export const zIntegration = zIntegrationShort
  .extend({
    client_id: z.string(),
    client_secret: z.string(),
    /** comma deliminated scopes with no spaces in between */
    scopes: z.string().optional(),
    app_link: z.string().nullish(),
    // In practice we only use nango for oauth integrations
    // but in theory we could use it for a generic secret store as well
    auth_mode: zAuthMode,
  })
  .openapi({ref: 'Integration'})

export const zUpsertIntegration = zIntegration
  .omit({
    unique_key: true,
    client_id: true,
    client_secret: true,
    scopes: true,
  })
  .extend({
    provider_config_key: z.string(),
    oauth_client_id: z.string(),
    oauth_client_secret: z.string(),
    oauth_scopes: z.string().optional(),
  })
  .partial({auth_mode: true})

export type UpsertIntegration = z.infer<typeof zUpsertIntegration>

export const oas = createDocument({
  openapi: '3.1.0',
  info: {title: 'Nango API', version: '0.0.0'},
  servers: [{url: 'https://api.nango.dev'}],
  components: {
    securitySchemes: {},
  },
  paths: {
    '/config': {
      get: jsonOperation('listIntegrations', {
        response: z.object({
          configs: z.array(zIntegrationShort),
        }),
      }),
      put: jsonOperation('updateIntegration', {
        body: zUpsertIntegration,
        response: z.null(),
      }),
      post: jsonOperation('createIntegration', {
        body: zUpsertIntegration,
        response: z.null(),
      }),
    },
    '/config/{provider_config_key}': {
      get: jsonOperation('getIntegration', {
        path: z.object({provider_config_key: z.string()}),
        query: z.object({include_creds: z.boolean().optional()}),
        response: z.object({
          config: z.union([zIntegration, zIntegrationShort]),
        }),
      }),
      delete: jsonOperation('deleteIntegration', {
        path: z.object({provider_config_key: z.string()}),
        response: z.null(),
      }),
    },
    '/connection': {
      get: jsonOperation('listConnections', {
        response: z.object({
          connections: z.array(zConnectionShort),
        }),
      }),
    },
    '/connection/{connectionId}': {
      get: jsonOperation('getConnection', {
        path: z.object({connectionId: z.string()}),
        query: z.object({
          provider_config_key: z.string(),
          force_refresh: z.boolean().optional(),
          refresh_token: z.boolean().optional(),
        }),
        response: zConnection,
      }),
      delete: jsonOperation('deleteConnection', {
        path: z.object({connection_id: z.string()}),
        query: z.object({
          provider_config_key: z.string(),
          force_refresh: z.boolean().optional(),
          refresh_token: z.boolean().optional(),
        }),
        response: z.null(),
      }),
    },
  },
}) as OpenAPISpec

export default oas

if (import.meta.url.endsWith(process.argv[1]!)) {
  console.log(JSON.stringify(oas, null, 2))
}
