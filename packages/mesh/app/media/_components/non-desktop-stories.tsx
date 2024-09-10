'use client'

import { Fragment, useRef } from 'react'

import type {
  DisplayPublisher,
  LatestStoriesInfo,
  Story,
} from './media-stories'
import MostPickedStoryCard from './most-picked-story-card'
import PublisherCard from './publisher-card'
import StoryCard from './story-card'

export default function NonDesktopStories({
  mostPickedStory,
  publishers,
  latestStoriesInfo,
}: {
  mostPickedStory: Story | null | undefined
  publishers: DisplayPublisher[]
  latestStoriesInfo: LatestStoriesInfo
}) {
  const triggerRef = useRef(null)
  const { stories } = latestStoriesInfo
  const specialBlocks = mostPickedStory
    ? [mostPickedStory, ...publishers]
    : [...publishers]

  return (
    <div className="flex flex-col sm:pb-10 lg:hidden">
      {stories.map((story, i) => {
        const insertSpecialBlock = (i + 1) % 5 === 0
        const specialBlock = specialBlocks[Math.floor((i + 1) / 5) - 1]
        const shouldSetTriggerRef = i === stories.length - 5

        if (insertSpecialBlock && specialBlock) {
          const specialBlockJsx =
            'stories' in specialBlock ? (
              <div className="p-5 md:px-[70px]">
                <PublisherCard key={specialBlock.id} publisher={specialBlock} />
              </div>
            ) : (
              <MostPickedStoryCard story={specialBlock} isDesktop={false} />
            )
          return (
            <Fragment key={story.id}>
              <StoryCard
                key={story.id}
                className="mx-5 border-b-0 first-of-type:pt-0 md:mx-[70px]"
                story={story}
                ref={shouldSetTriggerRef ? triggerRef : undefined}
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
              ref={shouldSetTriggerRef ? triggerRef : undefined}
            />
          )
        }
      })}
    </div>
  )
}
