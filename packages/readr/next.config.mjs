import * as tsImport from 'ts-import'

const { ENV } = await tsImport.load('./constants/environment-variables.ts')

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
  webpack: (config, /* eslint-disable-line no-unused-vars */ options) => {
    // svg files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
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
  output: 'standalone',
  async headers() {
    return [
      // for debug purpose
      {
        source: '/',
        headers: [
          {
            key: 'x-build-env',
            value: ENV,
          },
        ],
      },
    ]
  },
}

export default nextConfig
