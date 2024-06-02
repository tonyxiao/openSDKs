export type DownloadableOpenAPI = {
  name: string
  url: string
  type?: 'redoc' | 'readme'
  /** Infer this from the url later... */
  format?: 'json' | 'yaml'
}

export interface ManifestInfo {
  /**
   * Package version, parseable by [`node-semver`](https://github.com/npm/node-semver).
   * @temporary This should be automatically managed by the tooling
   */
  version?: string
  download?: string | (() => Promise<DownloadableOpenAPI[]>)
  generate?: () => Promise<void>

  headersTemplate?: string
}

export default {
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
