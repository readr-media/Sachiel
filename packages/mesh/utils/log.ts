import 'server-only'

import { type ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

import { GCP_PROJECT_ID } from '@/constants/config'

export type TraceObject = Record<string, any>

function getLogTraceObject(headers: ReadonlyHeaders) {
  const traceHeader = headers?.get('x-cloud-trace-context')
  let globalLogFields: TraceObject = {}
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
  console.error(
    JSON.stringify({
      severity: 'ERROR',
      message: errorMessage,
      stack,
      debugPayload: {
        error,
      },
      ...(traceObject ?? {}),
    })
  )
}

export { getLogTraceObject, logServerSideError }
