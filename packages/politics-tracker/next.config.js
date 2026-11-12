/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'whoareyou-gcs.readr.tw' },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/whoareyou-gcs.readr.tw/**',
      },
      // some stored photo URLs use a double slash before Images
      { protocol: 'http', hostname: 'www.ly.gov.tw', pathname: '{/,//}Images/**' },
      { protocol: 'https', hostname: 'www.ly.gov.tw', pathname: '{/,//}Images/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },

  webpack: (config, /* eslint-disable-line no-unused-vars */ options) => {
    // svg files
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // viewBox is required to resize SVGs with CSS.
                      // @see https://github.com/svg/svgo/issues/1128
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    })
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
        source: '/(politics-tracker|)',
        destination: '/2024',
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
        source: '/server-sitemaps/politics-summary-related-to-person/:year',
        destination:
          '/server-sitemaps/politics-summary-related-to-person.xml?=:year',
      },
    ]
  },
  output: 'standalone',
}

module.exports = nextConfig
