'use client'
import '@/styles/global.css'

import { useParams, usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import MoreButton from '@/components/story-card/more-button'
import { FOLLOW_LIST_PATHS } from '@/constants/page-style'

import Loading from './_component/loading'

const hasNestedLayout = (pathName: string) => {
  return FOLLOW_LIST_PATHS.some((path) => pathName.endsWith(path))
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const params = useParams<{ customId?: string }>()

  const pageCustomId = params.customId ?? ''

  if (hasNestedLayout(pathName)) {
    return <>{children}</>
  }

  const navigationData = {
    leftButtons: [<GoBackButton key={0} />],
    title: pageCustomId,
    // TODO: replace with ProfileMoreActionButton
    rightButtons: [<MoreButton key={0} />],
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
