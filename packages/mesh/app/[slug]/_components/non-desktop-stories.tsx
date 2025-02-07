'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import StoryCard from '@/app/_components/story-card'
import Spinner from '@/components/spinner'
import useInView from '@/hooks/use-in-view'
import type { DailyStory, SponsoredStoryByCategory } from '@/types/homepage'

import PublisherCard from './publisher-card'

type Props = {
  stories: DailyStory[] | undefined
  publishersAndStories: SponsoredStoryByCategory[] | null
}

export default function NonDesktopStories({
  stories,
  publishersAndStories,
}: Props) {
  const [visibleCount, setVisibleCount] = useState(15)
  const [isLoading, setIsLoading] = useState(false)
  const { targetRef: triggerLoadMoreRef, isIntersecting: shouldStartLoadMore } =
    useInView()

  useEffect(() => {
    if (shouldStartLoadMore && visibleCount < (stories?.length || 0)) {
      setIsLoading(true)
      setTimeout(() => {
        setVisibleCount((prevCount) => prevCount + 10)
        setIsLoading(false)
      }, 500)
    }
  }, [shouldStartLoadMore, visibleCount, stories?.length])

  if (!stories) return null
  const otherStories = stories?.slice(6)

  const getStoriesAndPublishersGroup = () => {
    const elements: ReactNode[] = []

    let publisherIndex = 0

    otherStories.slice(0, visibleCount).forEach((story, index) => {
      const remainingStories = visibleCount - (index + 1)
      const shouldSetTriggerRef =
        remainingStories === 9 || remainingStories === 0
      elements.push(
        <StoryCard
          key={story.id}
          story={story}
          ref={shouldSetTriggerRef ? triggerLoadMoreRef : undefined}
          className={`${
            (index + 1) % 5 === 0 ||
            (publishersAndStories &&
              publisherIndex < publishersAndStories.length)
              ? 'shadow-none'
              : ''
          }`}
          gtmTags={{
            story: 'GTM-categorypage_click_latest_article',
            pick: 'GTM-categorypage_pick_latest_article',
          }}
        />
      )
      if (
        (index + 1) % 5 === 0 &&
        publishersAndStories &&
        publisherIndex < publishersAndStories.length
      ) {
        elements.push(
          <PublisherCard
            key={publishersAndStories[publisherIndex].publisher.id}
            data={publishersAndStories[publisherIndex]}
          />
        )
        publisherIndex++
      }
    })

    while (
      publishersAndStories &&
      publisherIndex < publishersAndStories.length
    ) {
      elements.push(
        <PublisherCard
          key={publishersAndStories[publisherIndex].publisher.id}
          data={publishersAndStories[publisherIndex]}
        />
      )
      publisherIndex++
    }

    return elements
  }

  return (
    <section className="px-5 pt-6 sm:pb-10 md:px-[70px] lg:hidden">
      <h2 className="list-title mb-8 text-primary-700">最新報導</h2>
      <div className="flex flex-col gap-y-5">
        {getStoriesAndPublishersGroup()}
      </div>
      {isLoading && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </section>
  )
}
