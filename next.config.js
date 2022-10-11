/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rickandmortyapi.com', 'cloudfront.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.rickandmortyapi.com',
      },
      {
        protocol: 'http',
        hostname: '**.rickandmortyapi.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
      {
        protocol: 'http',
        hostname: '**.cloudfront.net',
      },
    ]
  },
  async rewrites() { 
    return [
      {
        source: '/:path*',
        destination: '/:path*'
      },
      {
        source: '/:path*',
        destination: 'http://localhost:4000/:path*'
      },
      {
        source: '/',
        destination: 'http://localhost:4000/:path*'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          }
        ],
      },
    ]
  },
};

module.exports = nextConfig
