import type {HTTPMethod} from './link.js'

export function modifyRequest(
  req: Request,
  overrides: Omit<RequestInit, 'headers'> & {
    method?: HTTPMethod
    url?: string
    headers?: HeadersInit | ((headers: Headers) => void)
  },
) {
  return new Request(overrides.url ?? req.url, {
    // only include body if it exists
    // otherwise we get TypeError: cannot include body for GET / HEAD requests
    ...(req.body != null && {body: req.body}), 
    // Can we spread this? Or is there a better way to duplicate
    method: req.method,
    cache: req.cache,
    credentials: req.credentials,
    integrity: req.integrity,
    keepalive: req.keepalive,
    mode: req.mode,
    redirect: req.redirect,
    referrer: req.referrer,
    referrerPolicy: req.referrerPolicy,
    signal: req.signal,
    ...overrides,
    headers: modifyHeaders(req.headers, overrides.headers),
  })
}

export function modifyResponse(
  res: Response,
  overrides: Omit<ResponseInit, 'headers'> & {
    headers?: HeadersInit | ((headers: Headers) => void)
  },
) {
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    ...overrides,
    headers: modifyHeaders(res.headers, overrides.headers),
  })
}

export function modifyHeaders(
  original: HeadersInit,
  modify: HeadersInit | ((headers: Headers) => void) | undefined,
) {
  const headers = new Headers(original)
  if (!modify) {
    return headers
  } else if (typeof modify === 'function') {
    modify(headers)
    return headers
  } else {
    return mergeHeaders(headers, modify)
  }
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
