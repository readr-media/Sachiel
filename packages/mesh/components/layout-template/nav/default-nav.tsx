import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import Icon from '@/components/icon'
import InteractiveIcon from '@/components/interactive-icon'
import Avatar from '@/components/story-card/avatar'
import { MOBILE_NAV_ICONS, NON_MOBILE_NAV_ICONS } from '@/constants/layout'
import { isUserLoggedIn, useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { TabCategory } from '@/types/profile'
import { matchPath } from '@/utils/nav-button'

type IconInfo = typeof NON_MOBILE_NAV_ICONS[
  | 'first'
  | 'second'
  | 'third'][number]

type MobileIconInfo = typeof MOBILE_NAV_ICONS[number]

export default function DefaultNav({ className = '' }: { className?: string }) {
  const path = usePathname()
  const { user } = useUser()

  const avatarUrl = user.avatar
  const userCustomId = user.customId

  return (
    <div className={className}>
      {/* fixed left nav shown on tablet, desktop size */}
      <NonMobileNav
        path={path}
        avatarUrl={avatarUrl}
        userCustomId={userCustomId}
      />
      {/* fixed bottom nav bar shown on mobile only */}
      <MobileNav
        path={path}
        avatarUrl={avatarUrl}
        userCustomId={userCustomId}
      />
    </div>
  )
}

const NonMobileNav = ({
  path,
  avatarUrl,
  userCustomId,
}: {
  path: string
  avatarUrl: string
  userCustomId: string
}) => {
  const { user } = useUser()
  const isLoggedIn = isUserLoggedIn(user)
  const searchParams = useSearchParams()
  return (
    <nav className="hidden sm:fixed sm:bottom-0 sm:left-0 sm:top-[theme(height.header.sm)] sm:flex sm:w-[theme(width.nav.sm)] sm:justify-end sm:bg-white md:w-[theme(width.nav.md)] xl:w-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
      {/* nested nav bar to maintain the max width for screen width larger than 1440 */}
      <div className="flex grow flex-col justify-between border-r sm:px-12 md:px-10 xl:max-w-[theme(width.nav.xl)]">
        {/* top part */}
        <div className="py-10">
          {/* top first section */}
          <div className="flex flex-col border-b sm:gap-8 sm:pb-8 md:gap-2 md:pb-5">
            {NON_MOBILE_NAV_ICONS.first.map((iconInfo) => (
              <NonMobileNavIcon
                key={iconInfo.key}
                isOn={matchPath(iconInfo.href, path)}
                iconInfo={iconInfo}
              />
            ))}
          </div>
          <div className="flex flex-col sm:gap-8 sm:pt-8 md:gap-2 md:pt-5">
            {NON_MOBILE_NAV_ICONS.second.map((iconInfo) => {
              if (iconInfo.key === 'profile') {
                return (
                  <NonMobileNavIcon
                    key={iconInfo.key}
                    isOn={
                      matchPath(iconInfo.href, path) &&
                      searchParams.get('tab') === TabCategory.PICKS
                    }
                    iconInfo={iconInfo}
                    href={
                      userCustomId
                        ? iconInfo.href +
                          `/member/${userCustomId}?tab=${TabCategory.PICKS}`
                        : '/login'
                    }
                    avatarUrl={avatarUrl}
                  />
                )
              } else if (iconInfo.key === 'bookmark') {
                return (
                  <NonMobileNavIcon
                    key={iconInfo.key}
                    isOn={
                      matchPath(iconInfo.href, path) &&
                      searchParams.get('tab') === TabCategory.BOOKMARKS
                    }
                    iconInfo={iconInfo}
                    href={
                      iconInfo.href +
                      `/member/${userCustomId}?tab=${TabCategory.BOOKMARKS}`
                    }
                    avatarUrl={avatarUrl}
                  />
                )
              } else {
                return (
                  <NonMobileNavIcon
                    key={iconInfo.key}
                    isOn={matchPath(iconInfo.href, path)}
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
            {NON_MOBILE_NAV_ICONS.third.map((iconInfo) => (
              <NonMobileNavIcon
                key={iconInfo.text}
                isOn={matchPath(iconInfo.href, path)}
                iconInfo={iconInfo}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

const NonMobileNavIcon = ({
  isOn,
  iconInfo,
  href,
  avatarUrl,
}: {
  isOn: boolean
  iconInfo: IconInfo
  href?: string
  avatarUrl?: string
}) => {
  const { t } = useCustomTranslation()
  const showAvatar = iconInfo.key === 'profile' && avatarUrl
  const iconJsx = showAvatar ? (
    <div className="flex size-8 items-center justify-center">
      <Avatar src={avatarUrl} size="s" />
    </div>
  ) : isOn ? (
    <Icon size="xl" iconName={iconInfo.icon.on} />
  ) : (
    <InteractiveIcon size="xl" icon={iconInfo.icon} />
  )
  const textJsx = isOn ? (
    <span className="title-1 hidden md:block md:text-primary-700">
      {t(`Others.navs.${iconInfo.key}`, iconInfo.text)}
    </span>
  ) : (
    <span className="title-1 hidden group-hover:text-primary-700 md:block md:text-primary-600">
      {t(`Others.navs.${iconInfo.key}`, iconInfo.text)}
    </span>
  )

  return (
    <Link
      key={iconInfo.text}
      href={href ?? iconInfo.href}
      className={`GTM-nav_click_${iconInfo.gtmName} group flex rounded-md md:h-14 md:items-center md:gap-3 md:pl-2 md:hover:bg-primary-100`}
    >
      {iconJsx}
      {textJsx}
    </Link>
  )
}

const MobileNav = ({
  path,
  avatarUrl,
  userCustomId,
}: {
  path: string
  avatarUrl: string
  userCustomId: string
}) => {
  const searchParams = useSearchParams()
  return (
    <nav className="fixed inset-x-0 bottom-0 z-layout h-[theme(height.nav.default)] border-t bg-white sm:hidden">
      <div className="flex h-full items-center">
        {MOBILE_NAV_ICONS.map((iconInfo) => {
          if (iconInfo.key === 'profile') {
            return (
              <MobileNavIcon
                key={iconInfo.icon.default}
                isOn={
                  matchPath(iconInfo.href, path) &&
                  searchParams.get('tab') === TabCategory.PICKS
                }
                iconInfo={iconInfo}
                href={
                  iconInfo.href +
                  `/member/${userCustomId}?tab=${TabCategory.PICKS}`
                }
                avatarUrl={avatarUrl}
              />
            )
          } else {
            return (
              <MobileNavIcon
                key={iconInfo.icon.default}
                isOn={matchPath(iconInfo.href, path)}
                iconInfo={iconInfo}
              />
            )
          }
        })}
      </div>
    </nav>
  )
}

const MobileNavIcon = ({
  isOn,
  iconInfo,
  href,
  avatarUrl,
}: {
  isOn: boolean
  iconInfo: MobileIconInfo
  href?: string
  avatarUrl?: string
}) => {
  const { t } = useCustomTranslation()
  const showAvatar = iconInfo.key === 'profile' && avatarUrl
  const iconJsx = showAvatar ? (
    <div className="flex size-6 items-center justify-center">
      <Image
        src={avatarUrl}
        width={20}
        height={20}
        alt="user avatar"
        className="min-h-full rounded-[50%] object-cover"
      />
    </div>
  ) : isOn ? (
    <Icon size="l" iconName={iconInfo.icon.on} />
  ) : (
    <InteractiveIcon icon={iconInfo.icon} size="l" />
  )
  const textJsx = isOn ? (
    <span className="caption-1 text-primary-700">
      {t(`Others.navs.${iconInfo.key}`, iconInfo.text)}
    </span>
  ) : (
    <span className="caption-1 text-primary-600">
      {t(`Others.navs.${iconInfo.key}`, iconInfo.text)}
    </span>
  )

  return (
    <Link
      key={iconInfo.icon.default}
      href={href ?? iconInfo.href}
      className={`GTM-nav_click_${iconInfo.gtmName} flex h-full flex-1 flex-col items-center justify-center`}
    >
      {iconJsx}
      {textJsx}
    </Link>
  )
}
