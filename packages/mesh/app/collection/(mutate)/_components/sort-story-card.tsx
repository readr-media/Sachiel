'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { MouseEventHandler } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Icon from '@/components/icon'
import { DisplayTimeFromNow } from '@/components/story-time-display'
import { ImageCategory } from '@/constants/fallback-src'
import { type MongoDBResponse } from '@/utils/data-schema'

import type { CollectionPickStory, UseCollection } from '../_types/collection'

export default function SortStoryCard({
  story,
  useCollection,
}: {
  story: CollectionPickStory | MongoDBResponse['stories'][number]
  useCollection: UseCollection
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: story.id })

  const { setCollectionPickStories } = useCollection()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
  }

  const onStoryDelete: MouseEventHandler<HTMLButtonElement> = () => {
    setCollectionPickStories((stories) =>
      stories.filter((oldStory) => oldStory.id !== story.id)
    )
  }

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
      className="flex w-full cursor-pointer bg-white pt-5"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="mr-2 flex size-12 shrink-0 items-center justify-center sm:h-14">
        <Icon iconName="icon-sort-story" size="l" />
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
              alt={storyTitle}
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
      <button
        className="flex size-12 shrink-0 items-center justify-center sm:h-14"
        onClick={onStoryDelete}
      >
        {/* prevent click event from Icon to simply PointerSensor logic */}
        <Icon
          iconName="icon-delete-story"
          className="pointer-events-none"
          size="l"
        />
      </button>
    </div>
  )
}
