'use client'

import { Fragment, useMemo } from 'react'

import useWindowDimensions from '@/hooks/use-window-dimension'
import { isDeviceDesktop, isDeviceMobile } from '@/utils/device'

import { type Story } from '../page'
import HeroStoryCard from './hero-story-card'
import MostPickedStoryCard from './most-picked-story-card'
import PublisherCard, { type DisplayPublisher } from './publisher-card'
import StoryCard from './story-card'

function DesktopStories({
  stories,
  mostPickedStory,
  displayPublishers,
  followingMemberIds,
}: {
  stories: Story[]
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
  followingMemberIds: Set<string>
}) {
  const firstSectionCount = 5
  const [firstSectionStories, secondSectionStories] = useMemo(() => {
    return [
      stories?.slice(0, firstSectionCount),
      stories.slice(firstSectionCount),
    ]
  }, [stories])
  // last two story shows no border-b
  const indexWithoutBorderB = firstSectionCount - 2

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
              className={i >= indexWithoutBorderB ? 'border-b-0' : ''}
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
                followingMemberIds={followingMemberIds}
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
  followingMemberIds,
}: {
  stories: Story[]
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
  isMobile: boolean
  followingMemberIds: Set<string>
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
  followingMemberIds,
}: {
  stories: Story[]
  mostPickedStory: Story | null | undefined
  displayPublishers: DisplayPublisher[]
  followingMemberIds: Set<string>
}) {
  const { width } = useWindowDimensions()

  if (isDeviceDesktop(width)) {
    return (
      <DesktopStories
        stories={stories}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
        followingMemberIds={followingMemberIds}
      />
    )
  } else {
    return (
      <NonDesktopStories
        stories={stories}
        isMobile={isDeviceMobile(width)}
        mostPickedStory={mostPickedStory}
        displayPublishers={displayPublishers}
        followingMemberIds={followingMemberIds}
      />
    )
  }
}
