/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => ({
    beforeFiles: [],
    afterFiles: [
      {source: '/:p*', destination: 'https://opensdks.mintlify.app/:p*'},
    ],
    fallback: [
      {source: '/:p*', destination: 'https://opensdks.mintlify.app/:p*'},
    ],
  }),
  redirects: async () => [
    {source: '/docs', destination: '/introduction', permanent: false},
  ],
}

module.exports = nextConfig
