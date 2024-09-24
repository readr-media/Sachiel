'use client'
import LayoutTemplate from '@/components/layout-template'
import ErrorPage from '@/components/status/error-page'

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
    >
      <ErrorPage statusCode={500} reset={reset} />
    </LayoutTemplate>
  )
}
