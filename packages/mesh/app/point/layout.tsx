'use client'
import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import Spinner from '@/components/spinner'

import LoadingPoint from './_components/loading'
import LoadingSponsorship from './sponsorship/_components/loading'
import LoadingSubscribeStories from './subscribe-stories/_components/loading'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const subPath = pathname.split('/')[2]
  const isNestedPage = ['sponsorship', 'subscribe-stories', 'record'].includes(
    subPath
  )
  let subtitle = ''
  let loadingJsx = <Spinner />

  if (isNestedPage) {
    switch (subPath) {
      case 'sponsorship':
        subtitle = '已贊助媒體'
        loadingJsx = <LoadingSponsorship />
        break
      case 'subscribe-stories':
        subtitle = '訂閱中文章'
        loadingJsx = <LoadingSubscribeStories />
        break
      case 'record':
        subtitle = '點數紀錄'
        break
      default:
        subtitle = ''
    }

    const navigationData = {
      leftButtons: [<GoBackButton key={0} />],
      title: subtitle,
      rightButtons: [],
    }

    return (
      <LayoutTemplate
        type="default"
        customStyle={{
          background: 'bg-white sm:bg-multi-layer-light',
          restrictMainWidth: true,
          footer: 'hidden sm:block',
        }}
        mobileNavigation={navigationData}
        nonMobileNavigation={navigationData}
        suspenseFallback={loadingJsx}
      >
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
      suspenseFallback={<LoadingPoint />}
    >
      {children}
    </LayoutTemplate>
  )
}
