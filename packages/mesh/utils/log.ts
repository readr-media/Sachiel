import 'server-only'

import { headers } from 'next/headers'

import { GCP_PROJECT_ID } from '@/constants/config'

export type TraceObject = Record<string, unknown>

function getLogTraceObjectFromHeaders() {
  const traceHeader = headers()?.get('x-cloud-trace-context')
  const globalLogFields: TraceObject = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }
  return globalLogFields
}

function logServerSideError(
  error: unknown,
  errorMessage: string,
  traceObject?: TraceObject
) {
  const stack = error instanceof Error ? error.stack : 'No stack available'
  const debugError =
    error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : error
  console.error(
    JSON.stringify({
      severity: 'ERROR',
      message: errorMessage,
      stack,
      debugPayload: {
        error: debugError,
      },
      ...(traceObject ?? {}),
    })
  )
}

export { getLogTraceObjectFromHeaders, logServerSideError }
