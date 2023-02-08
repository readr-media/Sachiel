/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  webpack: (config, options) => {
    // graphql files
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'graphql-tag/loader',
        },
      ],
    })

    return config
  },
  async rewrites() {
    return [
      // only for index
      {
        source: '/politics-tracker',
        destination: '/',
      },
      // for other page under /politics-tracker
      {
        source: '/politics-tracker/:path*',
        destination: '/:path*',
      },
      // for personal page sitemaps
      {
        source: '/server-sitemaps/person/:year',
        destination: '/server-sitemaps/person.xml?=:year',
      },
      // for personal page sitemaps
      {
        source: '/server-sitemaps/politics-summary/:year',
        destination: '/server-sitemaps/politics-summary.xml?=:year',
      },
    ]
  },
  output: 'standalone',
}

module.exports = nextConfig
