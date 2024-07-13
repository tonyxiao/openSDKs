export type DownloadableOpenAPI =
  | {
      name: string
      url: string
      data?: undefined
      /** TODO: Remove me, wrong level of abstraction */
      type?: 'redoc' | 'readme'
      /** Infer this from the url later... */
      format?: 'json' | 'yaml'
    }
  | {
      name: string
      data: string
      type: 'raw'
      url?: undefined
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
