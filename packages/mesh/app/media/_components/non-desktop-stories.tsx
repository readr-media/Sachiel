import { Fragment, useEffect } from 'react'

import useInView from '@/hooks/use-in-view'
import type { MostSponsorPublisher } from '@/utils/data-schema'

import type { LatestStoriesInfo, Story } from './media-stories'
import MostPickedStoryCard from './most-picked-story-card'
import PublisherCard from './publisher-card'
import StoryCard from './story-card'

export default function NonDesktopStories({
  mostPickedStory,
  publishersAndStories,
  latestStoriesInfo,
  loadMoreLatestStories,
}: {
  mostPickedStory: Story | null | undefined
  publishersAndStories: MostSponsorPublisher[]
  latestStoriesInfo: LatestStoriesInfo
  loadMoreLatestStories: () => void
}) {
  const { stories, shouldLoadmore } = latestStoriesInfo
  const { targetRef: triggerLoadmoreRef, isIntersecting: shouldStartLoadMore } =
    useInView()

  const specialBlocks = mostPickedStory
    ? [mostPickedStory, ...publishersAndStories]
    : [...publishersAndStories]

  useEffect(() => {
    if (shouldStartLoadMore && shouldLoadmore) {
      loadMoreLatestStories()
    }
  }, [loadMoreLatestStories, shouldLoadmore, shouldStartLoadMore])

  return (
    <div className="flex flex-col sm:pb-10 lg:hidden">
      {stories.map((story, i) => {
        const shouldInsertSpecialBlock = (i + 1) % 5 === 0
        const specialBlock = specialBlocks[Math.floor((i + 1) / 5) - 1]
        const shouldSetTriggerRef = i === stories.length - 5

        if (shouldInsertSpecialBlock && specialBlock) {
          const specialBlockJsx =
            'stories' in specialBlock ? (
              <div className="p-5 md:px-[70px]">
                <PublisherCard
                  key={specialBlock.publisher.id}
                  publisherAndStories={specialBlock}
                />
              </div>
            ) : (
              <MostPickedStoryCard story={specialBlock} isDesktop={false} />
            )
          return (
            <Fragment key={story.id}>
              <StoryCard
                className="mx-5 border-b-0 first-of-type:pt-0 md:mx-[70px]"
                story={story}
                ref={shouldSetTriggerRef ? triggerLoadmoreRef : undefined}
              />
              {specialBlockJsx}
            </Fragment>
          )
        } else {
          return (
            <StoryCard
              key={story.id}
              className="mx-5 first-of-type:pt-0 last-of-type:border-b-0 md:mx-[70px]"
              story={story}
              ref={shouldSetTriggerRef ? triggerLoadmoreRef : undefined}
            />
          )
        }
      })}
    </div>
  )
}
