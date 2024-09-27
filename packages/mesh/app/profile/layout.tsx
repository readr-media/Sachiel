'use client'
import '@/styles/global.css'

import { useParams, usePathname, useRouter } from 'next/navigation'

import Icon from '@/components/icon'
import LayoutTemplate from '@/components/layout-template'
import { FOLLOW_LIST_PATHS } from '@/constants/page-style'
import { useUser } from '@/context/user'

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
  const params = useParams<{ customId?: string; publisherId?: string }>()
  const { user } = useUser()

  const pageCustomId = (params.customId || params.publisherId) ?? ''
  const isSelf = pageCustomId === user?.customId

  const handleMoreButtonClicked = () => {
    // TODO: deal with the feature
  }

  const goToSettingPage = () => {
    // TODO: update the setting url
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
      navigation={{
        leftButtons: [
          isSelf
            ? { type: 'icon', icon: 'icon-setting', onClick: goToSettingPage }
            : {
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
    >
      {/* TODO: use shared pc navigation component */}
      <div className="hidden bg-white sm:block">
        <div className="flex max-w-[680px] grow items-center justify-between px-5">
          <div className="flex items-center gap-5">
            {!isSelf && (
              <button
                type="button"
                className="p-3 pl-0"
                onClick={backToPreviousPage}
              >
                <Icon
                  iconName="icon-chevron-left"
                  size={{ width: 20, height: 20 }}
                />
              </button>
            )}
            <p className="list-title hidden place-self-center sm:block">
              {pageCustomId}
            </p>
          </div>
          <button
            type="button"
            className="place-self-end self-center p-3"
            // TODO: more function
          >
            <Icon iconName="icon-more-horiz" size={{ width: 24, height: 24 }} />
          </button>
        </div>
      </div>
      {children}
    </LayoutTemplate>
  )
}
