'use client'

import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { Fragment, useMemo } from 'react'

import useWindowDimensions from '@/hooks/use-window-dimension'
import { isDeviceDesktop, isDeviceMobile } from '@/utils/device'

import { type LatestStoriesInfo, type Story } from '../page'
import HeroStoryCard from './hero-story-card'
import MostPickedStoryCard from './most-picked-story-card'
import PublisherCard, { type DisplayPublisher } from './publisher-card'
import StoryCard from './story-card'

function DesktopStories({
  mostPickedStory,
  displayPublishers,
  followingMemberIds,
  latestStoriesInfo,
}: {
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
  followingMemberIds: Set<string>
  latestStoriesInfo: LatestStoriesInfo
}) {
  const { stories, totalCount } = latestStoriesInfo
  const firstSectionCount = 5
  const [firstSectionStories, secondSectionStories] = useMemo(() => {
    return [
      stories?.slice(0, firstSectionCount),
      stories.slice(firstSectionCount),
    ]
  }, [stories])

  return (
    <>
      <section className="grid gap-x-10 p-10 pt-0">
        {firstSectionStories.map((story, i) =>
          i === 0 ? (
            <HeroStoryCard
              key={story.id}
              story={story}
              followingMemberIds={followingMemberIds}
            />
          ) : (
            <StoryCard
              key={story.id}
              story={story}
              isMobile={false}
              // last two story shows no border-b
              className={i >= firstSectionCount - 2 ? 'border-b-0' : ''}
              followingMemberIds={followingMemberIds}
            />
          )
        )}
      </section>
      {mostPickedStory && (
        <MostPickedStoryCard
          story={mostPickedStory}
          isDesktop={true}
          followingMemberIds={followingMemberIds}
        />
      )}
      <div className="flex gap-10 p-10 pb-15">
        <section className="w-[600px] flex-shrink-0">
          <InfiniteScrollList
            initialList={secondSectionStories}
            pageSize={latestStoriesInfo.fetchBody.take}
            amountOfElements={totalCount - firstSectionCount}
            fetchListInPage={latestStoriesInfo.fetchListInPage}
            hasCustomTrigger={true}
          >
            {(list, customTriggerRef) =>
              list.map((story, i) => {
                const shouldSetTriggerRef = i === list.length - 5
                return (
                  <StoryCard
                    key={story.id}
                    className={`first-of-type:pt-0 ${
                      i === list.length - 1 ? 'last-of-type:border-b-0' : ''
                    }`}
                    story={story}
                    isMobile={false}
                    followingMemberIds={followingMemberIds}
                    ref={shouldSetTriggerRef ? customTriggerRef : undefined}
                  />
                )
              })
            }
          </InfiniteScrollList>
        </section>
        <aside className="flex flex-col gap-3">
          {displayPublishers.map((displayPublisher) => (
            <PublisherCard
              key={displayPublisher.id}
              publisher={displayPublisher}
            />
          ))}
        </aside>
      </div>
    </>
  )
}

function NonDesktopStories({
  mostPickedStory,
  displayPublishers,
  isMobile,
  followingMemberIds,
  latestStoriesInfo,
}: {
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
  isMobile: boolean
  followingMemberIds: Set<string>
  latestStoriesInfo: LatestStoriesInfo
}) {
  const specialBlocks = mostPickedStory
    ? [mostPickedStory, ...displayPublishers]
    : [...displayPublishers]

  return (
    <div className="flex flex-col sm:pb-10">
      <InfiniteScrollList
        initialList={latestStoriesInfo.stories}
        pageSize={latestStoriesInfo.fetchBody.take}
        amountOfElements={latestStoriesInfo.totalCount}
        fetchListInPage={latestStoriesInfo.fetchListInPage}
        hasCustomTrigger={true}
      >
        {(list, customTriggerRef) =>
          list.map((story, i) => {
            const insertSpecialBlock = (i + 1) % 5 === 0
            const specialBlock = specialBlocks[Math.floor((i + 1) / 5) - 1]
            const shouldSetTriggerRef = i === list.length - 5

            if (insertSpecialBlock && specialBlock) {
              const specialBlockJsx =
                'stories' in specialBlock ? (
                  <div className="p-5 md:px-[70px]">
                    <PublisherCard
                      key={specialBlock.id}
                      publisher={specialBlock}
                    />
                  </div>
                ) : (
                  <MostPickedStoryCard
                    story={specialBlock}
                    isDesktop={false}
                    followingMemberIds={followingMemberIds}
                  />
                )
              return (
                <Fragment key={story.id}>
                  <StoryCard
                    key={story.id}
                    className="mx-5 border-b-0 first-of-type:pt-0 md:mx-[70px]"
                    story={story}
                    isMobile={isMobile}
                    followingMemberIds={followingMemberIds}
                    ref={shouldSetTriggerRef ? customTriggerRef : undefined}
                  />
                  {specialBlockJsx}
                </Fragment>
              )
            } else {
              return (
                <StoryCard
                  key={story.id}
                  className="mx-5 first-of-type:pt-0 md:mx-[70px]"
                  story={story}
                  isMobile={isMobile}
                  followingMemberIds={followingMemberIds}
                  ref={shouldSetTriggerRef ? customTriggerRef : undefined}
                />
              )
            }
          })
        }
      </InfiniteScrollList>
    </div>
  )
}

export default function Media({
  latestStoriesInfo,
  mostPickedStory,
  displayPublishers,
  followingMemberIds,
}: {
  latestStoriesInfo: LatestStoriesInfo
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
  followingMemberIds: Set<string>
}) {
  const { width } = useWindowDimensions()

  if (isDeviceDesktop(width)) {
    return (
      <DesktopStories
        latestStoriesInfo={latestStoriesInfo}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
        followingMemberIds={followingMemberIds}
      />
    )
  } else {
    return (
      <NonDesktopStories
        latestStoriesInfo={latestStoriesInfo}
        isMobile={isDeviceMobile(width)}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
        followingMemberIds={followingMemberIds}
      />
    )
  }
}
