import type {BodySerializer, FetchOptions, FetchResponse} from 'openapi-fetch'
import _createClient from 'openapi-fetch'
import type {PathsWithMethod} from 'openapi-typescript-helpers'
import {HTTPError} from './HTTPError'
import type {Operation} from './links'
import {applyLinks, fetchLink, type HTTPMethod, type Link} from './links'

type _ClientOptions = NonNullable<Parameters<typeof _createClient>[0]>

export interface ClientOptions extends _ClientOptions {
  links?: Link[] | ((defaultLinks: Link[]) => Link[])
}

export type OpenAPIClient<Paths extends {}> = ReturnType<
  typeof createClient<Paths>
>

// Should this be combined with createSDK?
// and for example do things such as parsing jsonschema
// to get a list of servers and all that?
// Really do feel that they should be generated as well..

export const defaultLinks = [fetchLink()]

export function createClient<Paths extends {}>({
  links: _links = defaultLinks,
  ...clientOptions
}: ClientOptions = {}) {
  const links = typeof _links === 'function' ? _links(defaultLinks) : _links

  const customFetch: typeof fetch = async (url, init) => {
    // TODO: Do some validation here...
    const operation: Operation = {
      url: new URL(url as string),
      method: init?.method?.toUpperCase() as HTTPMethod,
      // TODO: Ensure headers is always an object, otherwise this will break
      headers: (init?.headers ?? {}) as any,
      body: init?.body,
    }
    return applyLinks(operation, links)
  }
  const client = _createClient<Paths>({...clientOptions, fetch: customFetch})

  return {
    links,
    client,
    /** Untyped request */
    request: <T>(
      method: HTTPMethod,
      url: string,
      options?: Omit<FetchOptions<unknown>, 'body'> & {body?: unknown},
    ) =>
      client[method as 'GET'](url as never, options as never).then(
        throwIfNotOk(method),
      ) as Promise<{
        data: T
        response: FetchResponse<unknown>['response']
      }>,
    GET: <P extends PathsWithMethod<Paths, 'get'>>(
      ...args: Parameters<typeof client.GET<P>>
    ) => client.GET<P>(...args).then(throwIfNotOk('GET')),
    PUT: <P extends PathsWithMethod<Paths, 'put'>>(
      ...args: Parameters<typeof client.PUT<P>>
    ) => client.PUT(...args).then(throwIfNotOk('PUT')),
    POST: <P extends PathsWithMethod<Paths, 'post'>>(
      ...args: Parameters<typeof client.POST<P>>
    ) => client.POST(...args).then(throwIfNotOk('POST')),
    DELETE: <P extends PathsWithMethod<Paths, 'delete'>>(
      ...args: Parameters<typeof client.DELETE<P>>
    ) => client.DELETE(...args).then(throwIfNotOk('DELETE')),
    OPTIONS: <P extends PathsWithMethod<Paths, 'options'>>(
      ...args: Parameters<typeof client.OPTIONS<P>>
    ) => client.OPTIONS(...args).then(throwIfNotOk('OPTIONS')),
    HEAD: <P extends PathsWithMethod<Paths, 'head'>>(
      ...args: Parameters<typeof client.HEAD<P>>
    ) => client.HEAD(...args).then(throwIfNotOk('HEAD')),
    PATCH: <P extends PathsWithMethod<Paths, 'patch'>>(
      ...args: Parameters<typeof client.PATCH<P>>
    ) => client.PATCH(...args).then(throwIfNotOk('PATCH')),
    TRACE: <P extends PathsWithMethod<Paths, 'trace'>>(
      ...args: Parameters<typeof client.TRACE<P>>
    ) => client.TRACE(...args).then(throwIfNotOk('TRACE')),
  }
}

export function throwIfNotOk<T>(method: HTTPMethod) {
  return (res: FetchResponse<T>) => {
    if (res.error) {
      throw new HTTPError<T>({method, error: res.error, response: res.response})
    }
    // error is not set, so safely casting..
    return res as Extract<typeof res, {data: unknown}>
  }
}

/**
 * Would be nice if we got this automatically, but openapi ts is types only...
 * https://openapi-ts.pages.dev/openapi-fetch/api#bodyserializer */
export const formDataBodySerializer: BodySerializer<unknown> = (body) => {
  const fd = new FormData()
  for (const [k, v] of Object.entries(body ?? {})) {
    fd.append(k, `${v}`)
  }
  return fd
}
