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
        destination: 'https://readr-dev-38eec.firebaseapp.com/__/auth/:path*',
      },
    ]
  },
}

export default nextConfig
