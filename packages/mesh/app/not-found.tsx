'use client'
import '@/styles/global.css'

import LayoutTemplate from '@/components/layout-template'
import ErrorPage from '@/components/status/error-page'

export default function NotFound() {
  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
    >
      <ErrorPage statusCode={404} />
    </LayoutTemplate>
  )
}
