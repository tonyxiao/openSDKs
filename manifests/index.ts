export type DownloadableOpenAPI = {
  name: string
  url: string
  type?: 'redoc' | 'readme'
  /** Infer this from the url later... */
  format?: 'json' | 'yaml'
}

export interface ManifestInfo {
  download?: string | (() => Promise<DownloadableOpenAPI[]>)
  generate?: () => Promise<void>
}

export default {
  yodlee: {
    download:
      'https://raw.githubusercontent.com/Yodlee/OpenAPI/main/swagger.yaml',
  },
} satisfies Record<string, ManifestInfo>
