import NextImage from 'next/image'
import NextLink from 'next/link'

import Icon from '@/components/icon'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import type { Story } from '@/types/homepage'
import { getDisplayPicks } from '@/utils/story-display'

type Props = {
  isReadrStory?: boolean
  followingMembers: Set<string>
  story: Story
  customId: string
  publisher: string
}

export default function FeaturedCard({
  isReadrStory,
  followingMembers,
  story,
  customId,
  publisher,
}: Props) {
  const displayPicks = getDisplayPicks(story.picks, followingMembers)

  return (
    <section className="bg-primary-100 p-5 md:px-[70px] lg:px-10 lg:py-8">
      <h2 className="list-title lg:title-1 mb-2 text-primary-500 lg:mb-3">
        {isReadrStory ? 'READr 最新報導' : '最多人精選'}
      </h2>
      <article className="flex flex-col gap-y-3 sm:flex-row sm:gap-x-5 lg:gap-x-10">
        <NextLink href={`/story/${story.id}`}>
          <div className="relative aspect-[2/1] shrink-0 overflow-hidden rounded-md sm:aspect-square sm:size-[168px] lg:h-[178px] lg:w-[356px] xl:h-[200px] xl:w-[400px]">
            <NextImage src={story.og_image} fill alt={story.title} />
          </div>
        </NextLink>

        <div className="grow">
          <div className="mb-1 flex justify-between">
            <NextLink href={`/profile/member/${customId}`}>
              <p className="footnote lg:body-3 text-primary-500">{publisher}</p>
            </NextLink>

            <Icon iconName="icon-more-horiz" size="l" />
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
              pickCount={story.pickCount}
            />
            <StoryPickButton storyId={story.id} />
          </div>
        </div>
      </article>
    </section>
  )
}
