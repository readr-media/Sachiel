import NextLink from 'next/link'
import { useState } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import { type AllPublisherData } from '@/app/actions/publisher'
import Button from '@/components/button'
import FollowPublisherButton from '@/components/follow-publisher-button'
import Icon from '@/components/icon'
import { ImageCategory } from '@/constants/fallback-src'
import { DAY } from '@/constants/time-unit'

export default function PublisherSuggestion({
  publisherSuggestion,
}: {
  publisherSuggestion: AllPublisherData
}) {
  const [followSuggestions, setFollowSuggestions] =
    useState(publisherSuggestion)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggleSuggestionVisibility = (id: string, isHidden: boolean) => {
    setFollowSuggestions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isHidden } : item))
    )
  }

  return (
    <div className="flex flex-col gap-3 py-4 lg:rounded-lg lg:bg-primary-100 lg:px-5 lg:py-3">
      <div className="flex flex-row justify-between px-5 md:px-[70px] lg:px-3 lg:pt-3">
        <p className="list-title text-primary-700">推薦追蹤</p>
        <NextLink href={'/publisher-list'}>
          <span className="button text-primary-500">查看全部</span>
        </NextLink>
      </div>
      {/* mobile */}
      <div className="pl-5 md:px-[70px] lg:hidden">
        <div className="flex flex-row gap-3 overflow-x-scroll">
          {followSuggestions.map((publisher) => {
            const {
              logo,
              title,
              createdAt,
              followerCount,
              id,
              customId,
              isHidden,
            } = publisher
            const publisherName = isHidden ? '已隱藏' : title
            const publisherStatus = isHidden
              ? '您不會再收到此推薦'
              : createdAt > Date.now() - 30 * DAY
              ? `新加入`
              : `${followerCount}人追蹤`

            return (
              <div
                className="h-[192px] w-[150px] shrink-0 rounded-md border border-primary-200 px-3 pb-4 pt-3"
                key={id}
              >
                <div className="relative flex items-center justify-center pb-3">
                  {isHidden ? (
                    <Icon
                      iconName="icon-hide-publisher"
                      size={{ width: 60, height: 60 }}
                    />
                  ) : (
                    <div className="size-15 overflow-hidden rounded-lg border-[0.5px] border-primary-200">
                      <ImageWithFallback
                        src={logo ?? ''}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover' }}
                        alt={title ?? ''}
                        fallbackCategory={ImageCategory.PUBLISHER}
                      />
                    </div>
                  )}
                  <button
                    className="absolute right-0 top-0"
                    onClick={() => toggleSuggestionVisibility(id, true)}
                    onMouseEnter={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Icon
                      iconName={
                        id === hoveredId ? 'icon-close' : 'icon-close-400'
                      }
                      size="s"
                    />
                  </button>
                </div>
                <p className="subtitle-2 mb-1 line-clamp-1 h-[18px] overflow-hidden break-words text-center hover-or-active:underline">
                  <NextLink href={`/profile/publisher/${customId}`}>
                    {publisherName}
                  </NextLink>
                </p>
                <p className="caption-1 pb-3 text-center text-primary-500">
                  {publisherStatus}
                </p>
                {isHidden ? (
                  <div className="shrink-0">
                    <Button
                      size="md-large"
                      color="transparent"
                      text="取消"
                      onClick={() => toggleSuggestionVisibility(id, false)}
                    />
                  </div>
                ) : (
                  <FollowPublisherButton
                    size="md-large"
                    publisherId={id}
                    publisherName={title ?? ''}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
      {/* desktop */}
      <div className="hidden lg:flex lg:flex-col">
        {followSuggestions.map((publisher) => {
          const {
            logo,
            title,
            createdAt,
            followerCount,
            id,
            customId,
            isHidden,
          } = publisher

          const publisherName = isHidden ? '已隱藏' : title
          const publisherStatus = isHidden
            ? '您不會再收到此推薦'
            : createdAt > Date.now() - 30 * DAY
            ? `新加入`
            : `${followerCount}人追蹤`

          return (
            <div
              className="flex flex-row items-center border-b py-3 last:border-b-0"
              key={id}
            >
              {isHidden ? (
                <Icon
                  iconName="icon-hide-publisher"
                  size="2xl"
                  className="mr-3 flex items-center justify-center"
                />
              ) : (
                <div className="mr-3 size-11 shrink-0 overflow-hidden rounded-lg border-[0.5px] border-primary-200">
                  <ImageWithFallback
                    src={logo ?? ''}
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover' }}
                    alt={title ?? ''}
                    fallbackCategory={ImageCategory.PUBLISHER}
                  />
                </div>
              )}

              <div className="mr-4 flex grow flex-col gap-[2px]">
                <p className="subtitle-2 line-clamp-1 h-[18px] overflow-hidden break-words hover-or-active:underline">
                  <NextLink href={`/profile/publisher/${customId}`}>
                    {publisherName}
                  </NextLink>
                </p>
                <p className="caption-1 text-primary-500">{publisherStatus}</p>
              </div>
              {isHidden ? (
                <div className="shrink-0">
                  <Button
                    size="md-large"
                    color="transparent"
                    text="取消"
                    onClick={() => toggleSuggestionVisibility(id, false)}
                  />
                </div>
              ) : (
                <FollowPublisherButton
                  size="md-large"
                  publisherId={id}
                  publisherName={title ?? ''}
                />
              )}
              {isHidden ? (
                <button
                  className="invisible ml-1 size-4"
                  aria-hidden="true"
                ></button>
              ) : (
                <button
                  className="ml-1 shrink-0"
                  onClick={() => toggleSuggestionVisibility(id, true)}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Icon
                    iconName={
                      id === hoveredId ? 'icon-close' : 'icon-close-400'
                    }
                    size="s"
                  />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
