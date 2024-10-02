'use client'

import NextImage from 'next/image'
import NextLink from 'next/link'

import Icon from '@/components/icon'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import type { DailyStory } from '@/types/homepage'

import SwiperComponent from './swiper-component'

type Props = {
  stories: DailyStory[]
}

export default function MainCard({ stories }: Props) {
  const story = stories[0]
  const restStories = stories.slice(1, 5)
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)

  return (
    <article className="mb-6 sm:mb-10">
      <div className="mb-4 flex flex-col gap-y-3 sm:mb-5 lg:flex-row lg:gap-x-10">
        <NextLink href={`story/${story.id}`}>
          <div className="relative aspect-[2/1] shrink-0 overflow-hidden rounded-md lg:h-[250px] lg:w-[500px]">
            <NextImage
              src={story.og_image}
              alt={story.title}
              fill
              className="object-cover"
            />
          </div>
        </NextLink>

        <div className="lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-1 flex justify-between">
              <NextLink href={`profile/member/${story.source.customId}`}>
                <p className="body-3 text-primary-500">{story.source.title}</p>
              </NextLink>
              <Icon iconName="icon-more-horiz" size="l" />
            </div>

            <NextLink href={`story/${story.id}`}>
              <h3 className="title-2 mb-2 text-primary-700 sm:mb-3">
                {story.title}
              </h3>
              <p className="body-3 mb-3 hidden text-primary-600 sm:line-clamp-1">
                {story.og_description}
              </p>
            </NextLink>

            <div className="footnote">
              <StoryMeta
                commentCount={story.commentCount}
                publishDate={story.published_date}
                paywall={story.paywall}
                fullScreenAd={story.full_screen_ad}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <StoryPickInfo
              displayPicks={displayPicks}
              pickCount={displayPicksCount}
            />
            <StoryPickButton storyId={story.id} />
          </div>
        </div>
      </div>

      <div>
        <SwiperComponent stories={restStories} />
      </div>
    </article>
  )
}
