import {
  initSDK,
  type ClientOptions,
  type OpenAPITypes,
  type SdkDefinition,
  type SDKTypes,
} from '@opensdks/runtime'
import type Oas_analytics_custom_behavioral_events from '../hubspot_analytics_custom_behavioral_events.oas.types.js'
import type Oas_auth_oauth from '../hubspot_auth_oauth.oas.types.js'
import type Oas_automation_actions from '../hubspot_automation_actions.oas.types.js'
import type Oas_business_units_business_units from '../hubspot_business_units_business_units.oas.types.js'
import type Oas_cms_audit_logs from '../hubspot_cms_audit_logs.oas.types.js'
import type Oas_cms_authors from '../hubspot_cms_authors.oas.types.js'
import type Oas_cms_blog_posts from '../hubspot_cms_blog_posts.oas.types.js'
import type Oas_cms_domains from '../hubspot_cms_domains.oas.types.js'
import type Oas_cms_hubdb from '../hubspot_cms_hubdb.oas.types.js'
import type Oas_cms_performance from '../hubspot_cms_performance.oas.types.js'
import type Oas_cms_site_search from '../hubspot_cms_site_search.oas.types.js'
import type Oas_cms_source_code from '../hubspot_cms_source_code.oas.types.js'
import type Oas_cms_tags from '../hubspot_cms_tags.oas.types.js'
import type Oas_cms_url_redirects from '../hubspot_cms_url_redirects.oas.types.js'
import type Oas_communication_preferences_communications_status from '../hubspot_communication_preferences_communications_status.oas.types.js'
import type Oas_conversations_visitor_identification from '../hubspot_conversations_visitor_identification.oas.types.js'
import type Oas_crm_accounting from '../hubspot_crm_accounting.oas.types.js'
import type Oas_crm_associations from '../hubspot_crm_associations.oas.types.js'
import type Oas_crm_calling from '../hubspot_crm_calling.oas.types.js'
import type Oas_crm_companies from '../hubspot_crm_companies.oas.types.js'
import type Oas_crm_contacts from '../hubspot_crm_contacts.oas.types.js'
import type Oas_crm_crm_associations from '../hubspot_crm_crm_associations.oas.types.js'
import type Oas_crm_crm_extensions from '../hubspot_crm_crm_extensions.oas.types.js'
import type Oas_crm_deals from '../hubspot_crm_deals.oas.types.js'
import type Oas_crm_feedback_submissions from '../hubspot_crm_feedback_submissions.oas.types.js'
import type Oas_crm_imports from '../hubspot_crm_imports.oas.types.js'
import type Oas_crm_line_items from '../hubspot_crm_line_items.oas.types.js'
import type Oas_crm_objects from '../hubspot_crm_objects.oas.types.js'
import type Oas_crm_owners from '../hubspot_crm_owners.oas.types.js'
import type Oas_crm_pipelines from '../hubspot_crm_pipelines.oas.types.js'
import type Oas_crm_products from '../hubspot_crm_products.oas.types.js'
import type Oas_crm_properties from '../hubspot_crm_properties.oas.types.js'
import type Oas_crm_quotes from '../hubspot_crm_quotes.oas.types.js'
import type Oas_crm_schemas from '../hubspot_crm_schemas.oas.types.js'
import type Oas_crm_tickets from '../hubspot_crm_tickets.oas.types.js'
import type Oas_crm_timeline from '../hubspot_crm_timeline.oas.types.js'
import type Oas_crm_videoconferencing from '../hubspot_crm_videoconferencing.oas.types.js'
import type Oas_events_events from '../hubspot_events_events.oas.types.js'
import type Oas_marketing_marketing_events_beta from '../hubspot_marketing_marketing_events_beta.oas.types.js'
import type Oas_marketing_transactional from '../hubspot_marketing_transactional.oas.types.js'
import type Oas_webhooks_webhooks from '../hubspot_webhooks_webhooks.oas.types.js'
import {default as oas_analytics_custom_behavioral_events} from './hubspot_analytics_custom_behavioral_events.oas.meta.js'
import {default as oas_auth_oauth} from './hubspot_auth_oauth.oas.meta.js'
import {default as oas_automation_actions} from './hubspot_automation_actions.oas.meta.js'
import {default as oas_business_units_business_units} from './hubspot_business_units_business_units.oas.meta.js'
import {default as oas_cms_audit_logs} from './hubspot_cms_audit_logs.oas.meta.js'
import {default as oas_cms_authors} from './hubspot_cms_authors.oas.meta.js'
import {default as oas_cms_blog_posts} from './hubspot_cms_blog_posts.oas.meta.js'
import {default as oas_cms_domains} from './hubspot_cms_domains.oas.meta.js'
import {default as oas_cms_hubdb} from './hubspot_cms_hubdb.oas.meta.js'
import {default as oas_cms_performance} from './hubspot_cms_performance.oas.meta.js'
import {default as oas_cms_site_search} from './hubspot_cms_site_search.oas.meta.js'
import {default as oas_cms_source_code} from './hubspot_cms_source_code.oas.meta.js'
import {default as oas_cms_tags} from './hubspot_cms_tags.oas.meta.js'
import {default as oas_cms_url_redirects} from './hubspot_cms_url_redirects.oas.meta.js'
import {default as oas_communication_preferences_communications_status} from './hubspot_communication_preferences_communications_status.oas.meta.js'
import {default as oas_conversations_visitor_identification} from './hubspot_conversations_visitor_identification.oas.meta.js'
import {default as oas_crm_accounting} from './hubspot_crm_accounting.oas.meta.js'
import {default as oas_crm_associations} from './hubspot_crm_associations.oas.meta.js'
import {default as oas_crm_calling} from './hubspot_crm_calling.oas.meta.js'
import {default as oas_crm_companies} from './hubspot_crm_companies.oas.meta.js'
import {default as oas_crm_contacts} from './hubspot_crm_contacts.oas.meta.js'
import {default as oas_crm_crm_associations} from './hubspot_crm_crm_associations.oas.meta.js'
import {default as oas_crm_crm_extensions} from './hubspot_crm_crm_extensions.oas.meta.js'
import {default as oas_crm_deals} from './hubspot_crm_deals.oas.meta.js'
import {default as oas_crm_feedback_submissions} from './hubspot_crm_feedback_submissions.oas.meta.js'
import {default as oas_crm_imports} from './hubspot_crm_imports.oas.meta.js'
import {default as oas_crm_line_items} from './hubspot_crm_line_items.oas.meta.js'
import {default as oas_crm_objects} from './hubspot_crm_objects.oas.meta.js'
import {default as oas_crm_owners} from './hubspot_crm_owners.oas.meta.js'
import {default as oas_crm_pipelines} from './hubspot_crm_pipelines.oas.meta.js'
import {default as oas_crm_products} from './hubspot_crm_products.oas.meta.js'
import {default as oas_crm_properties} from './hubspot_crm_properties.oas.meta.js'
import {default as oas_crm_quotes} from './hubspot_crm_quotes.oas.meta.js'
import {default as oas_crm_schemas} from './hubspot_crm_schemas.oas.meta.js'
import {default as oas_crm_tickets} from './hubspot_crm_tickets.oas.meta.js'
import {default as oas_crm_timeline} from './hubspot_crm_timeline.oas.meta.js'
import {default as oas_crm_videoconferencing} from './hubspot_crm_videoconferencing.oas.meta.js'
import {default as oas_events_events} from './hubspot_events_events.oas.meta.js'
import {default as oas_marketing_marketing_events_beta} from './hubspot_marketing_marketing_events_beta.oas.meta.js'
import {default as oas_marketing_transactional} from './hubspot_marketing_transactional.oas.meta.js'
import {default as oas_webhooks_webhooks} from './hubspot_webhooks_webhooks.oas.meta.js'

export type {
  Oas_analytics_custom_behavioral_events,
  Oas_auth_oauth,
  Oas_automation_actions,
  Oas_business_units_business_units,
  Oas_cms_audit_logs,
  Oas_cms_authors,
  Oas_cms_blog_posts,
  Oas_cms_domains,
  Oas_cms_hubdb,
  Oas_cms_performance,
  Oas_cms_site_search,
  Oas_cms_source_code,
  Oas_cms_tags,
  Oas_cms_url_redirects,
  Oas_communication_preferences_communications_status,
  Oas_conversations_visitor_identification,
  Oas_crm_accounting,
  Oas_crm_associations,
  Oas_crm_calling,
  Oas_crm_companies,
  Oas_crm_contacts,
  Oas_crm_crm_associations,
  Oas_crm_crm_extensions,
  Oas_crm_deals,
  Oas_crm_feedback_submissions,
  Oas_crm_imports,
  Oas_crm_line_items,
  Oas_crm_objects,
  Oas_crm_owners,
  Oas_crm_pipelines,
  Oas_crm_products,
  Oas_crm_properties,
  Oas_crm_quotes,
  Oas_crm_schemas,
  Oas_crm_tickets,
  Oas_crm_timeline,
  Oas_crm_videoconferencing,
  Oas_events_events,
  Oas_marketing_marketing_events_beta,
  Oas_marketing_transactional,
  Oas_webhooks_webhooks,
}

export {
  oas_analytics_custom_behavioral_events,
  oas_auth_oauth,
  oas_automation_actions,
  oas_business_units_business_units,
  oas_cms_audit_logs,
  oas_cms_authors,
  oas_cms_blog_posts,
  oas_cms_domains,
  oas_cms_hubdb,
  oas_cms_performance,
  oas_cms_site_search,
  oas_cms_source_code,
  oas_cms_tags,
  oas_cms_url_redirects,
  oas_communication_preferences_communications_status,
  oas_conversations_visitor_identification,
  oas_crm_accounting,
  oas_crm_associations,
  oas_crm_calling,
  oas_crm_companies,
  oas_crm_contacts,
  oas_crm_crm_associations,
  oas_crm_crm_extensions,
  oas_crm_deals,
  oas_crm_feedback_submissions,
  oas_crm_imports,
  oas_crm_line_items,
  oas_crm_objects,
  oas_crm_owners,
  oas_crm_pipelines,
  oas_crm_products,
  oas_crm_properties,
  oas_crm_quotes,
  oas_crm_schemas,
  oas_crm_tickets,
  oas_crm_timeline,
  oas_crm_videoconferencing,
  oas_events_events,
  oas_marketing_marketing_events_beta,
  oas_marketing_transactional,
  oas_webhooks_webhooks,
}

export type HubspotSDKTypes = SDKTypes<
  OpenAPITypes, // Hubspot has mutliple APIs
  Omit<ClientOptions, 'headers'> & {
    headers: {
      /** Hubspot access token goes into the bearer header */
      authorization: `Bearer ${string}`
      [k: string]: string
    }
  }
>

export const hubspotSdkDef = {
  types: {} as HubspotSDKTypes,
  defaultOptions: {},
  createClient(ctx, _options) {
    const options: typeof _options = {
      ..._options,
      baseUrl: _options.baseUrl ?? oas_crm_contacts.servers[0].url,
    }
    const analytics_custom_behavioral_events =
      ctx.createClient<Oas_analytics_custom_behavioral_events['paths']>(options)
    const auth_oauth = ctx.createClient<Oas_auth_oauth['paths']>(options)
    const automation_actions =
      ctx.createClient<Oas_automation_actions['paths']>(options)
    const business_units_business_units =
      ctx.createClient<Oas_business_units_business_units['paths']>(options)
    const cms_audit_logs =
      ctx.createClient<Oas_cms_audit_logs['paths']>(options)
    const cms_authors = ctx.createClient<Oas_cms_authors['paths']>(options)
    const cms_blog_posts =
      ctx.createClient<Oas_cms_blog_posts['paths']>(options)
    const cms_domains = ctx.createClient<Oas_cms_domains['paths']>(options)
    const cms_hubdb = ctx.createClient<Oas_cms_hubdb['paths']>(options)
    const cms_performance =
      ctx.createClient<Oas_cms_performance['paths']>(options)
    const cms_site_search =
      ctx.createClient<Oas_cms_site_search['paths']>(options)
    const cms_source_code =
      ctx.createClient<Oas_cms_source_code['paths']>(options)
    const cms_tags = ctx.createClient<Oas_cms_tags['paths']>(options)
    const cms_url_redirects =
      ctx.createClient<Oas_cms_url_redirects['paths']>(options)
    const communication_preferences_communications_status =
      ctx.createClient<
        Oas_communication_preferences_communications_status['paths']
      >(options)
    const conversations_visitor_identification =
      ctx.createClient<Oas_conversations_visitor_identification['paths']>(
        options,
      )
    const crm_accounting =
      ctx.createClient<Oas_crm_accounting['paths']>(options)
    const crm_associations =
      ctx.createClient<Oas_crm_associations['paths']>(options)
    const crm_calling = ctx.createClient<Oas_crm_calling['paths']>(options)
    const crm_companies = ctx.createClient<Oas_crm_companies['paths']>(options)
    const crm_contacts = ctx.createClient<Oas_crm_contacts['paths']>(options)
    const crm_crm_associations =
      ctx.createClient<Oas_crm_crm_associations['paths']>(options)
    const crm_crm_extensions =
      ctx.createClient<Oas_crm_crm_extensions['paths']>(options)
    const crm_deals = ctx.createClient<Oas_crm_deals['paths']>(options)
    const crm_feedback_submissions =
      ctx.createClient<Oas_crm_feedback_submissions['paths']>(options)
    const crm_imports = ctx.createClient<Oas_crm_imports['paths']>(options)
    const crm_line_items =
      ctx.createClient<Oas_crm_line_items['paths']>(options)
    const crm_objects = ctx.createClient<Oas_crm_objects['paths']>(options)
    const crm_owners = ctx.createClient<Oas_crm_owners['paths']>(options)
    const crm_pipelines = ctx.createClient<Oas_crm_pipelines['paths']>(options)
    const crm_products = ctx.createClient<Oas_crm_products['paths']>(options)
    const crm_properties =
      ctx.createClient<Oas_crm_properties['paths']>(options)
    const crm_quotes = ctx.createClient<Oas_crm_quotes['paths']>(options)
    const crm_schemas = ctx.createClient<Oas_crm_schemas['paths']>(options)
    const crm_tickets = ctx.createClient<Oas_crm_tickets['paths']>(options)
    const crm_timeline = ctx.createClient<Oas_crm_timeline['paths']>(options)
    const crm_videoconferencing =
      ctx.createClient<Oas_crm_videoconferencing['paths']>(options)
    const events_events = ctx.createClient<Oas_events_events['paths']>(options)
    const marketing_marketing_events_beta =
      ctx.createClient<Oas_marketing_marketing_events_beta['paths']>(options)
    const marketing_transactional =
      ctx.createClient<Oas_marketing_transactional['paths']>(options)
    const webhooks_webhooks =
      ctx.createClient<Oas_webhooks_webhooks['paths']>(options)

    return {
      analytics_custom_behavioral_events,
      auth_oauth,
      automation_actions,
      business_units_business_units,
      cms_audit_logs,
      cms_authors,
      cms_blog_posts,
      cms_domains,
      cms_hubdb,
      cms_performance,
      cms_site_search,
      cms_source_code,
      cms_tags,
      cms_url_redirects,
      communication_preferences_communications_status,
      conversations_visitor_identification,
      crm_accounting,
      crm_associations,
      crm_calling,
      crm_companies,
      crm_contacts,
      crm_crm_associations,
      crm_crm_extensions,
      crm_deals,
      crm_feedback_submissions,
      crm_imports,
      crm_line_items,
      crm_objects,
      crm_owners,
      crm_pipelines,
      crm_products,
      crm_properties,
      crm_quotes,
      crm_schemas,
      crm_tickets,
      crm_timeline,
      crm_videoconferencing,
      events_events,
      marketing_marketing_events_beta,
      marketing_transactional,
      webhooks_webhooks,
    }
  },
} satisfies SdkDefinition<HubspotSDKTypes>

export default hubspotSdkDef

export function initHubspotSDK(opts: HubspotSDKTypes['options']) {
  return initSDK(hubspotSdkDef, opts)
}

export type HubspotSDK = ReturnType<typeof initHubspotSDK>
