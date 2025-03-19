'use client'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

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
  const t = useTranslations('Pages.Point')
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
        subtitle = t('Layout-sponsor')
        loadingJsx = <LoadingSponsorship />
        break
      case 'subscribe-stories':
        subtitle = t('Layout-subscribe-stories')
        loadingJsx = <LoadingSubscribeStories />
        break
      case 'record':
        subtitle = t('Layout-record')
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
      suspenseFallback={
        <main className="flex grow flex-col sm:p-5 md:px-[70px] md:py-10 lg:p-10">
          <LoadingPoint />
        </main>
      }
    >
      {children}
    </LayoutTemplate>
  )
}
