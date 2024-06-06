'use client'

import { useMemo } from 'react'

import useWindowDimensions from '@/app/hooks/use-window-dimension'
import { type Publisher } from '@/graphql/query/publishers'
import { type Story } from '@/graphql/query/stories'
import { isDeviceDesktop, isDeviceMobile } from '@/utils/device'

import HeroStory from './hero-story-card'
import MostPickedStory from './most-picked-story'
import StoryCard from './story-card'

type DisplayPublisher = Publisher & { stories: Story[] }

function DesktopStories({
  stories,
  mostPickedStory,
  displayPublishers,
}: {
  stories: Story[]
  mostPickedStory: Story | null
  displayPublishers: DisplayPublisher[]
}) {
  const [firstSectionStories, secondSectionStories] = useMemo(() => {
    return [stories.slice(0, 5), stories.slice(5)]
  }, [stories])

  return (
    <>
      <section className="grid gap-x-10 gap-y-5 p-10 pt-0">
        {firstSectionStories.map((story, i) => {
          if (i === 0) {
            return <HeroStory key={story.id} story={story} />
          }
          return (
            <StoryCard
              key={story.id}
              story={story}
              isMobile={false}
              hideBorderB={false}
            />
          )
        })}
      </section>
      {mostPickedStory && (
        <MostPickedStory story={mostPickedStory} isDesktop={true} />
      )}
      <div className="flex gap-10 p-10 pb-15">
        <section>
          {secondSectionStories.map((story) => (
            <StoryCard key={story.id} story={story} isMobile={false} />
          ))}
        </section>
        <aside className="flex flex-col gap-3">
          {Array.from(new Array(5)).map((e, i) => (
            <div
              className="h-[284px] w-[400px] rounded-lg bg-primary-100"
              key={i}
            >
              第{i}家媒體
            </div>
          ))}
        </aside>
      </div>
    </>
  )
  return
}

function NonDesktopStories({
  stories,
  mostPickedStory,
  displayPublishers,
  isMobile,
}: {
  stories: Story[]
  mostPickedStory: Story | null
  displayPublishers: DisplayPublisher[]
  isMobile: boolean
}) {
  // TODO: insert most picked story and five media blocks

  return (
    <>
      {mostPickedStory && (
        <MostPickedStory story={mostPickedStory} isDesktop={false} />
      )}
      <div className="flex flex-col gap-5 px-5 sm:pb-10 md:px-[70px]">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} isMobile={isMobile} />
        ))}
      </div>
    </>
  )
}

export default function Media({
  stories = [],
  mostPickedStory,
  displayPublishers,
}: {
  stories: Story[]
  mostPickedStory: Story | null
  displayPublishers: DisplayPublisher[]
}) {
  const { width } = useWindowDimensions()

  if (isDeviceDesktop(width)) {
    return (
      <DesktopStories
        stories={stories}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
      />
    )
  } else {
    return (
      <NonDesktopStories
        stories={stories}
        isMobile={isDeviceMobile(width)}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
      />
    )
  }
}
