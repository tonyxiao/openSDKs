import type {Link} from '../link.js'

// codegen:start {extension: {ts: 'js'}, preset: barrel, include: "./{*.{ts,tsx},*/index.{ts,tsx}}", exclude: "*.{spec,test,fixture,d}.{ts,tsx}"}
export * from './axiosLink.js'
export * from './corsLink.js'
export * from './oauthLink.js'
// codegen:end

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
