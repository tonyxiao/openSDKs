export type HTTPMethod =
  | 'GET'
  | 'PUT'
  | 'POST'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | 'PATCH'
  | 'TRACE'

export interface Operation {
  url: URL
  method: HTTPMethod
  headers: {[k: string]: string}
  body?: unknown
}

/** Heavily inspired by trpc and Apollo GraphQL */
export type Link = (
  op: Operation,
  next: (op: Operation) => Promise<Response>,
) => Promise<Response>

export function applyLinks(op: Operation, links: Link[]): Promise<Response> {
  const [link, ...rest] = links
  if (!link) {
    throw new Error('Terminating link missing in links chain')
  }
  return link(op, (op) => applyLinks(op, rest))
}

// MARK: Built-in links

export function fetchLink({
  fetch = globalThis.fetch.bind(globalThis),
}: {
  fetch?: typeof globalThis.fetch
} = {}): Link {
  return async (op) => {
    const [headers, body] = (() => {
      if (op.body && typeof op.body === 'object') {
        return [{'Content-Type': 'application/json'}, JSON.stringify(op.body)]
      }
      return [undefined, op.body as RequestInit['body']]
    })()

    const res = await fetch(op.url, {
      method: op.method,
      headers: {...headers, ...op.headers},
      body,
    })
    return res
  }
}

export function logLink({
  log = console.log,
}: {log?: typeof console.log} = {}): Link {
  let count = 0
  return async (op, next) => {
    const i = ++count
    log(`[#${i} Request]`, op.method, op.url.href)
    const res = await next(op)
    log(`[#${i} Response]`, res.statusText, res.status)
    return res
  }
}

export function throwLink({maxCount = 1}: {maxCount?: number} = {}): Link {
  let throwCount = 0
  return async (op, next) => {
    if (throwCount < maxCount) {
      throwCount++
      throw new Error(`Throwing #${throwCount} for ${op.method} ${op.url}`)
    }
    return next(op)
  }
}

export function retryLink({maxCount = 1}: {maxCount?: number} = {}): Link {
  let retryCount = 0
  return async (op, next) => {
    while (true) {
      try {
        return await next(op)
      } catch (err) {
        if (retryCount >= maxCount) {
          throw err
        }
        retryCount++
      }
    }
  }
}
