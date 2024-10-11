'use client'
import '@/styles/global.css'

import { useParams, usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import GoBackButton from '@/components/navigation/go-back-button'
import MoreButton from '@/components/story-card/more-button'
import { FOLLOW_LIST_PATHS } from '@/constants/page-style'
import { EditProfileProvider } from '@/context/edit-profile'
import { useUser } from '@/context/user'
import { logout } from '@/utils/logout'

const hasNestedLayout = (pathName: string) => {
  return FOLLOW_LIST_PATHS.some((path) => pathName.endsWith(path))
}

export default function ProfileMemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const params = useParams<{ customId?: string }>()
  const { user } = useUser()

  const pageCustomId = params.customId ?? ''
  const isSelf = pageCustomId === user?.customId

  if (hasNestedLayout(pathName)) {
    return <EditProfileProvider>{children}</EditProfileProvider>
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
          isSelf ? (
            <MobileNavigationButton
              key={0}
              type="text"
              text="登出"
              color="gray"
              customCss="button"
              onClick={logout}
            />
          ) : (
            <GoBackButton key={0} />
          ),
        ],
        title: pageCustomId,
        rightButtons: [
          // TODO: replace with ProfileMoreActionButton
          <MoreButton key={0} />,
        ],
      }}
      nonMobileNavigation={{
        leftButtons: isSelf ? [] : [<GoBackButton key={0} />],
        title: pageCustomId,
        rightButtons: [<MoreButton key={0} />],
      }}
    >
      <EditProfileProvider>{children}</EditProfileProvider>
    </LayoutTemplate>
  )
}
