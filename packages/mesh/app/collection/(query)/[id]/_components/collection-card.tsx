'use client'

import Link from 'next/link'
import { type RefObject, useEffect } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import CollectionPickButton from '@/components/collection-card/collection-pick-button'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import Icon from '@/components/icon'
import { ImageCategory } from '@/constants/fallback-src'
import { useComment } from '@/context/comment'
import useClamp from '@/hooks/use-clamp'
import { useDisplayCommentCount } from '@/hooks/use-display-commentcount'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import { PickObjective } from '@/types/objective'

import type { Collection } from '../../_types/collection'
import CollectionMeta from './collection-meta'
export default function CollectionCard({
  collection,
}: {
  collection: Collection
}) {
  const { isTooLong, isExpanded, domRef, toggleClamp } = useClamp()
  const { displayPicks, displayPicksCount } = useDisplayPicks(
    collection,
    PickObjective.Collection
  )
  const { state: comment } = useComment()
  const { displayCommentCount, setDisplayCommentCount } =
    useDisplayCommentCount({
      objectiveId: collection.id,
      initialCount: comment.commentsCount,
    })

  useEffect(() => {
    setDisplayCommentCount(Math.max(comment.commentsCount, displayCommentCount))
  }, [comment.commentsCount, displayCommentCount, setDisplayCommentCount])

  return (
    <section className="border-b-[0.5px] border-primary-200 bg-white">
      <div className="max-w-[theme(width.maxMain)] pb-5 sm:px-5 md:px-[70px] lg:px-10 xl:px-10">
        <div className="mx-auto flex flex-col lg:grid lg:max-w-[unset] lg:grid-cols-[640px_1fr] lg:gap-10 xl:grid-cols-[600px_1fr]">
          <div className="relative aspect-[2/1] w-full overflow-hidden sm:rounded-md lg:order-2">
            <ImageWithFallback
              fallbackCategory={ImageCategory.STORY}
              src={collection.heroImage?.resized?.original ?? ''}
              alt={collection.title ?? '集錦圖'}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
            <div className="absolute right-3 top-2 hidden items-center rounded-md bg-black/50 px-1 py-[2px] sm:flex">
              <Icon iconName="icon-collection-folder" size="m" />
              <span className="caption-1 text-white">集錦</span>
            </div>
          </div>
          <div className="mt-3 flex flex-col px-5 sm:px-0 lg:order-1 lg:mt-0 lg:w-[640px] lg:shrink-0 xl:w-articleMain">
            <div className="h-6">
              <Link
                href={`/profile/member/${collection.creator?.customId ?? ''}`}
              >
                <h4 className="body-3 h-5 text-primary-500 hover-or-active:text-primary-700 lg:h-auto">
                  @{collection.creator?.customId ?? ''}
                </h4>
              </Link>
            </div>
            <div className="hero-title mt-1 text-primary-700">
              {collection.title ?? ''}
            </div>
            <div
              className={`body-3 relative mt-3 select-none text-primary-600 ${
                isTooLong ? 'cursor-pointer' : ''
              } ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'}`}
              ref={domRef as RefObject<HTMLDivElement>}
              onClick={toggleClamp}
            >
              <span
                className={`absolute bottom-0 right-0 bg-gradient-to-r from-transparent from-0% to-white to-25% pl-6 text-primary-400 ${
                  isTooLong && !isExpanded ? '' : 'hidden'
                }`}
              >
                ...展開更多
              </span>
              {collection.summary ?? ''}
            </div>
            <div className="footnote mt-3">
              <CollectionMeta
                collectionId={collection.id}
                commentCount={collection.commentsCount ?? 0}
                updateAt={collection.updatedAt}
              />
            </div>
            <div className="mt-4 flex h-8 flex-row justify-between">
              <ObjectivePickInfo
                displayPicks={displayPicks}
                pickCount={displayPicksCount}
                showCommentCount={true}
                commentCount={displayCommentCount}
                objectiveId={collection.id}
                pickObjective={PickObjective.Collection}
              />
              <CollectionPickButton collectionId={collection.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
