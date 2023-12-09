export type HTTPMethod =
  | 'GET'
  | 'PUT'
  | 'POST'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'PATCH'
  | 'TRACE'

/**
 * The BetterRequest object is an extension of the native [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
 * interface, with better typing and extended functionality such as mutable properties
 * though maybe we should allow for immutable requests?
 */
export type BetterRequest<TJson = unknown> = Omit<Request, 'method'> & {
  readonly method: HTTPMethod
  json: <T = TJson>() => Promise<T>
}

/**
 * The BetterResponse object is an extension of the native [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
 * interface, with better typing and extended functionality.
 */
export type BetterResponse<TJson = unknown> = Omit<Response, 'json'> & {
  json: <T = TJson>() => Promise<T>
}

/** Heavily inspired by trpc and Apollo GraphQL */
export type Link = (
  req: BetterRequest,
  next: (req: BetterRequest | Request) => Promise<Response>,
) => Promise<BetterResponse>

export function applyLinks(
  req: BetterRequest | Request,
  links: Link[],
): Promise<BetterResponse> {
  const [link, ...rest] = links
  if (!link) {
    throw new Error('Terminating link missing in links chain')
  }
  // Every request is actually a BetterRequest :)
  return link(req as BetterRequest, (op) => applyLinks(op, rest))
}

// MARK: Built-in links

export function fetchLink({
  fetch = globalThis.fetch.bind(globalThis),
}: {
  fetch?: typeof globalThis.fetch
} = {}): Link {
  return (req) => fetch(req as Request)
}

// Primitive log link, can be much better!
export function logLink({
  log = console.log,
}: {log?: typeof console.log} = {}): Link {
  let count = 0
  return async (req, next) => {
    const i = ++count
    log(`[#${i} Request]`, req.method, req.url)
    const res = await next(req)
    log(`[#${i} Response]`, res.statusText, res.status)
    return res
  }
}

// Retry count & throw count should be done on a per-operation basis

export function throwLink({maxCount = 1}: {maxCount?: number} = {}): Link {
  let throwCount = 0
  return async (req, next) => {
    if (throwCount < maxCount) {
      throwCount++
      throw new Error(`Throwing #${throwCount} for ${req.method} ${req.url}`)
    }
    return next(req)
  }
}

export function retryLink({maxCount = 1}: {maxCount?: number} = {}): Link {
  let retryCount = 0
  return async (req, next) => {
    while (true) {
      try {
        return await next(req)
      } catch (err) {
        if (retryCount >= maxCount) {
          throw err
        }
        retryCount++
      }
    }
  }
}
