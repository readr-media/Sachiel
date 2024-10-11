import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Icon, { type IconName } from '@/components/icon'
import InteractiveIcon from '@/components/interactive-icon'
import { NON_MOBILE_NAV_ICONS } from '@/constants/layout'
import { isUserLoggedIn, useUser } from '@/context/user'

type IconInfo = {
  icon: {
    default: IconName
    hover: IconName
    on: IconName
  }
  href: string
  text: string
}

const NonMobileNavIcon = ({
  isOn,
  iconInfo,
  avatarUrl,
}: {
  isOn: boolean
  iconInfo: IconInfo
  avatarUrl?: string
}) => {
  const showAvatar = iconInfo.text === '個人檔案' && avatarUrl
  const iconJsx = showAvatar ? (
    <div className="flex size-8 items-center justify-center">
      <Image
        src={avatarUrl}
        width={26}
        height={26}
        alt="user avatar"
        className="rounded-[50%]"
      />
    </div>
  ) : isOn ? (
    <Icon size="xl" iconName={iconInfo.icon.on} />
  ) : (
    <InteractiveIcon size="xl" icon={iconInfo.icon} />
  )
  const textJsx = isOn ? (
    <span className="title-1 block text-primary-700">{iconInfo.text}</span>
  ) : (
    <span className="title-1 block text-primary-600 group-hover:text-primary-700">
      {iconInfo.text}
    </span>
  )

  return (
    <Link
      key={iconInfo.text}
      href={iconInfo.href}
      className="group flex h-14 items-center gap-3 rounded-md pl-2 hover:bg-primary-100"
    >
      {iconJsx}
      {textJsx}
    </Link>
  )
}

const NonMobileNav = ({
  path,
  avatarUrl,
  closeNav,
  shouldShowNav,
  userCustomId,
}: {
  path: string
  avatarUrl: string
  closeNav: () => void
  shouldShowNav: boolean
  userCustomId: string
}) => {
  const { user } = useUser()
  const isLoggedIn = isUserLoggedIn(user)

  return (
    <nav
      className={`z-layout hidden transition-transform sm:fixed sm:inset-y-0 sm:left-0 sm:flex sm:w-[theme(width.articleNav)] sm:justify-end sm:bg-white xl:w-[calc((100vw-theme(width.maxContent))/2+theme(width.articleNav))] ${
        shouldShowNav ? '' : '-translate-x-full'
      }`}
    >
      {/* nested nav bar to maintain the max width for screen width larger than 1440 */}
      <div className="flex grow flex-col justify-between border-r pl-10 pr-5 xl:max-w-[theme(width.articleNav)]">
        {/* top part */}
        <div className="pt-3">
          {/* top first section */}
          <div className="mb-5 flex justify-between">
            <Icon size="2xl" iconName="icon-readr-logo-simple" />
            <button onClick={closeNav}>
              <Icon size="2xl" iconName="icon-modal-close" />
            </button>
          </div>
          <div className="flex flex-col gap-2 border-b pb-5">
            {NON_MOBILE_NAV_ICONS.first.map((iconInfo) => (
              <NonMobileNavIcon
                key={iconInfo.text}
                isOn={path === iconInfo.href}
                iconInfo={iconInfo}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-5">
            {NON_MOBILE_NAV_ICONS.second.map((iconInfo) => {
              if (iconInfo.text === '個人檔案') {
                return (
                  <NonMobileNavIcon
                    key={iconInfo.text}
                    isOn={path.startsWith(iconInfo.href)}
                    iconInfo={{
                      ...iconInfo,
                      href: iconInfo.href + `/member/${userCustomId}`,
                    }}
                    avatarUrl={avatarUrl}
                  />
                )
              } else {
                return (
                  <NonMobileNavIcon
                    key={iconInfo.text}
                    isOn={path.startsWith(iconInfo.href)}
                    iconInfo={iconInfo}
                  />
                )
              }
            })}
          </div>
        </div>
        {/* bottom (third) part */}
        {isLoggedIn && (
          <div className="flex flex-col border-t py-6">
            {/* {NON_MOBILE_NAV_ICONS.third.map((iconInfo) => (
            <NonMobileNavIcon
              key={iconInfo.text}
              isOn={path === iconInfo.href}
              iconInfo={iconInfo}
            />
          ))} */}
            <button className="button text-primary-500">登出</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default function ArticleNav({
  shouldShowNav,
  closeNav,
}: {
  shouldShowNav: boolean
  closeNav: () => void
}) {
  const path = usePathname()
  const { user } = useUser()

  const avatarUrl = user?.avatar ?? ''
  const userCustomId = user.customId

  return (
    <>
      {/* story nav only has desktop nav */}
      <NonMobileNav
        path={path}
        avatarUrl={avatarUrl}
        shouldShowNav={shouldShowNav}
        closeNav={closeNav}
        userCustomId={userCustomId}
      />
    </>
  )
}
