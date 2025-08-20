'use client'

import NextLink from 'next/link'
import { useParams } from 'next/navigation'

import ImageWithFallback from '@/app/[lng]/_components/image-with-fallback'
import { type AllPublisherData } from '@/app/actions/publisher'
import { useT } from '@/app/i18n/client'
import FollowPublisherButton from '@/components/follow-publisher-button'
import { ImageCategory } from '@/constants/fallback-src'
import { DAY } from '@/constants/time-unit'

export default function PublisherList({
  publishers,
}: {
  publishers: AllPublisherData
}) {
  const { t } = useT('pages/publisher-list')
  const { lng } = useParams()

  return (
    <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 sm:px-5 sm:py-8 md:px-[70px] lg:grid-cols-5 lg:px-10">
      {publishers.map((publisher) => {
        const {
          id,
          customId,
          logo,
          title: publisherName,
          createdAt,
          followerCount,
        } = publisher

        const publisherStatus =
          createdAt > Date.now() - 30 * DAY
            ? t('status.new', '新加入')
            : t('status.followers', '{{count}}人追蹤', { count: followerCount })
        return (
          <div
            key={id}
            className="flex flex-col items-center justify-center rounded-md border border-r-primary-200 bg-white px-3 pb-4 pt-3 sm:drop-shadow"
          >
            <div className="mb-3 size-15 overflow-hidden rounded-lg border-[0.5px] border-primary-200">
              <ImageWithFallback
                src={logo ?? ''}
                width={60}
                height={60}
                style={{ objectFit: 'cover' }}
                alt={publisherName ?? ''}
                fallbackCategory={ImageCategory.PUBLISHER}
              />
            </div>
            <p className="subtitle-2 mb-1 line-clamp-1 h-[18px] overflow-hidden break-words text-center hover-or-active:underline">
              <NextLink href={`/${lng}/profile/publisher/${customId}`}>
                {publisherName}
              </NextLink>
            </p>
            <p className="caption-1 pb-3 text-primary-500">{publisherStatus}</p>
            <div className="w-full">
              <FollowPublisherButton
                size="md-large"
                publisherId={id}
                publisherName={publisherName ?? ''}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
