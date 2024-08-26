'use client'

import ErrorPage from '@/components/status/error-page'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const statusCode = error.digest?.includes('NEXT_NOT_FOUND') ? 404 : 500
  // TODO: cannot add stateful header
  return (
    <html>
      <body className="flex min-h-screen flex-col">
        <div className="flex grow flex-col items-center justify-center">
          <ErrorPage statusCode={statusCode} reset={reset} />
        </div>
      </body>
    </html>
  )
}
