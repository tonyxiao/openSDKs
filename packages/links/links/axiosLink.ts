import type {Link} from '../link'

export function axiosLink({
  axios,
}: {
  axios: typeof import('axios').default
}): Link {
  return async (req) => {
    const res = await axios.request({
      method: req.method,
      url: req.url,
      data: await req.blob(),
      headers: Object.fromEntries(req.headers.entries()),
      responseType: 'stream',
      // ...req, // Support passing other axios options
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return new Response(res.data, {
      headers: res.headers as HeadersInit,
      status: res.status,
      statusText: res.statusText,
    })
  }
}
