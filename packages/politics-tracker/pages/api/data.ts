import type { AxiosError } from 'axios'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

import { cmsApiUrl } from '~/constants/config'

const timeout = 5000

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = Object.assign({}, req.headers)
  delete headers.host

  try {
    const response = await axios({
      method: req.method,
      url: cmsApiUrl,
      headers,
      data: req.method === 'GET' ? undefined : req.body,
      timeout,
    })

    if (response.data._status === 'ERR') {
      res.setHeader('Cache-Control', 'no-cache')
    }

    res.send(response.data)
  } catch (error) {
    const err = error as AxiosError

    res.setHeader('Cache-Control', 'no-cache')

    if (err?.response) {
      const { status, statusText, headers, data } = err.response

      res.status(status).send(err.response?.data ?? err.message)

      console.error(
        `[API Error] statusCode=${status}, statusText=${statusText}, url=${
          req.url
        }, headers=${JSON.stringify(headers)}, data=${JSON.stringify(data)}`
      )
    } else {
      res.status(500).send(err.message)

      console.error(`[API Error] message=${err.message}, url=${req.url}`)
    }
  }
}
