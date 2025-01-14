'use client'

import Link from 'next/link'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import useUserPayload from '@/hooks/use-user-payload'
import type { GtmTags } from '@/types/homepage'
import { logStoryClick } from '@/utils/event-logs'

import { type Story } from './media-stories'

const StoryMetaWrapper = ({
  story,
  className,
}: {
  story: Story
  className: string
}) => {
  return (
    <div className={twMerge('caption-1 mt-2 sm:mt-1', className)}>
      <StoryMeta
        storyId={story.id}
        commentCount={story.commentCount ?? 0}
        publishDate={story.published_date}
        paywall={story.paywall ?? false}
        fullScreenAd={story.full_screen_ad ?? ''}
      />
    </div>
  )
}

export default forwardRef(function StoryCard(
  {
    story,
    className = '',
    gtmTags,
  }: {
    story: Story
    className?: string
    gtmTags: GtmTags
  },
  ref
) {
  const userPayload = useUserPayload()
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)

  return (
    <article
      className={twMerge(
        'flex flex-col justify-between border-b pb-4 pt-5',
        className
      )}
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div>
        <div className="flex h-6 flex-row items-center justify-between">
          <Link
            href={`/profile/publisher/${story.source?.customId ?? ''}`}
            className="GTM-media_click_media_title"
          >
            <h4 className="caption-1 line-clamp-1 text-primary-500 hover-or-active:text-primary-700">
              {story.source?.title ?? ''}
            </h4>
          </Link>
          <StoryMoreActionButton
            story={story}
            publisherId={story.source?.id ?? ''}
            canUnFollowPublisher={true}
          />
        </div>
        <Link
          href={`/story/${story.id}`}
          className={gtmTags.story}
          onClick={() =>
            logStoryClick(
              userPayload,
              story.id,
              story?.title ?? '',
              story.source?.title ?? '',
              true
            )
          }
        >
          <div className="mt-1 flex flex-row justify-between gap-3 sm:gap-10">
            <div>
              <h2
                className={`subtitle-1 text-primary-700 hover-or-active:underline sm:hidden`}
              >
                {story.title ?? ''}
              </h2>
              <h2
                className={`title-2 hidden text-primary-700 hover-or-active:underline sm:block`}
              >
                {story.title ?? ''}
              </h2>
              <StoryMetaWrapper story={story} className="hidden sm:block" />
            </div>
            {story.og_image && (
              <div className="relative h-[48px] w-[96px] shrink-0  sm:h-[80px] sm:w-[160px]">
                <ImageWithFallback
                  className="rounded-[4px] object-cover "
                  src={story.og_image}
                  alt={story.title ?? ''}
                  fill
                  fallbackCategory={ImageCategory.STORY}
                />
              </div>
            )}
          </div>
        </Link>
        <StoryMetaWrapper story={story} className="sm:hidden" />
      </div>
      <div className="mt-4 flex h-8 flex-row justify-between">
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
