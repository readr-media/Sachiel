'use client'

import { Fragment, useMemo } from 'react'

import useWindowDimensions from '@/app/hooks/use-window-dimension'
import { ListStoryFragment } from '@/graphql/__generated__/graphql'
import { isDeviceDesktop, isDeviceMobile } from '@/utils/device'

import HeroStoryCard from './hero-story-card'
import MostPickedStory from './most-picked-story'
import PublisherCard, { type DisplayPublisher } from './publisher'
import StoryCard from './story-card'

type Story = ListStoryFragment

function DesktopStories({
  stories,
  mostPickedStory,
  displayPublishers,
}: {
  stories: Story[]
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
}) {
  const [firstSectionStories, secondSectionStories] = useMemo(() => {
    return [stories?.slice(0, 5), stories.slice(5)]
  }, [stories])

  return (
    <>
      <section className="grid gap-x-10 p-10 pt-0">
        {firstSectionStories.map((story, i) => {
          if (i === 0) {
            return <HeroStoryCard key={story.id} story={story} />
          }
          return <StoryCard key={story.id} story={story} isMobile={false} />
        })}
      </section>
      {mostPickedStory && (
        <MostPickedStory story={mostPickedStory} isDesktop={true} />
      )}
      <div className="flex gap-10 p-10 pb-15">
        <section className="w-[600px] flex-shrink-0">
          {secondSectionStories.map((story, i) => {
            return (
              <StoryCard
                key={story.id}
                className={`first-of-type:pt-0 ${
                  i === secondSectionStories.length - 1
                    ? 'last-of-type:border-b-0'
                    : ''
                }`}
                story={story}
                isMobile={false}
              />
            )
          })}
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
  stories,
  mostPickedStory,
  displayPublishers,
  isMobile,
}: {
  stories: Story[]
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
  isMobile: boolean
}) {
  const specialBlocks = mostPickedStory
    ? [mostPickedStory, ...displayPublishers]
    : [...displayPublishers]

  return (
    <div className="flex flex-col sm:pb-10">
      {stories.map((story, i) => {
        const insertSpecialBlock = (i + 1) % 5 === 0
        const specialBlock = specialBlocks[Math.floor((i + 1) / 5) - 1]

        if (insertSpecialBlock && specialBlock) {
          const specialBlockJsx =
            'stories' in specialBlock ? (
              <div className="p-5 md:px-[70px]">
                <PublisherCard key={specialBlock.id} publisher={specialBlock} />
              </div>
            ) : (
              <MostPickedStory story={specialBlock} isDesktop={false} />
            )
          return (
            <Fragment key={story.id}>
              <StoryCard
                key={story.id}
                className="mx-5 border-b-0 first-of-type:pt-0 md:mx-[70px]"
                story={story}
                isMobile={isMobile}
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
            />
          )
        }
      })}
    </div>
  )
}

export default function Media({
  stories = [],
  mostPickedStory,
  displayPublishers,
}: {
  stories: Story[]
  mostPickedStory: Story | null | undefined
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
