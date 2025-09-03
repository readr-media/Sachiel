'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import ImageWithFallback from '@/app/[lng]/_components/image-with-fallback'
import { tryToGetFullStory } from '@/app/actions/story'
import Button from '@/components/button'
import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useComment } from '@/context/comment'
import { useStoryInteractions } from '@/context/story-interactions'
import { useUser } from '@/context/user'
import type { GetStoryInteractionsQuery } from '@/graphql/__generated__/graphql'
import { type GetStoryQuery } from '@/graphql/__generated__/graphql'
import { useDisplayCommentCount } from '@/hooks/use-display-commentcount'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import { displayTime } from '@/utils/story-display'
import { extractYouTubeId, isVideoType } from '@/utils/story-type'

import type { PublisherPolicy } from '../page'
import ApiDataRenderer, { type ApiData } from './api-data-renderer/renderer'
import SideIndex from './api-data-renderer/side-index'
import PaymentWall from './payment-wall'

type Story = NonNullable<GetStoryQuery>['story']
export type StoryInteractions = NonNullable<
  NonNullable<GetStoryInteractionsQuery>['story']
>

const inHousePublisherCustomIds = ['mirrormedia', 'readr']

const VideoHero = ({ videoUrl }: { videoUrl: string }) => {
  const youtubeId = extractYouTubeId(videoUrl)

  if (!youtubeId) {
    console.warn('Could not extract YouTube ID from URL:', videoUrl)
    return null
  }

  return (
    <div className="relative mb-6 aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}`}
        className="absolute inset-0 size-full"
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default function Article({
  story,
  sourceCustomId,
  isMemberStory,
  policy,
}: {
  story: Story
  sourceCustomId: string
  isMemberStory: boolean
  policy: PublisherPolicy
}) {
  const [apiData, setApiData] = useState<ApiData>(
    story?.apiData ?? story?.trimApiData
  )
  const [hasPayed, setHasPayed] = useState(false)
  const { user } = useUser()
  const { state: comment } = useComment()
  const { interactions } = useStoryInteractions()

  const publishDateInFormat = displayTime(story?.published_date)
  // TODO: handle login user's following situation like feed.tsx did

  const { displayPicks, displayPicksCount } = useDisplayPicks(interactions)
  const { displayCommentCount, setDisplayCommentCount } =
    useDisplayCommentCount({
      objectiveId: story?.id || '',
      initialCount: comment.commentsCount,
    })

  useEffect(() => {
    setDisplayCommentCount(Math.max(comment.commentsCount, displayCommentCount))
  }, [comment.commentsCount, displayCommentCount, setDisplayCommentCount])

  useEffect(() => {
    const getFullStory = async (storyId: string) => {
      const fullStory = await tryToGetFullStory(storyId)
      if (fullStory && fullStory.apiData) {
        setApiData(fullStory.apiData)
        setHasPayed(true)
      }
    }

    if (isMemberStory && user.memberId && story?.id) {
      getFullStory(story.id)
    }
  }, [isMemberStory, story?.id, user.memberId])

  const getArticleContent = (story: Story, sourceCustomId: string) => {
    const isInHouseArticle = inHousePublisherCustomIds.includes(sourceCustomId)
    const isLinkedArticle = !story?.full_content
    /**
     * There are two kind of sources, in-house and external,
     * If the full_content filed is false, then the article should be viewed in the original url.
     * In summary there are three conditions: linked article, in-house article and external article.
     * When story_type is 'podcast', the story should be handled as an external article.
     */
    if (isLinkedArticle) {
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
    } else if (isInHouseArticle && story.story_type === 'story') {
      return (
        <>
          <SideIndex
            apiData={apiData}
            sourceCustomId={sourceCustomId}
            isInArticle={true}
          />
          <ApiDataRenderer
            key={JSON.stringify(apiData)}
            apiData={apiData}
            sourceCustomId={sourceCustomId}
          />
        </>
      )
    } else {
      return (
        <article
          className="story-renderer *:break-words"
          dangerouslySetInnerHTML={{ __html: story?.content ?? '' }}
        />
      )
    }
  }

  return (
    <div>
      <div>
        {/* Hero Section - Dynamic based on story type */}
        {story && story.story_type && isVideoType(story.story_type) ? (
          <VideoHero videoUrl={story.url || ''} />
        ) : (
          story?.og_image && (
            <div className="relative mb-6 aspect-[2/1]">
              <ImageWithFallback
                src={story.og_image}
                alt={`${story.title}'s OG Image`}
                style={{ objectFit: 'cover' }}
                fill
                fallbackCategory={ImageCategory.STORY}
              />
            </div>
          )
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
                  storyTitle={story?.title ?? ''}
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
