import type {DownloadableOpenAPI, ManifestInfo} from '@opensdks/cli'
import {
  getJson,
  parseDownloadableOasListFromReadmeIo,
  snakeCase,
} from '@opensdks/cli'

export default {
  google: {
    download: async () => {
      // TODO: This doesn't work yet as data is not in OpenAPI format...
      // @see https://github.com/stackql/google-discovery-to-openapi?tab=readme-ov-file
      // So for now we are gonna just use apis.guru instead
      const guru = true
      if (guru) {
        return [
          {
            name: 'google_drive_v3',
            url: 'https://api.apis.guru/v2/specs/googleapis.com/drive/v3/openapi.json',
          },
          {
            name: 'google_drive_v2',
            url: 'https://api.apis.guru/v2/specs/googleapis.com/drive/v2/openapi.json',
          },
        ]
      }
      return getJson<{
        kind: string
        discoveryVersion: string
        items: Array<{
          kind: string
          id: string
          name: string
          version: string
          title: string
          description: string
          discoveryRestUrl: string
          icons: {
            x16: string
            x32: string
          }
          documentationLink?: string
          preferred: boolean
          discoveryLink?: string
        }>
      }>('https://www.googleapis.com/discovery/v1/apis/').then((data) =>
        data.items
          // Only include a couple popular ones for now to limit the scope
          .filter(
            (item) =>
              item.name.startsWith('drive') ||
              item.name.includes('calendar') ||
              item.name.includes('gmail') ||
              item.name.includes('youtube') ||
              item.name.includes('indexing'),
          )
          .map(
            (item): DownloadableOpenAPI => ({
              name: snakeCase(item.id),
              url: item.discoveryRestUrl,
            }),
          ),
      )
    },
  },
  vercel: {
    download: 'https://openapi.vercel.sh/',
  },
  onebrick: {
    download: () =>
      parseDownloadableOasListFromReadmeIo('https://docs.onebrick.io/', {
        name: 'onebrick',
      }),
  },
  notion: {
    download: () =>
      parseDownloadableOasListFromReadmeIo('https://developers.notion.com/', {
        name: 'notion',
      }),
  },
  mercury: {
    download: () =>
      parseDownloadableOasListFromReadmeIo('https://docs.mercury.com/', {
        name: 'mercury',
      }).then((items) =>
        items.map((item) => ({
          ...item,
          name: item.name
            .replace('mercury_api_', '')
            .replace('o_auth2', 'oauth2'),
        })),
      ),
  },
  yodlee: {
    download:
      'https://raw.githubusercontent.com/Yodlee/OpenAPI/main/swagger.yaml',
    headersTemplate: `
      {
        authorization?: \`Bearer \${string}\`
        'x-account-token'?: string
        'api-version'?: '1.1'
        [k: string]: string | undefined
      }
      `,
  },
} satisfies Record<string, ManifestInfo>
