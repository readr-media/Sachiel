'use client'

import NextLink from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'

import { type Story } from './media-stories'

export default function MostPickedPodcastCard({ story }: { story: Story }) {
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)
  const publisherCustomId = story.source?.customId ?? ''
  const publisher = story.source?.title ?? ''
  const publisherId = story.source?.id ?? ''
  const {
    id,
    title,
    og_image,
    commentCount,
    published_date,
    paywall,
    full_screen_ad,
    story_type,
  } = story

  return (
    <section className="bg-primary-100 p-5 md:px-[70px] lg:px-10 lg:py-8">
      <h2 className="list-title lg:title-1 mb-2 text-primary-500 lg:mb-3">
        最多人精選
      </h2>
      <div className="sm:flex sm:flex-row sm:gap-5">
        <figure className="relative hidden shrink-0 sm:block sm:size-[168px] lg:size-[178px] xl:size-[200px]">
          <ImageWithFallback
            className="rounded object-cover"
            src={og_image ?? ''}
            alt={title ?? ''}
            fill
            fallbackCategory={ImageCategory.PODCAST}
          />
        </figure>
        <div className="w-full">
          <div className="mb-1 flex justify-between">
            <NextLink href={`/profile/publisher/${publisherCustomId}`}>
              <p className="footnote lg:body-3 text-primary-500 hover-or-active:text-primary-700">
                {publisher}
              </p>
            </NextLink>
            <StoryMoreActionButton story={story} publisherId={publisherId} />
          </div>
          <div className="flex flex-row justify-between gap-3">
            <div className="mb-4 flex flex-col gap-2 sm:mb-3 lg:mb-5">
              <NextLink
                href={`/story/${id}`}
                className="title-2 lg:title-1 line-clamp-3 break-words text-primary-700 hover-or-active:underline"
              >
                {title}
              </NextLink>
              <div className="caption-1 lg:footnote">
                <StoryMeta
                  storyId={id}
                  commentCount={commentCount ?? 0}
                  publishDate={published_date}
                  paywall={paywall ?? false}
                  fullScreenAd={full_screen_ad ?? 'none'}
                  storyType={story_type ?? 'podcast'}
                />
              </div>
            </div>
            <figure className="relative size-20 shrink-0 sm:hidden">
              <ImageWithFallback
                className="rounded-[4px] object-cover "
                src={og_image ?? ''}
                alt={title ?? ''}
                fill
                sizes="(max-width: 640px) 80px"
                fallbackCategory={ImageCategory.PODCAST}
              />
            </figure>
          </div>
          <div className="flex justify-between">
            <ObjectivePickInfo
              displayPicks={displayPicks}
              pickCount={displayPicksCount}
              ringColor="primary-100"
              objectiveId={id}
            />
            <StoryPickButton
              storyId={id}
              storyTitle={title ?? ''}
              color="transparent"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
