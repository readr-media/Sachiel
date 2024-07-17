import { cookies } from 'next/headers'

import { type TraceObject, logServerSideError } from './log'

export default async function fetchRestful<T>(
  url: string | URL | Request,
  json: object,
  init?: RequestInit,
  traceObject?: TraceObject,
  errorMessage?: string
) {
  const idToken = cookies().get('Authorization')?.value ?? ''
  try {
    const response = await fetch(url, {
      ...init,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(json),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    const fallbackErrorMessage =
      'Fetch Restful failed, info: ' + JSON.stringify({ url, json, init })
    logServerSideError(error, errorMessage || fallbackErrorMessage, traceObject)
    return null
  }
}
