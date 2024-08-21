'use client'
import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const subPath = pathname.split('/')[2]
  const isNestedPage = ['sponsorship', 'subscribe-stories'].includes(subPath)

  if (isNestedPage) {
    return <>{children}</>
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white sm:bg-multi-layer-light',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
    >
      {children}
    </LayoutTemplate>
  )
}
