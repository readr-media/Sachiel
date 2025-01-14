import Link from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import useUserPayload from '@/hooks/use-user-payload'
import { logStoryClick } from '@/utils/event-logs'

import { type Story } from './media-stories'

// only used in desktop width
export default function HeroStoryCard({ story }: { story: Story }) {
  const userPayload = useUserPayload()
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)

  return (
    <article className="col-span-2 border-b pb-5 pt-3">
      <div className="flex gap-10">
        {/* use padding-top to set aspect-ratio to prevent height growing when right block grows in too many lines of titles */}

        <div className="relative h-0 w-[calc((100%-40px)/2)] flex-1 pt-[calc((100%-40px)/4)]">
          <Link
            href={`/story/${story.id}`}
            className="GTM-media_click_category_article size-full"
          >
            <ImageWithFallback
              className="rounded-md object-cover"
              src={story.og_image ?? ''}
              alt={story.title ?? ''}
              fill
              fallbackCategory={ImageCategory.STORY}
            />
          </Link>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          {/* right top section */}
          <div>
            <div className="flex h-6 flex-row items-center justify-between">
              <Link
                href={`/profile/publisher/${story.source?.customId ?? ''}`}
                className="GTM-media_click_media_title"
              >
                <h4 className="body-3 h-5 text-primary-500 hover-or-active:text-primary-700 lg:h-auto">
                  {story.source?.title ?? ''}
                </h4>
              </Link>
              <StoryMoreActionButton
                story={story}
                publisherId={story.source?.id ?? ''}
                canUnFollowPublisher={true}
              />
            </div>
            <Link
              href={`/story/${story.id}`}
              className="GTM-media_click_category_article"
              onClick={() =>
                logStoryClick(
                  userPayload,
                  story.id,
                  story?.title ?? '',
                  story.source?.title ?? ''
                )
              }
            >
              <div className="hero-title mt-1 text-primary-700 hover-or-active:underline">
                {story.title ?? ''}
              </div>
              <div className="body-3 mt-3 line-clamp-1 text-primary-600">
                {story.summary ?? ''}
              </div>
            </Link>
            <div className="footnote mt-3">
              <StoryMeta
                storyId={story.id}
                commentCount={story.commentCount ?? 0}
                publishDate={story.published_date}
                paywall={story.paywall ?? false}
                fullScreenAd={story.full_screen_ad ?? ''}
              />
            </div>
          </div>
          {/* right bottom section */}
          <div>
            <div className="mt-4 flex h-8 flex-row justify-between">
              <ObjectivePickInfo
                displayPicks={displayPicks}
                pickCount={displayPicksCount}
                objectiveId={story.id}
              />
              <StoryPickButton
                storyId={story.id}
                gtmClassName="GTM-media_pick_category_article"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
