'use client'

import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { Fragment } from 'react'

import { type LatestStoriesInfo, type Story } from '../page'
import MostPickedStoryCard from './most-picked-story-card'
import PublisherCard, { type DisplayPublisher } from './publisher-card'
import StoryCard from './story-card'

export default function NonDesktopStories({
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
  const specialBlocks = mostPickedStory
    ? [mostPickedStory, ...displayPublishers]
    : [...displayPublishers]

  return (
    <div className="flex flex-col sm:pb-10 lg:hidden">
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
