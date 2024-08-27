'use client'
import '@/styles/global.css'

import { useRouter } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import ErrorPage from '@/components/status/error-page'

export default function NotFound() {
  const router = useRouter()
  const handleRefresh = () => {
    router.refresh()
  }
  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
    >
      <ErrorPage statusCode={404} reset={handleRefresh} />
    </LayoutTemplate>
  )
}
