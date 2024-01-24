import type {HTTPMethod} from './link.js'

/**
 * Conditionally get body to avoid issues with
 * "TypeError: Response body object should not be disturbed or locked"
 * "TypeError: Request with GET/HEAD method cannot have body."
 * @see https://share.cleanshot.com/KPYHPC5n
 * Typically used together with modifyRequest
 */
export async function maybeGetBody(req: Request) {
  return ['POST', 'PUT', 'PATCH'].includes(req.method) ? await req.blob() : null
}

type URLOverrides = {
  /** Either overrides or fn that does in-place modification */
  searchParams?: Record<string, unknown> | ((sp: URLSearchParams) => void)
} & Partial<
  Pick<
    URL,
    | 'hash'
    | 'hostname'
    | 'href'
    | 'password'
    | 'pathname'
    | 'port'
    | 'protocol'
    | 'username'
  >
>

export function modifyUrl(
  urlStr: string,
  {searchParams, ...overrides}: URLOverrides,
) {
  // Workaround the fact that URL API is not able to parse partial relative URLs
  const tempBase = urlStr.includes('//') ? undefined : 'http://temp'
  const url = new URL(urlStr, tempBase)

  for (const [key, value] of Object.entries(overrides ?? {})) {
    url[key as keyof typeof overrides] = value
  }
  if (typeof searchParams === 'function') {
    searchParams(url.searchParams)
  } else {
    for (const [key, value] of Object.entries(searchParams ?? {})) {
      url.searchParams.set(key, String(value))
    }
  }
  return url.toString().slice(tempBase?.length)
}

export function modifyRequest(
  req: Request,
  overrides: Omit<RequestInit, 'headers'> & {
    method?: HTTPMethod
    url?: string | URLOverrides
    /** Either overrides or fn that does in-place modification */
    headers?: HeadersInit | ((headers: Headers) => void)
    /**
     * Needed when passing through body as ReadableStream of byteArray. Solves
     * "TypeError: RequestInit: duplex option is required when sending a body."
     * TODO: Think about if we should better abstract this somehow...
     */
    duplex?: 'half'
  },
) {
  return new Request(
    typeof overrides.url === 'string'
      ? overrides.url
      : overrides.url
        ? modifyUrl(req.url, overrides.url)
        : req.url,
    {
      // Can we spread this? Or is there a better way to duplicate
      method: req.method,
      body: req.body,
      cache: req.cache,
      credentials: req.credentials,
      integrity: req.integrity,
      keepalive: req.keepalive,
      mode: req.mode,
      redirect: req.redirect,
      referrer: req.referrer,
      referrerPolicy: req.referrerPolicy,
      signal: req.signal,
      duplex: 'half', // Solves for duplex is required issue
      ...overrides,
      headers: modifyHeaders(req.headers, overrides.headers),
    },
  )
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
