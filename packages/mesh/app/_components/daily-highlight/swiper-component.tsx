'use client'

import NextLink from 'next/link'
import type { RefObject } from 'react'
import { useRef } from 'react'

import StoryMeta from '@/components/story-card/story-meta'
import StoryMoreActionButton from '@/components/story-more-action-button'
import type { DailyStory } from '@/types/homepage'

type Props = {
  stories: DailyStory[]
}

export default function SwiperComponent({ stories }: Props) {
  const scrollContainerRef = useRef<HTMLElement>(null)

  return (
    <div className="overflow-hidden">
      <div
        ref={scrollContainerRef as RefObject<HTMLDivElement>}
        className="no-scrollbar flex gap-x-2 overflow-x-auto lg:grid lg:grid-cols-3"
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="w-[280px] flex-none rounded-md border-[0.5px] border-primary-200 bg-primary-100 px-4 py-3 lg:w-full"
          >
            <div className="mb-1 flex justify-between">
              <NextLink href={`/profile/member/${story.source.customId}`}>
                <p className="caption-1 text-primary-500">
                  {story.source.title}
                </p>
              </NextLink>

              <StoryMoreActionButton
                storyId={story.id}
                publisherId={story.source.id}
                showOnRestrictArea={true}
                nestedScrollContainerRef={scrollContainerRef}
              />
            </div>

            <h3 className="subtitle-2 mb-2 line-clamp-2 text-primary-700">
              <NextLink href={`story/${story.id}`}> {story.title}</NextLink>
            </h3>

            <div className="caption-1">
              <StoryMeta
                commentCount={story.commentCount}
                publishDate={story.published_date}
                paywall={story.paywall}
                fullScreenAd={story.full_screen_ad}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
