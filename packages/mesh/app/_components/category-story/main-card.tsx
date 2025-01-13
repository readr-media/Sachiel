'use client'

import NextImage from 'next/image'
import NextLink from 'next/link'

import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import useUserPayload from '@/hooks/use-user-payload'
import type { CategoryStory } from '@/types/homepage'
import { logStoryClick } from '@/utils/event-logs'

type Props = {
  story: CategoryStory
}

export default function MainCard({ story }: Props) {
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)
  const userPayload = useUserPayload()

  return (
    <div className="flex flex-col gap-y-3 pb-4 shadow-[0_0.5px_0_0_rgba(0,9,40,0.1)] lg:shadow-none">
      <NextLink
        href={`story/${story.id}`}
        className="GTM-homepage_click_category_article"
      >
        <div className="relative aspect-[2/1] shrink-0 overflow-hidden rounded-md lg:h-[250px] lg:w-[500px]">
          <NextImage
            src={story.og_image || '/images/default-story-image.webP'}
            alt={story.title}
            fill
            className="object-cover"
          />
        </div>
      </NextLink>

      <div className="lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="mb-1 flex justify-between">
            <NextLink href={`/profile/publisher/${story.source.customId}`}>
              <p className="body-3 text-primary-500 hover-or-active:text-primary-700">
                {story.source.title}
              </p>
            </NextLink>

            <StoryMoreActionButton
              story={story}
              publisherId={story.source.id ?? ''}
            />
          </div>

          <NextLink
            href={`story/${story.id}`}
            className="GTM-homepage_click_category_article"
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
          <StoryPickButton storyId={story.id} />
        </div>
      </div>
    </div>
  )
}
