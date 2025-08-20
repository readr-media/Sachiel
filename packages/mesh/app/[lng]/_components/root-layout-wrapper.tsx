'use client'

import { usePathname } from 'next/navigation'

import { languages } from '@/app/i18n/settings'
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
  if (languages.includes(pathname.replace('/', ''))) {
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
