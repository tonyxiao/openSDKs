// This file is generated by @opensdks/cli, do not edit manually.
export const oasMeta = {
  info: {
    title: 'Events Send Event Completions',
    description:
      'HTTP API for triggering instances of custom behavioral events',
    version: 'v3',
    'x-hubspot-product-tier-requirements': {
      marketing: 'ENTERPRISE',
      sales: 'ENTERPRISE',
      service: 'ENTERPRISE',
      cms: 'ENTERPRISE',
    },
    'x-hubspot-documentation-banner': 'NONE',
    'x-hubspot-api-use-case':
      'You want to track more complex interactions that visitors perform when they navigate to your website and engage with your content.',
    'x-hubspot-related-documentation': [
      {
        name: 'Custom events guide',
        url: 'https://hubspot.dev/guides/api/analytics/events',
      },
    ],
    'x-hubspot-introduction':
      'Use the custom events API to define events that you can later create and associate with records in your HubSpot CRM.',
  },
  servers: [{url: 'https://api.hubapi.com'}],
} as const
export default oasMeta
