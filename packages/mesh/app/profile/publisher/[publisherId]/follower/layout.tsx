'use client'
import { useRouter } from 'next/navigation'

import Loading from '@/app/profile/member/[customId]/(follow)/_components/loading'
import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default function FollowerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()

  const backToPreviousPage = () => {
    router.back()
  }

  const title = '粉絲'

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-multi-layer-light',
        footer: 'hidden sm:block',
        nav: 'hidden sm:block',
      }}
      mobileNavigation={{
        leftButtons: [
          {
            type: 'icon',
            icon: 'icon-chevron-left',
            onClick: backToPreviousPage,
          },
        ],
        title,
        rightButtons: [],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title,
        rightButtons: [],
      }}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
