import { type RequestInit } from 'next/dist/server/web/spec-extension/request'
import { cookies } from 'next/headers'

import { type TraceObject, logServerSideError } from './log'

export default async function fetchStatic<T>(
  url: string | URL | Request,
  init?: RequestInit,
  traceObject?: TraceObject,
  errorMessage?: string
) {
  const idToken = cookies().get('Authorization')?.value
  try {
    const headers = new Headers(init?.headers)
    if (idToken) {
      headers.set('Authorization', `Bearer ${idToken}`)
    }
    const response = await fetch(url, {
      ...init,
      headers,
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    const fallbackErrorMessage =
      'Fetch static failed, info: ' + JSON.stringify({ url, init })
    logServerSideError(error, errorMessage || fallbackErrorMessage, traceObject)
    return null
  }
}
