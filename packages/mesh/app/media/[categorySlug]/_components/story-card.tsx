import Image from 'next/image'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import { getDisplayPicks } from '@/utils/story-display'

import { type Story } from '../page'

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
    followingMemberIds,
  }: {
    story: Story
    className?: string
    followingMemberIds: Set<string>
  },
  ref
) {
  const displayPicks = getDisplayPicks(story.picks, followingMemberIds)

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
          <h4 className="caption-1 line-clamp-1 text-primary-500">
            {story.source?.title}
          </h4>
          <button>...</button>
        </div>
        <div className="mt-1 flex flex-row justify-between gap-3 sm:gap-10">
          <div>
            <h2 className={`subtitle-1 text-primary-700 sm:hidden`}>
              {story.title ?? ''}
            </h2>
            <h2 className={`title-2 hidden text-primary-700 sm:block`}>
              {story.title ?? ''}
            </h2>
            <StoryMetaWrapper story={story} className="hidden sm:block" />
          </div>
          {story.og_image && (
            <div className="relative h-[48px] w-[96px] flex-shrink-0  sm:h-[80px] sm:w-[160px]">
              <Image
                className="rounded-[4px] object-cover "
                src={story.og_image}
                alt={story.title ?? ''}
                fill
              />
            </div>
          )}
        </div>
        <StoryMetaWrapper story={story} className="sm:hidden" />
      </div>
      <div className="mt-4 flex h-8 flex-row justify-between">
        <StoryPickInfo
          displayPicks={displayPicks}
          pickCount={story.picksCount ?? 0}
        />
        {/* TODO: add user pick info to check if already picked */}
        <StoryPickButton isStoryPicked={false} storyId={story.id} />
      </div>
    </article>
  )
})
