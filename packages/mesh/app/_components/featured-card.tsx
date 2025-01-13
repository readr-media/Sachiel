'use client'

import NextLink from 'next/link'

import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import useUserPayload from '@/hooks/use-user-payload'
import type { CategoryStory, GtmTags, Story } from '@/types/homepage'
import { logStoryClick } from '@/utils/event-logs'

import ImageWithFallback from './image-with-fallback'

type Props = {
  isReadrStory?: boolean
  story: Story | CategoryStory
  customId: string
  publisher: string
  publisherId: string
  gtmTags: GtmTags
}

export default function FeaturedCard({
  isReadrStory,
  story,
  customId,
  publisher,
  publisherId,
  gtmTags,
}: Props) {
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)
  const userPayload = useUserPayload()

  return (
    <section className="bg-primary-100 p-5 md:px-[70px] lg:px-10 lg:py-8">
      <h2 className="list-title lg:title-1 mb-2 text-primary-500 lg:mb-3">
        {isReadrStory ? 'READr 最新報導' : '最多人精選'}
      </h2>
      <article className="flex flex-col gap-y-3 sm:flex-row sm:gap-x-5 lg:gap-x-10">
        <NextLink href={`/story/${story.id}`} className={gtmTags.story}>
          <div className="relative aspect-[2/1] shrink-0 overflow-hidden rounded-md sm:aspect-square sm:size-[168px] lg:h-[178px] lg:w-[356px] xl:h-[200px] xl:w-[400px]">
            <ImageWithFallback
              src={story.og_image}
              alt={story.title}
              fill
              className="object-cover"
              fallbackCategory={ImageCategory.STORY}
            />
          </div>
        </NextLink>

        <div className="grow">
          <div className="mb-1 flex justify-between">
            <NextLink href={`/profile/publisher/${customId}`}>
              <p className="footnote lg:body-3 text-primary-500 hover-or-active:text-primary-700">
                {publisher}
              </p>
            </NextLink>

            <StoryMoreActionButton story={story} publisherId={publisherId} />
          </div>

          <h3 className="title-2 lg:title-1 mb-2 text-primary-700 hover-or-active:underline lg:mb-3">
            <NextLink
              href={`/story/${story.id}`}
              onClick={() =>
                logStoryClick(userPayload, story.id, story.title, publisher)
              }
              className={gtmTags.story}
            >
              {story.title}
            </NextLink>
          </h3>

          <div className="caption-1 lg:footnote mb-4 sm:mb-3 lg:mb-[19px] xl:mb-10">
            <StoryMeta
              storyId={story.id}
              commentCount={story.commentCount}
              publishDate={story.published_date}
              paywall={story.paywall}
              fullScreenAd={story.full_screen_ad}
            />
          </div>

          <div className="flex justify-between">
            <ObjectivePickInfo
              displayPicks={displayPicks}
              pickCount={displayPicksCount}
              ringColor="primary-100"
              objectiveId={story.id}
            />
            <StoryPickButton
              storyId={story.id}
              color="transparent"
              gtmClassName={gtmTags.pick}
            />
          </div>
        </div>
      </article>
    </section>
  )
}
