import type {OpenAPISpec, SdkDefinition, SDKTypes} from '@opensdks/core'
import type {ClientOptions} from '@opensdks/core/createClient'
import type {components, external, operations, paths, webhooks} from './qbo.oas'
import {default as qboOas} from './qbo.oas.json'

// Does this work with tree-shaking?
export {qboOas}

export interface qboOasTypes {
  components: components
  external: external
  operations: operations
  paths: paths
  webhooks: webhooks
}

export type QBOSDKTypes = SDKTypes<
  qboOasTypes,
  ClientOptions & {realmId: string}
>

export const qboSdkDef = {
  types: {} as QBOSDKTypes,
  oas: qboOas as OpenAPISpec,
  createClient: (ctx, {realmId, ...options}) => {
    const client = ctx.createClient({
      ...options,
      baseUrl: options.baseUrl?.replace('{realmId}', realmId),
    })
    function query(query: string) {
      return client
        .GET('/query', {params: {query: {query}}})
        .then((r) => r.data.QueryResponse)
    }

    const extension = {
      query,
      async count(entity: string) {
        return query(`SELECT count(*) FROM ${entity}`).then(
          (r) => r.totalCount ?? -1,
        )
      },
      async *getAll<T extends components['schemas']['EntityName']>(
        entityName: T,
        /** Range is inclusive, ISODateTime */
        params: {updatedSince?: string} = {},
      ) {
        let startPosition = 1 // QBO is 1 index based
        // Fetch 100 transactions only on the first request to optimize for incremental
        // sync scenarios
        let maxResults = 100
        while (true) {
          const res = await query(`SELECT * FROM ${entityName} ${
            params.updatedSince
              ? `WHERE MetaData.LastUpdatedTime >='${params.updatedSince}'`
              : ''
          } ORDERBY MetaData.LastUpdatedTime DESC
         STARTPOSITION ${startPosition} MAXRESULTS ${maxResults}`)

          const entities = res[entityName] ?? []
          yield {
            // Hack needed for some reason
            entities: entities as Exclude<typeof entities, never[]>,
            startPosition,
            maxResults,
          }
          if (entities.length === 0) {
            break
          }
          startPosition += entities.length
          maxResults = 500 // Then fetch 500 fo efficiency
        }
      },
    }
    return {...client, ...extension} as typeof client & typeof extension
  },
} satisfies SdkDefinition<QBOSDKTypes>

export default qboSdkDef
