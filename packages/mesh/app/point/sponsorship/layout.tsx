'use client'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Icon from '@/components/icon'
import LayoutTemplate from '@/components/layout-template'

export default function SponsorshipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const backToPreviousPage = () => {
    router.back()
  }

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
            onClick: backToPreviousPage,
          },
        ],
        title: '已贊助媒體',
        rightButtons: [],
      }}
    >
      {/* TODO: use shared pc navigation component */}
      <div className="hidden h-15 w-full flex-row items-center border-b bg-white sm:flex">
        <Link href={'/point'}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </Link>
        <h2 className="list-title mx-auto sm:ml-6">已贊助媒體</h2>
        <div className="size-5 px-5"></div>
      </div>
      {children}
    </LayoutTemplate>
  )
}
