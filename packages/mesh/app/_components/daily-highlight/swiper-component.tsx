'use client'

import NextLink from 'next/link'
import type { RefObject } from 'react'
import { useRef } from 'react'

import StoryMeta from '@/components/story-card/story-meta'
import StoryMoreActionButton from '@/components/story-more-action-button'
import useUserPayload from '@/hooks/use-user-payload'
import type { DailyStory } from '@/types/homepage'
import { logStoryClick } from '@/utils/event-logs'

type Props = {
  stories: DailyStory[]
}

type Story = {
  story: DailyStory
}

function StoryCard({ story }: Story) {
  const scrollContainerRef = useRef<HTMLElement>(null)
  const userPayload = useUserPayload()

  return (
    <div
      key={story.id}
      className="w-[280px] flex-none rounded-md border-[0.5px] border-primary-200 bg-primary-100 px-4 py-3 lg:w-full"
    >
      <div className="mb-1 flex justify-between">
        <NextLink href={`/profile/publisher/${story.source.customId}`}>
          <p className="caption-1 text-primary-500 hover-or-active:text-primary-700">
            {story.source.title}
          </p>
        </NextLink>

        <StoryMoreActionButton
          story={story}
          publisherId={story.source.id}
          nestedScrollContainerRef={scrollContainerRef}
        />
      </div>

      <h3 className="subtitle-2 mb-2 line-clamp-2 text-primary-700 hover-or-active:underline">
        <NextLink
          href={`story/${story.id}`}
          onClick={() =>
            logStoryClick(
              userPayload,
              story.id,
              story.title,
              story.source.title
            )
          }
        >
          {story.title}
        </NextLink>
      </h3>

      <div className="caption-1">
        <StoryMeta
          storyId={story.id}
          commentCount={story.commentCount}
          publishDate={story.published_date}
          paywall={story.paywall}
          fullScreenAd={story.full_screen_ad}
        />
      </div>
    </div>
  )
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
          <StoryCard story={story} key={story.id} />
        ))}
      </div>
    </div>
  )
}
