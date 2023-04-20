import type { AxiosError } from 'axios'
import type { GaxiosError } from 'gaxios'
import type { NextApiResponse } from 'next'

type RequestError = Pick<
  AxiosError | GaxiosError,
  'response' | 'message' | 'config'
>

export function reportGoogleSheetApiError(
  error: RequestError,
  res: NextApiResponse,
  { scope }: { scope?: string } = {}
) {
  let statusCode = 500
  const { message, response } = error

  statusCode = response?.status || statusCode
  res.status(statusCode).send(message)

  logApiError(error, scope)
}

export function logApiError(error: RequestError, scope: string = '') {
  const { response, message, config } = error
  const { url } = config ?? {}

  if (response) {
    const { status, statusText, data, headers } = response
    const { method } = config ?? {}
    // eslint-disable-next-line no-console
    console.error(
      `${getApiErrorName(
        scope
      )}: statusCode=${status}, statusText=${statusText}, url=${url}, method=${method}, data=${JSON.stringify(
        data
      )}, headers=${JSON.stringify(headers)}`
    )
  } else {
    // eslint-disable-next-line no-console
    console.error(`${getErrorName()}: message=${message}, url=${url}`)
  }
}

function getApiErrorName(scope?: string) {
  return getErrorName(scope ? `${scope} API` : 'API')
}

export function getErrorName(scope = '') {
  return `[${scope || 'READr'} error]`
}
