'use client'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'

import { type LatestStoriesInfo } from '../page'
import StoryCard from './story-card'

export default function DesktopInfiniteStories({
  latestStoriesInfo,
  followingMemberIds,
}: {
  latestStoriesInfo: LatestStoriesInfo
  followingMemberIds: Set<string>
}) {
  return (
    <InfiniteScrollList
      initialList={latestStoriesInfo.stories}
      pageSize={latestStoriesInfo.fetchBody.take}
      amountOfElements={latestStoriesInfo.totalCount}
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
              followingMemberIds={followingMemberIds}
              ref={shouldSetTriggerRef ? customTriggerRef : undefined}
            />
          )
        })
      }
    </InfiniteScrollList>
  )
}
