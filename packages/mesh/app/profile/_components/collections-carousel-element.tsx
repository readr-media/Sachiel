import Link from 'next/link'
import React from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import CollectionPickButton from '@/components/collection-card/collection-pick-button'
import Icon from '@/components/icon'
import { ImageCategory } from '@/constants/fallback-src'
import { useEditProfile } from '@/context/edit-profile'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import usePageName from '@/hooks/use-page-name'
import useUserPayload from '@/hooks/use-user-payload'
import type { PickCollections } from '@/types/profile'
import { logClickEvent } from '@/utils/event-logs'

type CollectionsCarouselElementProps = {
  data: NonNullable<PickCollections>[number]
}

const CollectionsCarouselElement = ({
  data,
}: CollectionsCarouselElementProps) => {
  const { t } = useCustomTranslation()
  const { profileData } = useEditProfile()
  const userPayload = useUserPayload()
  const pageName = usePageName()
  if (!data) return <></>
  const { heroImage, title, creator, picksCount, id } = data
  const shouldShowCollectionPickButton = profileData.customId
  return (
    <div className="flex h-full w-[150px] flex-col rounded border bg-white md:w-full">
      <Link
        href={`/collection/${id}`}
        onClick={() =>
          logClickEvent(userPayload, 'click-collection', {
            target: 'collection',
            targetId: id,
            targetTitle: title ?? '',
            source: pageName,
            complementary: {
              publisherTarget: 'member',
              targetId: creator?.id ?? '',
              targetName: creator?.name ?? '',
            },
          })
        }
      >
        <div className="relative aspect-[2] w-full">
          <ImageWithFallback
            alt={`${title}'s cover image`}
            fallbackCategory={ImageCategory.STORY}
            src={heroImage?.resized?.original ?? ''}
            className="inset-0 size-full rounded-t"
            fill
          />
          <div className="absolute right-[6px] top-2 flex items-center rounded-md bg-black/50 px-[6px] py-[2.5px]">
            <Icon iconName="icon-collection-folder" size="s" />
            <span className="caption-2 text-white">
              {t('Pages.Profile.CollectionsCarouselElement-collection', '集錦')}
            </span>
          </div>
        </div>
      </Link>
      <section className="flex h-auto grow flex-col px-3 py-2">
        <Link
          className="flex grow flex-col"
          href={`/collection/${id}`}
          onClick={() =>
            logClickEvent(userPayload, 'click-collection', {
              target: 'collection',
              targetId: id,
              targetTitle: title ?? '',
              source: pageName,
              complementary: {
                publisherTarget: 'member',
                targetId: creator?.id ?? '',
                targetName: creator?.name ?? '',
              },
            })
          }
        >
          <div className="h-full flex-col justify-between">
            <p className="caption-1 text-primary-500">@{creator?.customId}</p>
            <p className="subtitle-2 pb-3 text-primary-700">{title}</p>
          </div>
          <p className="footnote pb-2 text-primary-600">
            <span className="font-medium text-primary-700">{picksCount}</span>
            {t(
              'Pages.Profile.CollectionsCarouselElement-picks-count-detail',
              '人精選'
            )}
          </p>
        </Link>
        {shouldShowCollectionPickButton ? (
          <CollectionPickButton
            collectionId={id}
            collectionTitle={title ?? ''}
          />
        ) : (
          <></>
        )}
      </section>
    </div>
  )
}

export default CollectionsCarouselElement
