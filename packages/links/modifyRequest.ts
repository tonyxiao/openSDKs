import type {HTTPMethod} from './link'

export function modifyRequest(
  req: Request,
  overrides: RequestInit & {method?: HTTPMethod; url?: string},
) {
  return new Request(overrides.url ?? req.url, {
    method: overrides.method ?? req.method,
    headers: mergeHeaders(req.headers, overrides.headers),
    body: overrides.body ?? req.body,
    // Can we spread this? Or is there a better way to duplicate
    cache: req.cache,
    credentials: req.credentials,
    integrity: req.integrity,
    keepalive: req.keepalive,
    mode: req.mode,
    redirect: req.redirect,
    referrer: req.referrer,
    referrerPolicy: req.referrerPolicy,
    signal: req.signal,
  })
}

/** Courtesy of https://github.com/whitecrownclown/merge-headers/blob/master/index.ts */
export function mergeHeaders(...sources: Array<HeadersInit | undefined>) {
  const result: Record<string, string> = {}

  for (const source of sources) {
    if (source == null) {
      continue
    }
    if (typeof source !== 'object') {
      throw new TypeError('All arguments must be of type object')
    }

    const headers: Headers = new Headers(source)
    for (const [key, value] of headers.entries()) {
      if (value === undefined || value === 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete result[key]
      } else {
        result[key] = value
      }
    }
  }

  return new Headers(result)
}
