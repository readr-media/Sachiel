'use client'

import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import { ABTestProvider } from '@/context/ab-test'

import Loading from './loading'

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  let childrenJsx = <>{children}</>
  if (pathname === '/') {
    childrenJsx = (
      <ABTestProvider>
        <LayoutTemplate type="default" suspenseFallback={<Loading />}>
          {children}
        </LayoutTemplate>
      </ABTestProvider>
    )
  }

  return childrenJsx
}
