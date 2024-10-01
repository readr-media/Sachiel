'use client'
import { usePathname, useRouter } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import Spinner from '@/components/spinner'

import LoadingSponsorship from './sponsorship/_components/loading'
import LoadingSubscribeStories from './subscribe-stories/_components/loading'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
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

    return (
      <LayoutTemplate
        type="default"
        customStyle={{
          background: 'bg-white sm:bg-multi-layer-light',
          restrictMainWidth: true,
          footer: 'hidden sm:block',
        }}
        mobileNavigation={{
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
        nonMobileNavigation={{
          leftButtons: [<GoBackButton key={0} />],
          title: subtitle,
          rightButtons: [],
        }}
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
    >
      {children}
    </LayoutTemplate>
  )
}
