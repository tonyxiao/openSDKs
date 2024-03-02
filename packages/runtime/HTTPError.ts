import type {FetchResponse} from 'openapi-fetch'
import type {HTTPMethod} from '@opensdks/fetch-links'

export class HTTPError<T> extends Error {
  override name = 'HTTPError'
  readonly method: HTTPMethod
  readonly error: Extract<FetchResponse<T>, {error: unknown}>['error']
  readonly response: FetchResponse<T>['response']

  get code() {
    return this.response?.status
  }

  constructor({
    method,
    error,
    response: r,
  }: Extract<FetchResponse<T>, {error: unknown}> & {method: HTTPMethod}) {
    super(
      [
        `[${r.status} ${r.statusText}] ${method.toUpperCase()} ${r.url}`,
        safeJsonStringify(error),
      ]
        .filter((l) => !!l)
        .join('\n'),
    )
    this.method = method
    this.error = error
    this.response = r
    Object.setPrototypeOf(this, HTTPError.prototype)
  }
}

function safeJsonStringify(value: unknown) {
  try {
    if (value == null) {
      return null
    }
    return JSON.stringify(value, null, 2)
  } catch {
    return `Not JSON: ${value}`
  }
}
