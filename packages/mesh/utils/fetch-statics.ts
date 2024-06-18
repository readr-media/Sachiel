import { RequestInit } from 'next/dist/server/web/spec-extension/request'

export default async function fetchData<T>(
  url: string | URL | Request,
  init?: RequestInit
) {
  try {
    const response = await fetch(url, init)

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    // TODO: Structured logging
    console.error(error)
    return null
  }
}
