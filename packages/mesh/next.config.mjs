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
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  eslint: {
    dirs: [
      'app',
      'components',
      'apollo',
      'constants',
      'context',
      'firebase',
      'hooks',
      'types',
      'utils',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
      },
      // Handle auth routes with language prefix (e.g., /en-US/__/auth/handler, /zh-TW/__/auth/handler)
      {
        source: '/:lng/__/auth/:path*',
        destination: `https://${FIREBASE_DOMAIN}/__/auth/:path*`,
      },
      // Handle auth routes without language prefix (fallback)
      {
        source: '/__/auth/:path*',
        destination: `https://${FIREBASE_DOMAIN}/__/auth/:path*`,
      },
    ]
  },
}

export default nextConfig
