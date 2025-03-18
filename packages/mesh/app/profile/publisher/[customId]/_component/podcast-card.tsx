import Link from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import { type PodcastJSONType } from '@/utils/data-schema'

export default function PodcastCard({
  data,
}: {
  data: PodcastJSONType[number]
}) {
  const { displayPicks, displayPicksCount } = useDisplayPicks(data)

  return (
    <div className="flex flex-row">
      <figure className="hidden shrink-0 md:relative md:block md:size-[182px] lg:size-[174px]">
        <ImageWithFallback
          className="rounded-l-md object-cover "
          src={data.og_image}
          alt={data.title}
          fill
          fallbackCategory={ImageCategory.PODCAST}
        />
      </figure>
      <div className="grow md:px-5 md:py-4 lg:py-3">
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
                storyType={data.story_type}
                publishDate={data.published_date}
                commentCount={data.commentCount}
                fullScreenAd={data.full_screen_ad}
                paywall={data.paywall}
              />
            </div>
          </div>
          <figure className="relative size-12 shrink-0 sm:size-20 md:hidden">
            <ImageWithFallback
              className="rounded-[4px] object-cover "
              src={data.og_image}
              alt={data.title}
              fill
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
}
