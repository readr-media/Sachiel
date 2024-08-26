'use client'
import LayoutTemplate from '@/components/layout-template'
import ErrorPage from '@/components/status/error-page'

// Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const statusCode = error.digest?.includes('NEXT_NOT_FOUND') ? 404 : 500
  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
    >
      <ErrorPage statusCode={statusCode} reset={reset} />
    </LayoutTemplate>
  )
}
