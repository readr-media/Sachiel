'use client'

import { usePathname, useRouter } from 'next/navigation'

import Icon from '@/components/icon'
import LayoutTemplate from '@/components/layout-template'

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const subPath = pathname.split('/')[2]
  const subtitle = subPath.startsWith('subscription') ? '解鎖' : '贊助'

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white',
        restrictMainWidth: true,
        footer: 'hidden',
        nav: 'hidden sm:block',
      }}
      navigation={{
        leftButtons: [
          {
            type: 'icon',
            icon: 'icon-chevron-left',
            onClick: () => {
              router.back()
            },
          },
        ],
        title: subtitle,
        rightButtons: [],
      }}
    >
      {/* TODO: use shared pc navigation component */}
      <div className="hidden h-15 w-full flex-row items-center border-b bg-white sm:flex">
        <button type="button" onClick={() => router.back()}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </button>
        <h2 className="list-title mx-auto sm:ml-6">{subtitle}</h2>
        <div className="size-5 px-5"></div>
      </div>
      {children}
    </LayoutTemplate>
  )
}
