import NextImage from 'next/image'
import NextLink from 'next/link'

import StoryMeta from '@/components/story-card/story-meta'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { type SearchResults } from '@/utils/data-schema'
export default function StoryCard({
  story,
  extra,
}: {
  story: NonNullable<SearchResults['story']>[number]
  extra?: string
}) {
  return (
    <div
      className={`flex flex-col border-b-[0.5px] last:border-b-0 sm:max-w-[600px] ${extra}`}
    >
      <div className="flex flex-row items-center justify-between pb-1">
        <NextLink href={`/profile/publisher/${story.source.customId}`}>
          <p className="caption-1 text-primary-500 hover-or-active:text-primary-700">
            {story.source.title}
          </p>
        </NextLink>
        <StoryMoreActionButton story={story} publisherId={story.source.id} />
      </div>
      <div className="flex flex-row justify-between gap-3 sm:gap-10">
        <div>
          <NextLink href={`/story/${story.id}`}>
            <span className="subtitle-1 sm:title-2 line-clamp-2 grow text-primary-700 hover-or-active:underline">
              {story.title}
            </span>
          </NextLink>
          <div className="caption-1 pt-2 sm:pt-1">
            <StoryMeta
              storyId={story.id}
              commentCount={0}
              publishDate={story.published_date}
              paywall={story.isMember}
              fullScreenAd={story.full_screen_ad}
            />
          </div>
        </div>
        {story.og_image && (
          <div className="relative h-[48px] w-[96px] shrink-0 sm:h-[80px] sm:w-[160px]">
            <NextImage
              className="rounded-[4px] object-cover"
              src={story.og_image}
              alt={story.title}
              fill
            />
          </div>
        )}
      </div>
    </div>
  )
}
