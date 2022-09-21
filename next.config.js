/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['rickandmortyapi.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.rickandmortyapi.com',
      },
      {
        protocol: 'http',
        hostname: '**.rickandmortyapi.com',
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
};

module.exports = nextConfig
