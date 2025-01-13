'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Button from '@/components/button'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useComment } from '@/context/comment'
import { type GetStoryQuery } from '@/graphql/__generated__/graphql'
import { useDisplayCommentCount } from '@/hooks/use-display-commentcount'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import { displayTime } from '@/utils/story-display'

import { type PublisherPolicy } from '../page'
import ApiDataRenderer, { type ApiData } from './api-data-renderer/renderer'
import SideIndex from './api-data-renderer/side-index'
import PaymentWall from './payment-wall'

export type Story = NonNullable<GetStoryQuery>['story']

const inHousePublisherCustomIds = ['mirrormedia', 'readr']

export default function Article({
  story,
  sourceCustomId,
  renderData,
  isMemberStory,
  hasPayed,
  policy,
}: {
  story: Story
  sourceCustomId: string
  renderData: ApiData
  isMemberStory: boolean
  hasPayed: boolean
  policy: PublisherPolicy
}) {
  const { state: comment } = useComment()
  const getArticleContent = (story: Story, sourceCustomId: string) => {
    const shouldUseApiData = inHousePublisherCustomIds.includes(sourceCustomId)

    if (shouldUseApiData) {
      return (
        <>
          <SideIndex
            apiData={renderData}
            sourceCustomId={sourceCustomId}
            isInArticle={true}
          />
          <ApiDataRenderer
            apiData={renderData}
            sourceCustomId={sourceCustomId}
          />
        </>
      )
    } else {
      const isExternal = story?.source?.full_content

      if (isExternal) {
        return (
          <article
            className="story-renderer"
            dangerouslySetInnerHTML={{ __html: story.content ?? '' }}
          />
        )
      }

      // redirect article
      return (
        <div className="mt-6 flex flex-col items-center gap-5 rounded-[10px] border border-primary-200 p-5 sm:mt-10">
          <div className="body-3 text-primary-500">本篇為外連文章</div>
          <Link
            href={story?.url ?? ''}
            target="_blank"
            className="block w-full max-w-[400px]"
          >
            <Button
              size="lg"
              color="primary"
              text="閱讀原文"
              icon={{ size: 'm', iconName: 'icon-open-new-tab' }}
              onClick={() => {}}
            />
          </Link>
        </div>
      )
    }
  }

  const publishDateInFormat = displayTime(story?.published_date)
  // TODO: handle login user's following situation like feed.tsx did

  const { displayPicks, displayPicksCount } = useDisplayPicks(story)
  const { displayCommentCount, setDisplayCommentCount } =
    useDisplayCommentCount({
      objectiveId: story?.id || '',
      initialCount: comment.commentsCount,
    })
  useEffect(() => {
    setDisplayCommentCount(Math.max(comment.commentsCount, displayCommentCount))
  }, [comment.commentsCount, displayCommentCount, setDisplayCommentCount])

  return (
    <div>
      <div>
        {story?.og_image && (
          <div className="relative mb-6 aspect-[2/1]">
            <ImageWithFallback
              src={story.og_image}
              alt="hero image"
              style={{ objectFit: 'cover' }}
              fill
              fallbackCategory={ImageCategory.STORY}
            />
          </div>
        )}
        <div className="px-5 sm:px-0">
          {/* article meta */}
          <div>
            <div className="body-3 text-primary-500 hover-or-active:text-primary-700">
              <Link href={`/profile/publisher/${story?.source?.customId}`}>
                {story?.source?.title ?? ''}
              </Link>
            </div>
            <h1 className="hero-title mt-1 text-primary-700">
              {story?.title ?? ''}
            </h1>
            {publishDateInFormat && (
              <div className="footnote mt-3 text-primary-500">
                更新時間：{publishDateInFormat}
              </div>
            )}
            <div className="mt-5 flex justify-between">
              <ObjectivePickInfo
                displayPicks={displayPicks}
                maxCount={4}
                pickCount={displayPicksCount}
                showCommentCount={true}
                commentCount={displayCommentCount}
                objectiveId={story?.id ?? ''}
              />
              {/* TODO: update the states and actions according to the user state */}
              <div className="hidden items-center gap-1 sm:flex">
                <PublisherDonateButton publisherId={story?.source?.id ?? ''} />
                <StoryPickButton
                  storyId={story?.id ?? ''}
                  gtmClassName="GTM-article_click_pick_article"
                />
                {story && (
                  <StoryMoreActionButton
                    story={story}
                    publisherId={story?.source?.id ?? ''}
                  />
                )}
              </div>
            </div>
          </div>
          {story?.summary && (
            <div
              className="body-2 mt-6 border-y px-6 py-5 text-primary-700"
              itemProp="articleBody"
            >
              {story?.summary}
            </div>
          )}
          <div className="relative">
            {getArticleContent(story, sourceCustomId)}
            {isMemberStory && !hasPayed ? (
              <PaymentWall storyId={story?.id ?? ''} policy={policy} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
