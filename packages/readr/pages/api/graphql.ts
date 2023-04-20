/*
 * This API endpoint is for client-side GraphQL request.
 *
 * Since rewrite rule in next.config is not configurable during runtime,
 * we implement GraphQL API proxy by ourselves.
 */

import httpProxy from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'

import { API_ENDPOINT } from '~/constants/config'

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy()
    proxy.once('proxyRes', resolve).once('error', reject).web(req, res, {
      changeOrigin: true,
      target: API_ENDPOINT,
    })
  })
}
