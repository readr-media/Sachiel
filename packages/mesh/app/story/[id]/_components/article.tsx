'use client'

import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/button'
import Icon from '@/components/icon'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import { type GetStoryQuery } from '@/graphql/__generated__/graphql'
import { displayTime } from '@/utils/story-display'

import ApiDataRenderer, { type ApiData } from './api-data-renderer/renderer'
import SideIndex from './api-data-renderer/side-index'

type Story = NonNullable<GetStoryQuery>['story']

const inHousePublisherCustomIds = ['mirrormedia', 'readr']

export default function Article({
  story,
  sourceCustomId,
}: {
  story: Story
  sourceCustomId: string
}) {
  const shouldUseApiData = inHousePublisherCustomIds.includes(sourceCustomId)

  const getArtcileContent = (
    story: Story,
    sourceCustomId: string,
    shouldUseApiData: boolean
  ) => {
    if (shouldUseApiData) {
      return (
        <>
          <SideIndex
            apiData={story?.apiData as ApiData}
            sourceCustomId={sourceCustomId}
            isInArticle={true}
          />
          <ApiDataRenderer
            apiData={story?.apiData as ApiData}
            sourceCustomId={sourceCustomId}
          />
        </>
      )
    } else {
      // redirect all external stories for now, TODO: sparate external and redirect stories
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
  const displayPicks = story?.picks

  return (
    <div>
      <div>
        {story?.og_image && (
          <div className="relative mb-6 aspect-[2/1]">
            <Image
              src={story.og_image}
              alt="hero image"
              style={{ objectFit: 'cover' }}
              fill
            />
          </div>
        )}
        <div className="px-5 sm:px-0">
          {/* article meta */}
          <div>
            <div className="body-3 text-primary-500">
              {story?.source?.title ?? ''}
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
              <StoryPickInfo
                displayPicks={displayPicks}
                maxCount={4}
                pickCount={story?.picksCount ?? 0}
                commentCount={story?.commentsCount ?? 0}
              />
              {/* TODO: update the states and actions according to the user state */}
              <div className="hidden gap-1 sm:flex">
                <PublisherDonateButton />
                <StoryPickButton
                  isStoryPicked={false}
                  storyId={story?.id ?? ''}
                />
                <button className="pl-2">
                  <Icon iconName="icon-more-horiz" size="l" />
                </button>
              </div>
            </div>
          </div>
          {story?.summary && (
            <div className="body-2 mt-6 border-y-[1px] px-6 py-5 text-primary-700">
              {story?.summary}
            </div>
          )}

          {getArtcileContent(story, sourceCustomId, shouldUseApiData)}
        </div>
      </div>
    </div>
  )
}
