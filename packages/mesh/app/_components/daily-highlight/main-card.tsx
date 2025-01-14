'use client'

import NextLink from 'next/link'

import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import useUserPayload from '@/hooks/use-user-payload'
import type { DailyStory, GtmTags } from '@/types/homepage'
import { logStoryClick } from '@/utils/event-logs'

import ImageWithFallback from '../image-with-fallback'

type Props = {
  story: DailyStory
  gtmTags: GtmTags
}

export default function MainCard({ story, gtmTags }: Props) {
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)
  const userPayload = useUserPayload()

  return (
    <div className="flex flex-col gap-y-3 lg:flex-row lg:gap-x-10">
      <NextLink href={`story/${story.id}`} className={gtmTags.story}>
        <div className="relative aspect-[2/1] shrink-0 overflow-hidden rounded-md lg:h-[250px] lg:w-[500px]">
          <ImageWithFallback
            src={story.og_image}
            alt={story.title}
            fill
            className="object-cover"
            fallbackCategory={ImageCategory.STORY}
          />
        </div>
      </NextLink>

      <div className="lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="mb-1 flex justify-between">
            <NextLink
              href={`profile/publisher/${story.source.customId}`}
              className="GTM-homepage_click_media_title"
            >
              <p className="body-3 text-primary-500 hover-or-active:text-primary-700">
                {story.source.title}
              </p>
            </NextLink>
            <StoryMoreActionButton
              story={story}
              publisherId={story.source.id}
            />
          </div>

          <NextLink
            href={`story/${story.id}`}
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
            <h3 className="title-2 mb-2 text-primary-700 hover-or-active:underline sm:mb-3">
              {story.title}
            </h3>
            <p className="body-3 mb-3 hidden text-primary-600 sm:line-clamp-1">
              {story.og_description}
            </p>
          </NextLink>

          <div className="footnote">
            <StoryMeta
              storyId={story.id}
              commentCount={story.commentCount}
              publishDate={story.published_date}
              paywall={story.paywall}
              fullScreenAd={story.full_screen_ad}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <ObjectivePickInfo
            displayPicks={displayPicks}
            pickCount={displayPicksCount}
            objectiveId={story.id}
          />
          <StoryPickButton storyId={story.id} gtmClassName={gtmTags.pick} />
        </div>
      </div>
    </div>
  )
}
