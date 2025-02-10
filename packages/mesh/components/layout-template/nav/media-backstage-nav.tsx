'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Icon from '@/components/icon'
import InteractiveIcon from '@/components/interactive-icon'
import { ImageCategory } from '@/constants/fallback-src'
import { MEDIA_BACKSTAGE_NAV_ICONS } from '@/constants/layout'
import { useUser } from '@/context/user'
import useClickOutside from '@/hooks/use-click-outside'
import type { IconInfo as BaseIconInfo } from '@/types/layout'
import type { Media } from '@/types/media-backstage'

type IconInfo = Omit<BaseIconInfo, 'href'> &
  (
    | { hrefFn: (param: string) => string; action?: never }
    | { action: () => void; hrefFn?: never }
  )

export default function MediaBackstageNav({
  publisherCustomId,
}: {
  publisherCustomId: string
}) {
  const path = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 top-[theme(height.header.sm)] z-layout flex justify-end border-r bg-white xl:w-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
      <div className="flex w-[theme(width.nav.xl)] flex-col justify-between px-10">
        <div className="py-10">
          <div className="flex flex-col gap-5">
            <MediaSelector publisherCustomId={publisherCustomId} />
            <div>
              {MEDIA_BACKSTAGE_NAV_ICONS.first.map((iconInfo) => (
                <NavIcon
                  key={iconInfo.text}
                  isOn={path === iconInfo.hrefFn(publisherCustomId)}
                  iconInfo={iconInfo}
                  publisherCustomId={publisherCustomId}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          {MEDIA_BACKSTAGE_NAV_ICONS.second.map((iconInfo) => (
            <NavIcon
              key={iconInfo.text}
              isOn={false}
              iconInfo={iconInfo}
              publisherCustomId={publisherCustomId}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

const MediaSelector = ({
  publisherCustomId,
}: {
  publisherCustomId: string
}) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  useClickOutside(buttonRef, () => {
    closeDropdown()
  })

  const { user } = useUser()

  const mediaList = user.publishers ?? []
  const currentMedia =
    mediaList.find((media) => media.customId === publisherCustomId) ??
    mediaList[0]

  const genMediaLink = (newPublisherCustomId: string) =>
    pathname
      .split('/')
      .map((seg, i) => (i === 2 ? newPublisherCustomId : seg))
      .join('/')

  const isSelectable = mediaList.length > 1

  const onSelectorClicked = () => {
    setShowDropdown(true)
  }

  const closeDropdown = () => {
    setShowDropdown(false)
  }

  return (
    <button
      className={`relative flex h-[68px] items-center justify-between rounded-md border border-primary-200 bg-primary-100 p-3`}
      disabled={!isSelectable}
      onClick={onSelectorClicked}
      ref={buttonRef}
    >
      <div className="flex items-center gap-3">
        <div className="relative size-11 overflow-hidden rounded-lg">
          <ImageWithFallback
            src={currentMedia.logo ?? ''}
            alt={currentMedia.title ?? 'media logo'}
            fill
            className="object-cover"
            fallbackCategory={ImageCategory.PUBLISHER}
          />
        </div>
        <div className="flex flex-col items-start gap-[2px]">
          <span className="subtitle-2 text-primary-700">
            {currentMedia.title}
          </span>
          <span className="footnote text-primary-500">
            {currentMedia.customId}
          </span>
        </div>
      </div>
      <div>
        {showDropdown ? (
          <Icon iconName="icon-expand-media" size="l" />
        ) : (
          <Icon iconName="icon-fold-media" size="l" />
        )}
      </div>
      {showDropdown && (
        <MediaDropdown
          mediaList={mediaList}
          currentMedia={currentMedia}
          onClick={(media) => {
            router.push(genMediaLink(media.customId ?? ''))
            closeDropdown()
          }}
        />
      )}
    </button>
  )
}

const MediaDropdown = ({
  currentMedia,
  mediaList,
  onClick,
}: {
  currentMedia: Media
  mediaList: Media[]
  onClick: (media: Media) => void
}) => {
  return (
    <ul
      className="absolute inset-x-0 top-[72px] overflow-hidden rounded-md shadow-light-box"
      onClick={(evt) => {
        evt.stopPropagation()
      }}
    >
      {mediaList.map((media) => {
        return (
          <MediaDropdownItem
            key={media.customId}
            isActive={media.customId === currentMedia.customId}
            onClick={() => {
              onClick(media)
            }}
            media={media}
          />
        )
      })}
    </ul>
  )
}

const MediaDropdownItem = ({
  isActive,
  media,
  onClick,
}: {
  isActive: boolean
  media: Media
  onClick: () => void
}) => {
  return (
    <li
      className={`h-[68px] border-b bg-white p-1 last-of-type:border-0`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between rounded-md p-2 hover:bg-primary-100">
        <div className="flex items-center gap-3">
          <div className="relative size-11 overflow-hidden rounded-lg">
            <ImageWithFallback
              src={media.logo ?? ''}
              alt={media.title ?? 'media logo'}
              fill
              className="object-cover"
              fallbackCategory={ImageCategory.PUBLISHER}
            />
          </div>
          <div className="flex flex-col items-start gap-[2px]">
            <span className="subtitle-2 text-primary-700">{media.title}</span>
            <span className="footnote text-primary-500">{media.customId}</span>
          </div>
        </div>
        <div>{isActive && <Icon iconName="icon-check" size="l" />}</div>
      </div>
    </li>
  )
}

const NavIcon = ({
  isOn,
  iconInfo,
  publisherCustomId,
}: {
  isOn: boolean
  iconInfo: IconInfo
  publisherCustomId: string
}) => {
  const iconJsx = isOn ? (
    <Icon size="xl" iconName={iconInfo.icon.on} />
  ) : (
    <InteractiveIcon size="xl" icon={iconInfo.icon} />
  )

  const textJsx = isOn ? (
    <span className="title-1 blocktext-primary-700">{iconInfo.text}</span>
  ) : (
    <span className="title-1 block text-primary-600 group-hover:text-primary-700">
      {iconInfo.text}
    </span>
  )

  if (iconInfo.hrefFn) {
    return (
      <Link
        key={iconInfo.text}
        href={iconInfo.hrefFn(publisherCustomId)}
        className="group flex h-14 items-center gap-3 rounded-md pl-2 hover:bg-primary-100"
      >
        {iconJsx}
        {textJsx}
      </Link>
    )
  }

  return (
    <button
      key={iconInfo.text}
      onClick={iconInfo.action}
      className="group flex h-14 w-full items-center gap-3 rounded-md pl-2 hover:bg-primary-100"
    >
      {iconJsx}
      {textJsx}
    </button>
  )
}
