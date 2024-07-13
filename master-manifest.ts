import type {DownloadableOpenAPI, ManifestInfo} from '@opensdks/cli'
import {
  getJson,
  parseDownloadableOasListFromReadmeIo,
  snakeCase,
} from '@opensdks/cli'

export default {
  dropbox: {
    download:
      // [Dropbox itself](https://www.dropbox.com/developers/documentation/http/documentation) does not provider OpenAPI spec, but there is a community one
      // https://gist.github.com/levibostian/86248f2dfdb7601ec378bb77b0d45e34#file-foo-yaml
      'https://gist.githubusercontent.com/levibostian/86248f2dfdb7601ec378bb77b0d45e34/raw/142e78a76b2d0193e99f9b388ca83c23d154d45d/foo.yaml',
  },
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
  clerk: {
    download: async () => {
      const htmlText = await fetch(
        'https://clerk.com/docs/reference/backend-api',
      ).then((r) => r.text())
      // Some crazy redoc stuff. Seriously can they make this any harder...
      const jsPath = htmlText.match(/"([a-zA-Z0-9\/-]+redocly-state.+?)"/)?.[1]
      if (!jsPath) {
        throw new Error('Error finding openapi spec for Clerk')
      }
      const jsUrl = `https://clerk.com${jsPath}`
      const jsText = await fetch(jsUrl).then((r) => r.text())
      const jsonText = jsText.match(/JSON.parse\((["'].+["'])\);?/)?.[1]
      try {
        // Doubly nested json... crazy stuff
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-unsafe-argument
        const jsonState = JSON.parse(JSON.parse(jsonText!))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const oas = jsonState.definition.data
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!oas.openapi) {
          throw new Error('Missing openapi field in Clerk OpenAPI spec')
        }
        return [
          {name: 'clerk', type: 'raw', data: JSON.stringify(oas, null, 2)},
        ]
      } catch (err) {
        throw err
      }
    },
  },
  chargepoint: {
    download: () =>
      import('./manifests/chargepoint.oas.js').then(
        ({naOas: na, ssoOas: sso}) => [
          // a bit annoying names has to be fully formed like this...
          {
            name: 'chargepoint_na',
            type: 'raw',
            data: JSON.stringify(na, null, 2),
          },
          {
            name: 'chargepoint_sso',
            type: 'raw',
            data: JSON.stringify(sso, null, 2),
          },
        ],
      ),
  },
} satisfies Record<string, ManifestInfo>
