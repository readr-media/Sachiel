'use client'

import ErrorPage from '@/components/status/error-page'

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="flex min-h-screen flex-col">
        <div className="flex grow flex-col items-center justify-center">
          <ErrorPage statusCode={500} reset={reset} />
        </div>
      </body>
    </html>
  )
}
