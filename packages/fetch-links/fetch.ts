import type {Link} from './link.js'
import {applyLinks, fetchLink} from './link.js'

/** 
 * Create a custom fetch function with middleware (aka) baked in. 
 * The terminating `fetchLink` is automatically added at the end of the chain.
 */
export function createFetchWithLinks(opts: {
  fetch?: typeof globalThis.fetch
  links: Link[]
}): typeof globalThis.fetch {
  return (url, init) =>
    applyLinks(new Request(url, init), [
      ...opts.links,
      fetchLink({fetch: opts.fetch}),
    ])
}
