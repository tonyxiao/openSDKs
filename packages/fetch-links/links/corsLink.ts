import type {Link} from '../link.js'

export function corsLink(): Link {
  return async (req, next) => {
    const corsHeaders = {
      'Access-Control-Allow-Credentials': 'true',
      // Need to use the request origin for credentials-mode "include" to work
      'Access-Control-Allow-Origin': req.headers.get('origin') ?? '*',
      // prettier-ignore
      'Access-Control-Allow-Methods': req.headers.get('access-control-request-method') ?? '*',
      // prettier-ignore
      'Access-Control-Allow-Headers': req.headers.get('access-control-request-headers')?? '*',
    }
    if (req.method.toUpperCase() === 'OPTIONS') {
      return new Response(null, {status: 204, headers: corsHeaders})
    }
    const res = await next(req)
    for (const [key, value] of Object.entries(corsHeaders)) {
      res.headers.set(key, value)
    }
    return res
  }
}
