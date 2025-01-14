'use client'

import NextLink from 'next/link'
import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'

import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import useUserPayload from '@/hooks/use-user-payload'
import type { CategoryStory, DailyStory, GtmTags } from '@/types/homepage'
import { logStoryClick } from '@/utils/event-logs'

import ImageWithFallback from './image-with-fallback'

type Props<T> = {
  story: T
  className?: string
  gtmTags: GtmTags
}

export default forwardRef(function StoryCard<
  T extends CategoryStory | DailyStory
>({ story, className = '', gtmTags }: Props<T>, ref: ForwardedRef<unknown>) {
  const userPayload = useUserPayload()
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)

  return (
    <article
      className={`pb-4 shadow-[0_0.5px_0_0_rgba(0,9,40,0.1)] last:shadow-none ${className}`}
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="mb-1 flex justify-between">
        <NextLink href={`/profile/publisher/${story.source.customId}`}>
          <p className="caption-1 text-primary-500 hover-or-active:text-primary-700">
            {story.source.title}
          </p>
        </NextLink>
        <StoryMoreActionButton story={story} publisherId={story.source.id} />
      </div>

      <div className="flex justify-between gap-x-3 sm:gap-x-10">
        <div>
          <p className="subtitle-1 sm:title-2 mb-2 line-clamp-2 grow text-primary-700 hover-or-active:underline sm:mb-1">
            <NextLink
              href={`/story/${story.id}`}
              className={gtmTags.story}
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
          </p>
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

        <NextLink
          href={`/story/${story.id}`}
          className={gtmTags.story}
          onClick={() =>
            logStoryClick(
              userPayload,
              story.id,
              story.title,
              story.source.title
            )
          }
        >
          <div className="relative h-[48px] w-[96px] shrink-0 overflow-hidden rounded sm:h-[80px] sm:w-[160px]">
            <ImageWithFallback
              src={story.og_image}
              alt={story.title}
              fill
              className="object-cover"
              fallbackCategory={ImageCategory.STORY}
            />
          </div>
        </NextLink>
      </div>

      <div className="mt-4 flex justify-between">
        <ObjectivePickInfo
          displayPicks={displayPicks}
          pickCount={displayPicksCount}
          objectiveId={story.id}
        />
        <StoryPickButton storyId={story.id} gtmClassName={gtmTags.pick} />
      </div>
    </article>
  )
})
