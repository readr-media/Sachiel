import 'server-only'

import { cookies } from 'next/headers'
import type { XOR } from 'ts-xor'

import { getLogTraceObjectFromHeaders, logServerSideError } from './log'

enum RestfulMethod {
  Get = 'GET',
  Post = 'POST',
}

type ResponseType = 'json' | 'blob' | 'text' | 'arrayBuffer' | 'formData'

type RequestUrl = string | URL | Request

type PostRequestParam = {
  method: RestfulMethod.Post
  url: RequestUrl
  body: object
}

type GetRequestParam = {
  method: RestfulMethod.Get
  url: RequestUrl
}

export function fetchRestfulGet<T>(
  url: RequestUrl,
  init?: RequestInit,
  errorMessage?: string,
  responseType?: ResponseType
) {
  return fetchRestful<T>({
    method: RestfulMethod.Get,
    url,
    init,
    errorMessage,
    responseType,
  })
}

export function fetchRestfulPost<T>(
  url: RequestUrl,
  body: object,
  init?: RequestInit,
  errorMessage?: string,
  responseType?: ResponseType
) {
  return fetchRestful<T>({
    method: RestfulMethod.Post,
    url,
    body,
    init,
    errorMessage,
    responseType,
  })
}

type Param = {
  init?: RequestInit
  errorMessage?: string
  responseType?: ResponseType
} & XOR<GetRequestParam, PostRequestParam>

async function fetchRestful<T>({
  url,
  method,
  body,
  init = { cache: 'no-cache' },
  errorMessage,
  responseType = 'json',
}: Param) {
  const idToken = cookies().get('token')?.value ?? ''

  try {
    const response = await fetch(url, {
      ...init,
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        ...init.headers,
      },
      body: method === 'POST' ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    let data: T
    switch (responseType) {
      case 'blob':
        data = (await response.blob()) as T
        break
      case 'text':
        data = (await response.text()) as T
        break
      case 'arrayBuffer':
        data = (await response.arrayBuffer()) as T
        break
      case 'formData':
        data = (await response.formData()) as T
        break
      case 'json':
      default:
        data = (await response.json()) as T
    }
    // const data: T = await response.json()
    return data
  } catch (error) {
    const traceObject = getLogTraceObjectFromHeaders()
    // TODO: put body and intt objects inside logServerSideError and use debugPaylod to log them
    const fallbackErrorMessage =
      'Fetch Restful failed, info: ' + JSON.stringify({ url, body, init })
    logServerSideError(error, errorMessage || fallbackErrorMessage, traceObject)
    return null
  }
}
