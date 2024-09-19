import NextImage from 'next/image'
import NextLink from 'next/link'

import Icon from '@/components/icon'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import type { CategoryStory, DailyStory } from '@/types/homepage'

type Props<T> = {
  story: T
}

export default function StoryCard<T extends CategoryStory | DailyStory>({
  story,
}: Props<T>) {
  return (
    <div className="pb-4 shadow-[0_0.5px_0_0_rgba(0,9,40,0.1)] last:shadow-none">
      <div className="mb-1 flex justify-between">
        <NextLink href={`/profile/publisher/${story.source.customId}`}>
          <p className="caption-1 text-primary-500">{story.source.title}</p>
        </NextLink>
        <Icon iconName="icon-more-horiz" size="l" />
      </div>

      <div className="flex justify-between gap-x-3 sm:gap-x-10">
        <div>
          <p className="subtitle-1 sm:title-2 mb-2 line-clamp-2 grow text-primary-700 sm:mb-1">
            <NextLink href={`/story/${story.id}`}> {story.title}</NextLink>
          </p>
          <div className="caption-1">
            <StoryMeta
              commentCount={story.commentCount}
              publishDate={story.published_date}
              paywall={story.paywall}
              fullScreenAd={story.full_screen_ad}
            />
          </div>
        </div>

        <NextLink href={`/story/${story.id}`}>
          <div className="relative h-[48px] w-[96px] shrink-0 overflow-hidden rounded sm:h-[80px] sm:w-[160px]">
            <NextImage src={story.og_image} fill alt={story.title} />
          </div>
        </NextLink>
      </div>

      <div className="mt-4 flex justify-between">
        <StoryPickInfo
          displayPicks={story.picks}
          pickCount={'pickCount' in story ? story.pickCount : story.picksCount}
        />
        <StoryPickButton storyId={story.id} />
      </div>
    </div>
  )
}
