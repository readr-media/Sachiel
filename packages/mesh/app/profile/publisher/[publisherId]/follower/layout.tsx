'use client'
import { useRouter } from 'next/navigation'

import Icon from '@/components/icon'
import LayoutTemplate from '@/components/layout-template'

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
    >
      {/* TODO: use shared pc navigation component */}
      <div className="hidden h-[60px] border-b bg-white px-2 sm:flex sm:px-5 md:px-[70px] lg:px-10">
        <div className="grid w-maxMain grid-cols-3 items-center sm:flex sm:justify-start">
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
          <p className="list-title place-self-center">{title}</p>
        </div>
      </div>
      {children}
    </LayoutTemplate>
  )
}
