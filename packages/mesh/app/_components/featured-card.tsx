'use client'

import NextImage from 'next/image'
import NextLink from 'next/link'

import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import type { CategoryStory, Story } from '@/types/homepage'

type Props = {
  isReadrStory?: boolean
  story: Story | CategoryStory
  customId: string
  publisher: string
  publisherId: string
}

export default function FeaturedCard({
  isReadrStory,
  story,
  customId,
  publisher,
  publisherId,
}: Props) {
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)

  return (
    <section className="bg-primary-100 p-5 md:px-[70px] lg:px-10 lg:py-8">
      <h2 className="list-title lg:title-1 mb-2 text-primary-500 lg:mb-3">
        {isReadrStory ? 'READr 最新報導' : '最多人精選'}
      </h2>
      <article className="flex flex-col gap-y-3 sm:flex-row sm:gap-x-5 lg:gap-x-10">
        <NextLink href={`/story/${story.id}`}>
          <div className="relative aspect-[2/1] shrink-0 overflow-hidden rounded-md sm:aspect-square sm:size-[168px] lg:h-[178px] lg:w-[356px] xl:h-[200px] xl:w-[400px]">
            <NextImage
              src={story.og_image}
              fill
              alt={story.title}
              className="object-cover"
            />
          </div>
        </NextLink>

        <div className="grow">
          <div className="mb-1 flex justify-between">
            <NextLink href={`/profile/member/${customId}`}>
              <p className="footnote lg:body-3 text-primary-500">{publisher}</p>
            </NextLink>

            <StoryMoreActionButton
              storyId={story.id}
              publisherId={publisherId}
            />
          </div>

          <h3 className="title-2 lg:title-1 mb-2 text-primary-700 lg:mb-3">
            <NextLink href={`/story/${story.id}`}>{story.title}</NextLink>
          </h3>

          <div className="caption-1 lg:footnote mb-4 sm:mb-3 lg:mb-[19px] xl:mb-10">
            <StoryMeta
              commentCount={story.commentCount}
              publishDate={story.published_date}
              paywall={story.paywall}
              fullScreenAd={story.full_screen_ad}
            />
          </div>

          <div className="flex justify-between">
            <StoryPickInfo
              displayPicks={displayPicks}
              pickCount={displayPicksCount}
            />
            <StoryPickButton storyId={story.id} color="transparent" />
          </div>
        </div>
      </article>
    </section>
  )
}
