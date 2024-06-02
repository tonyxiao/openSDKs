import type {ManifestInfo} from '@opensdks/cli'
import {parseDownloadableOasListFromReadmeIo} from '@opensdks/cli'

export default {
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
