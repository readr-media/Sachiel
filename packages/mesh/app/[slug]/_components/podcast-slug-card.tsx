'use client'

import Link from 'next/link'
import { forwardRef } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import { type DailyStory } from '@/types/homepage'

type DailyStoryPodcast = DailyStory & {
  story_type: 'podcast'
}

export default forwardRef(function PodcastSlugCard(
  {
    data,
  }: {
    data: DailyStory | DailyStoryPodcast
  },
  ref: React.Ref<HTMLDivElement>
) {
  const { displayPicks, displayPicksCount } = useDisplayPicks(data)

  return (
    <div ref={ref}>
      <div className="grow md:py-4 lg:py-3">
        <div className="flex h-6 flex-row items-center justify-between">
          <h4 className="caption-1 line-clamp-1 text-primary-500">
            {data.source.title}
          </h4>
          <StoryMoreActionButton
            story={data}
            publisherId={data.source.id}
            canUnFollowPublisher={true}
          />
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div className="flex flex-col gap-2">
            <Link href={`/story/${data.id}`}>
              <h2 className="subtitle-1 line-clamp-2 break-words hover-or-active:underline">
                {data.title}
              </h2>
            </Link>
            <div className="caption-1">
              <StoryMeta
                storyId={data.id}
                storyType={'story_type' in data ? data.story_type : 'story'}
                publishDate={data.published_date}
                commentCount={data.commentCount}
                fullScreenAd={data.full_screen_ad}
                paywall={data.paywall}
              />
            </div>
          </div>
          <figure className="relative size-12 shrink-0 sm:size-20">
            <ImageWithFallback
              className="rounded-[4px] object-cover "
              src={data.og_image}
              alt={data.title}
              fill
              sizes="(max-width: 768px) 48px, 80px"
              fallbackCategory={ImageCategory.PODCAST}
            />
          </figure>
        </div>
        <div className="mt-4 flex h-8 flex-row justify-between">
          <ObjectivePickInfo
            displayPicks={displayPicks}
            pickCount={displayPicksCount}
            objectiveId={data.id}
          />
          <StoryPickButton storyId={data.id} storyTitle={data.title} />
        </div>
      </div>
    </div>
  )
})
