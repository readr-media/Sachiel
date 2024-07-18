import * as tsImport from 'ts-import'

const { FIREBASE_DOMAIN } = await tsImport.load('./constants/config.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      {
        source: '/__/auth/:path*',
        destination: `https://${FIREBASE_DOMAIN}/__/auth/:path*`,
      },
    ]
  },
}

export default nextConfig
