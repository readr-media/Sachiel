'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon, { IconName } from '@/components/icon'
import InteractiveIcon from '@/components/interactive-icon'

type IconInfo = {
  icon: {
    default: IconName
    hover: IconName
    on: IconName
  }
  href: string
  text: string
}

const NonMobileNavIcons = {
  first: [
    {
      icon: {
        default: 'icon-popular-lg',
        hover: 'icon-popular-lg-hover',
        on: 'icon-popular-lg-on',
      },
      href: '/popular',
      text: '熱門',
    },
    {
      icon: {
        default: 'icon-social-lg',
        hover: 'icon-social-lg-hover',
        on: 'icon-social-lg-on',
      },
      href: '/social',
      text: '社群',
    },
    {
      icon: {
        default: 'icon-latest-lg',
        hover: 'icon-latest-lg-hover',
        on: 'icon-latest-lg-on',
      },
      href: '/latest',
      text: '最新',
    },
  ],
  second: [
    {
      icon: {
        default: 'icon-profile-lg',
        hover: 'icon-profile-lg-hover',
        on: 'icon-profile-lg-on',
      },
      href: '/profile',
      text: '個人檔案',
    },
    {
      icon: {
        default: 'icon-wallet-lg',
        hover: 'icon-wallet-lg-hover',
        on: 'icon-wallet-lg-on',
      },
      href: '/wallet',
      text: '錢包',
    },
    {
      icon: {
        default: 'icon-bookmark-lg',
        hover: 'icon-bookmark-lg-hover',
        on: 'icon-bookmark-lg-on',
      },
      href: '/bookmark',
      text: '書籤',
    },
  ],
  third: [
    {
      icon: {
        default: 'icon-setting-lg',
        hover: 'icon-setting-lg-hover',
        on: 'icon-setting-lg-on',
      },
      href: '/setting',
      text: '設定',
    },
  ],
} as const

const NonMobileNavIcon = ({
  isOn,
  iconInfo,
}: {
  isOn: boolean
  iconInfo: IconInfo
}) => {
  return (
    <Link
      key={iconInfo.text}
      href={iconInfo.href}
      className="group flex rounded-md md:h-14 md:items-center md:gap-3 md:pl-2 md:hover:bg-primary-100"
    >
      {isOn ? (
        <>
          <div className="flex h-8 w-8 items-center justify-center">
            <Icon size="xl" iconName={iconInfo.icon.on} />
          </div>
          <span className="title-1 hidden md:block md:text-primary-700">
            {iconInfo.text}
          </span>
        </>
      ) : (
        <>
          <div className="flex h-8 w-8 items-center justify-center">
            <InteractiveIcon size="xl" icon={iconInfo.icon} />
          </div>
          <span className="title-1 hidden group-hover:text-primary-700 md:block md:text-primary-600">
            {iconInfo.text}
          </span>
        </>
      )}
    </Link>
  )
}

const NonMobileNav = ({ path }: { path: string }) => {
  return (
    <nav className="hidden sm:fixed sm:bottom-0 sm:left-0 sm:top-[theme(height.header.sm)] sm:flex sm:w-[theme(width.nav.sm)] sm:justify-end sm:bg-white md:w-[theme(width.nav.md)] xl:w-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))] ">
      {/* nested nav bar to maintain the max width for screen width larger than 1440 */}
      <div className="flex grow flex-col justify-between border-r sm:px-12 md:px-10 xl:max-w-[theme(width.nav.xl)]">
        {/* top part */}
        <div className="py-10">
          {/* top first section */}
          <div className="flex flex-col border-b sm:gap-8 sm:pb-8 md:gap-2 md:pb-5">
            {NonMobileNavIcons.first.map((iconInfo) => (
              <NonMobileNavIcon
                key={iconInfo.text}
                isOn={path === iconInfo.href}
                iconInfo={iconInfo}
              />
            ))}
          </div>
          <div className="flex flex-col sm:gap-8 sm:pt-8 md:gap-2 md:pt-5">
            {NonMobileNavIcons.second.map((iconInfo) => (
              <NonMobileNavIcon
                key={iconInfo.text}
                isOn={path === iconInfo.href}
                iconInfo={iconInfo}
              />
            ))}
          </div>
        </div>
        {/* bottom (third) part */}
        <div className="flex flex-col border-t py-6">
          {NonMobileNavIcons.third.map((iconInfo) => (
            <NonMobileNavIcon
              key={iconInfo.text}
              isOn={path === iconInfo.href}
              iconInfo={iconInfo}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

const MobileNavIcons = [
  {
    icon: {
      default: 'icon-popular',
      hover: 'icon-popular-hover',
      on: 'icon-popular-on',
    },
    href: '/popular',
    text: '熱門',
  },
  {
    icon: {
      default: 'icon-social',
      hover: 'icon-social-hover',
      on: 'icon-social-on',
    },
    href: '/social',
    text: '社群',
  },
  {
    icon: {
      default: 'icon-latest',
      hover: 'icon-latest-hover',
      on: 'icon-latest-on',
    },
    href: '/latest',
    text: '最新',
  },
  {
    icon: {
      default: 'icon-wallet',
      hover: 'icon-wallet-hover',
      on: 'icon-wallet-on',
    },
    href: '/wallet',
    text: '錢包',
  },
  {
    icon: {
      default: 'icon-profile',
      hover: 'icon-profile-hover',
      on: 'icon-profile-on',
    },
    href: '/profile',
    text: '個人檔案',
  },
] as const

const MobileNavIcon = ({
  isOn,
  iconInfo,
}: {
  isOn: boolean
  iconInfo: IconInfo
}) => {
  return (
    <Link
      key={iconInfo.icon.default}
      href={iconInfo.href}
      className="group flex h-full flex-grow flex-col items-center justify-center"
    >
      {isOn ? (
        <>
          <Icon size="l" iconName={iconInfo.icon.on} />
          <span className="caption-1 text-primary-700">{iconInfo.text}</span>
        </>
      ) : (
        <>
          <InteractiveIcon icon={iconInfo.icon} size="l" />
          <span className="caption-1 text-primary-600 group-hover:text-primary-700">
            {iconInfo.text}
          </span>
        </>
      )}
    </Link>
  )
}

const MobileNav = ({ path }: { path: string }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[theme(height.nav.default)] border-t bg-white sm:hidden">
      <div className="flex h-full items-center">
        {MobileNavIcons.map((iconInfo) => (
          <MobileNavIcon
            key={iconInfo.icon.default}
            isOn={path === iconInfo.href}
            iconInfo={iconInfo}
          />
        ))}
      </div>
    </nav>
  )
}

export default function Nav() {
  const path = usePathname()

  return (
    <>
      {/* fixed left nav shown on tablet, desktop size */}
      <NonMobileNav path={path} />
      {/* fixed bottom nav bar shown on mobile only */}
      <MobileNav path={path} />
    </>
  )
}
