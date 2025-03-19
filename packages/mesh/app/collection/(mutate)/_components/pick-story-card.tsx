'use client'

import { forwardRef } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Icon from '@/components/icon'
import { DisplayTimeFromNow } from '@/components/story-time-display'
import { ImageCategory } from '@/constants/fallback-src'
import { type MongoDBResponse } from '@/utils/data-schema'

import type { CollectionPickStory } from '../_types/collection'
import Checkbox from './checkbox'

export default forwardRef(function PickStoryCard(
  {
    isPicked,
    story,
    onClick,
  }: {
    isPicked: boolean
    story: CollectionPickStory | MongoDBResponse['stories'][number]
    onClick: () => void
  },
  ref
) {
  const storyTitle =
    ('title' in story && story?.title) ||
    ('og_title' in story && story?.og_title) ||
    ''
  const sourceTitle =
    ('source' in story && story?.source?.title) ||
    ('publisher' in story && story?.publisher?.title) ||
    ''
  return (
    <div
      className="flex w-full cursor-pointer gap-2 pt-5"
      onClick={onClick}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="flex size-12 items-center justify-center sm:h-14">
        <Checkbox isChecked={isPicked} />
      </div>
      <div className="flex grow flex-col gap-2 border-b pb-4 sm:pb-5">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="subtitle-1 sm:title-2 line-clamp-2 text-primary-700">
              {storyTitle}
            </div>
            <div className="caption-1 hidden gap-1 text-primary-500 sm:flex">
              <span>{sourceTitle}</span>
              <Icon iconName="icon-dot" size="s" />
              <span>
                {story?.published_date && (
                  <DisplayTimeFromNow date={story.published_date} />
                )}
              </span>
            </div>
          </div>
          <div className="relative aspect-[2/1] w-24 shrink-0 overflow-hidden rounded-[4px] sm:w-[160px]">
            <ImageWithFallback
              src={story?.og_image ?? ''}
              fallbackCategory={ImageCategory.STORY}
              alt={sourceTitle}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        <div className="caption-1 flex gap-1 text-primary-500 sm:hidden">
          <span>{sourceTitle}</span>
          <Icon iconName="icon-dot" size="s" />
          <span>
            {story?.published_date && (
              <DisplayTimeFromNow date={story.published_date} />
            )}
          </span>
        </div>
      </div>
    </div>
  )
})
