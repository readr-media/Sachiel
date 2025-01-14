import { useEffect } from 'react'

import useInView from '@/hooks/use-in-view'

import { type LatestStoriesInfo } from './media-stories'
import StoryCard from './story-card'

export default function DesktopInfiniteStories({
  latestStoriesInfo,
  loadMoreLatestStories,
}: {
  latestStoriesInfo: LatestStoriesInfo
  loadMoreLatestStories: () => void
}) {
  const { stories, shouldLoadmore } = latestStoriesInfo

  const { targetRef: triggerLoadmoreRef, isIntersecting: shouldStartLoadMore } =
    useInView()

  useEffect(() => {
    if (shouldStartLoadMore && shouldLoadmore) {
      loadMoreLatestStories()
    }
  }, [loadMoreLatestStories, shouldLoadmore, shouldStartLoadMore])

  return (
    <>
      {stories.map((story, i) => (
        <StoryCard
          key={story.id}
          className={`first-of-type:pt-0 ${
            i === stories.length - 1 ? 'last-of-type:border-b-0' : ''
          }`}
          story={story}
          ref={i === stories.length - 5 ? triggerLoadmoreRef : undefined}
          gtmTags={{
            story: 'GTM-media_click_category_article',
            pick: 'GTM-media_pick_category_article',
          }}
        />
      ))}
    </>
  )
}
