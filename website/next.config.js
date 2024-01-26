/** @type {import('next').NextConfig} */
const nextConfig = {
  // Rewrites don't work in production due to _next paths not being redirected... Too hard to setup so just redirect for now.
  redirects: async () => [
    {
      source: '/',
      destination: 'https://github.com/tonyxiao/openSDKs',
      permanent: false,
    },
  ],
}

export default nextConfig
