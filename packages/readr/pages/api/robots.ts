import { NextApiRequest, NextApiResponse } from 'next'

import { ENV } from '~/constants/environment-variables'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain')
  if (ENV === 'prod') {
    res.write(`User-agent: * 
Allow: / `)
  } else {
    res.write(`User-agent: * 
Disallow: /`)
  }
  res.end()
}
