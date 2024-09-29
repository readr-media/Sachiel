'use client'
import '@/styles/global.css'

import { useParams, usePathname, useRouter } from 'next/navigation'

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
  const router = useRouter()
  const params = useParams<{ publisherId?: string }>()

  const pageCustomId = params.publisherId ?? ''

  const handleMoreButtonClicked = () => {
    // TODO: deal with the feature
  }

  const backToPreviousPage = () => {
    router.back()
  }

  if (hasNestedLayout(pathName)) {
    return <>{children}</>
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
      mobileNavigation={{
        leftButtons: [
          {
            type: 'icon',
            icon: 'icon-chevron-left',
            onClick: backToPreviousPage,
          },
        ],
        title: pageCustomId,
        rightButtons: [
          {
            type: 'icon',
            icon: 'icon-more-horiz',
            onClick: handleMoreButtonClicked,
          },
        ],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: pageCustomId,
        rightButtons: [<MoreButton key={0} />],
      }}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
