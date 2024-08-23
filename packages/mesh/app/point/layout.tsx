'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import Icon from '@/components/icon'
import LayoutTemplate from '@/components/layout-template'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const subPath = pathname.split('/')[2]
  const isNestedPage = ['sponsorship', 'subscribe-stories'].includes(subPath)

  if (isNestedPage) {
    const subtitle = subPath === 'sponsorship' ? '已贊助媒體' : '訂閱中文章'
    return (
      <LayoutTemplate
        type="default"
        customStyle={{
          background: 'bg-white sm:bg-multi-layer-light',
          restrictMainWidth: true,
          footer: 'hidden sm:block',
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
          <Link href={'/point'}>
            <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
          </Link>
          <h2 className="list-title mx-auto sm:ml-6">{subtitle}</h2>
          <div className="size-5 px-5"></div>
        </div>
        {children}
      </LayoutTemplate>
    )
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
