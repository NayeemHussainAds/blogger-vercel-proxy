/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/blogger',
        destination: 'https://screeninsiderhub.blogspot.com',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
