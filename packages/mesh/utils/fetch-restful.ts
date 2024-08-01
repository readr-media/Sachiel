import { cookies } from 'next/headers'
import type { XOR } from 'ts-xor'

import { type TraceObject, logServerSideError } from './log'

export enum RestfulMethod {
  Get = 'GET',
  Post = 'POST',
}

type PostRequestParam = {
  method: RestfulMethod.Post
  url: string | URL | Request
  body: object
}

type GetRequestParam = {
  method: RestfulMethod.Get
  url: string | URL | Request
}

type RequestParam = {
  init?: RequestInit
} & XOR<GetRequestParam, PostRequestParam>

type LogParam = {
  traceObject?: TraceObject
  errorMessage?: string
}

export default async function fetchRestful<T>(
  { url, body, init, method }: RequestParam,
  { traceObject, errorMessage }: LogParam
) {
  const idToken = cookies().get('token')?.value ?? ''

  try {
    let response: Response

    switch (method) {
      case RestfulMethod.Get:
        response = await fetch(url, init)
        break
      case RestfulMethod.Post:
        response = await fetch(url, {
          ...init,
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(body),
        })
        break
      default:
        throw new Error(`unhandled restful method ${method}`)
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    const fallbackErrorMessage =
      'Fetch Restful failed, info: ' +
      JSON.stringify({ url, method, body, init })
    logServerSideError(error, errorMessage || fallbackErrorMessage, traceObject)
    return null
  }
}
