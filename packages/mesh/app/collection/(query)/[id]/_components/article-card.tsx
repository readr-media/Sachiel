'use client'

import Link from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import useUserPayload from '@/hooks/use-user-payload'
import { type CommentType } from '@/types/profile'
import { logStoryClick } from '@/utils/event-logs'

import type { CollectionPick } from '../../_types/collection'
import Comment from './comment'

type CollectionPickStory = NonNullable<CollectionPick>['story']

type ArticleCardProps = {
  story: CollectionPickStory
  isLast: boolean
  memberId?: string
  avatar?: string
  name?: string
}

const ArticleCard = ({ story, isLast, avatar = '' }: ArticleCardProps) => {
  const commentList = story?.comments || []
  const creatorComment = commentList[0]
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)
  const userPayload = useUserPayload()
  return (
    <Link
      href={`/story/${story?.id}`}
      onClick={() =>
        logStoryClick(
          userPayload,
          story?.id ?? '',
          story?.title ?? '',
          story?.source?.title ?? ''
        )
      }
    >
      <section className="relative hidden md:block md:aspect-[2/1] md:w-full md:overflow-hidden md:rounded-t-md">
        <ImageWithFallback
          src={story?.og_image ?? ''}
          alt={`${story?.title}'s story cover image`}
          fill
          className="size-full object-cover"
          fallbackCategory={ImageCategory.STORY}
        />
      </section>
      <div
        className={`flex flex-col p-5 after:absolute after:bottom-1 after:h-px after:w-[calc(100%-40px)] after:bg-primary-200 md:line-clamp-3 md:pt-[12px] md:after:hidden ${
          isLast && 'after:hidden'
        }`}
      >
        <section className="mb-1 flex items-center justify-between">
          <p className="caption-1 text-primary-500">
            {(story?.source && story?.source.title) ?? '預設媒體'}
          </p>
          {story && (
            <StoryMoreActionButton
              story={story}
              publisherId={story?.source?.id ?? ''}
            />
          )}
        </section>
        <section className="mb-2 flex items-start justify-between sm:gap-10">
          <div className="flex h-full flex-col justify-between">
            <p className="body-2 mb-2 w-full sm:mb-1 sm:line-clamp-2 lg:line-clamp-3 lg:min-h-[72px]">
              {story?.title || '預設標題'}
            </p>
            <span className=" *:caption-1 *:text-primary-500">
              <StoryMeta
                storyId={story?.id || ''}
                commentCount={story?.commentsCount || 0}
                publishDate={story?.published_date || ''}
                paywall={story?.paywall || false}
                fullScreenAd={story?.full_screen_ad || ''}
              />
            </span>
          </div>
          <div className="relative ml-3 aspect-[2/1] min-w-24 overflow-hidden rounded border-[0.5px] border-primary-200 sm:w-40 sm:min-w-40 md:hidden">
            <ImageWithFallback
              src={story?.og_image ?? ''}
              alt={`${story?.title}'s story cover image`}
              fill
              className="object-cover"
              fallbackCategory={ImageCategory.STORY}
            />
          </div>
        </section>
        <section className="mt-4 flex justify-between">
          <ObjectivePickInfo
            displayPicks={displayPicks}
            pickCount={displayPicksCount}
            maxCount={4}
            objectiveId={story?.id ?? ''}
          />
          <StoryPickButton storyId={story?.id ?? ''} />
        </section>
        {creatorComment && (
          <Comment
            data={creatorComment as CommentType}
            avatar={avatar}
            clampLineCount={3}
            canToggle={false}
          />
        )}
      </div>
    </Link>
  )
}

export default ArticleCard
