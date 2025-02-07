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

export default function DesktopStories({
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
  const otherStories = stories.slice(6)

  const getStoriesContent = () => {
    const elements: ReactNode[] = []

    otherStories.slice(0, visibleCount).forEach((story, index) => {
      const remainingStories = visibleCount - (index + 1)
      const shouldSetTriggerRef =
        remainingStories === 9 || remainingStories === 0

      elements.push(
        <StoryCard
          key={story.id}
          story={story}
          gtmTags={{
            story: 'GTM-categorypage_click_latest_article',
            pick: 'GTM-categorypage_pick_latest_article',
          }}
          ref={shouldSetTriggerRef ? triggerLoadMoreRef : undefined}
        />
      )
    })
    return elements
  }
  return (
    <section className="hidden lg:block lg:px-10 lg:pb-15 lg:pt-10 xxl:pb-10">
      <div className="lg:flex lg:gap-x-10">
        {otherStories.length !== 0 && (
          <div className="w-articleMain shrink-0">
            <h2 className="lg:title-1 lg:mb-6 lg:text-primary-700">最新報導</h2>
            <div className="flex flex-col gap-y-5">{getStoriesContent()}</div>
          </div>
        )}

        <aside className="lg:flex lg:flex-col lg:gap-y-3 ">
          {publishersAndStories &&
            publishersAndStories.map((data) => (
              <PublisherCard key={data.publisher.id} data={data} />
            ))}
        </aside>
      </div>
      {isLoading && (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      )}
    </section>
  )
}
