'use client'

import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'

export default function RootLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  let childrenJsx = <>{children}</>
  if (pathname === '/') {
    childrenJsx = <LayoutTemplate type="default">{children}</LayoutTemplate>
  }

  return childrenJsx
}
