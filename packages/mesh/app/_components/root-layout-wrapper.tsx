'use client'

import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import { ABTestProvider } from '@/context/ab-test'
import { UserProvider } from '@/context/user'
import { ToastProvider } from '@/context/toast'
import { PickModalProvider } from '@/context/pick-modal'
import { PickersModalProvider } from '@/context/pickers-modal'
import type { User } from '@/types/user'

import Loading from './loading'

export default function RootLayoutWrapper({
  children,
  user,
}: {
  children: React.ReactNode
  user: User | undefined
}) {
  const pathname = usePathname()

  let childrenJsx = <>{children}</>
  if (pathname === '/') {
    childrenJsx = (
      <UserProvider user={user}>
        <ToastProvider>
          <PickModalProvider>
            <PickersModalProvider>
              <ABTestProvider>
                <LayoutTemplate type="default" suspenseFallback={<Loading />}>
                  {children}
                </LayoutTemplate>
              </ABTestProvider>
            </PickersModalProvider>
          </PickModalProvider>
        </ToastProvider>
      </UserProvider>
    )
  }

  return childrenJsx
}
