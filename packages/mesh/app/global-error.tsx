'use client'

import { Noto_Sans_TC } from 'next/font/google'

import ErrorPage from '@/components/status/error-page'

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <body className="flex min-h-screen flex-col">
        <div className="flex grow flex-col items-center justify-center">
          <ErrorPage statusCode={500} reset={reset} />
        </div>
      </body>
    </html>
  )
}
