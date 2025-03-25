import { Fragment, useEffect } from 'react'

import { type AllPublisherData } from '@/app/actions/publisher'
import AdSense from '@/components/ad/adsense-ad'
import useInView from '@/hooks/use-in-view'
import type { MostSponsorPublisher } from '@/utils/data-schema'

import type { LatestStoriesInfo, Story } from './media-stories'
import MostPickedPodcastCard from './most-picked-podcast-card'
import MostPickedStoryCard from './most-picked-story-card'
import PodcastCard from './podcast-card'
import PublisherCard from './publisher-card'
import PublisherSuggestion from './publisher-suggestion'
import StoryCard from './story-card'

export default function NonDesktopStories({
  mostPickedStory,
  publishersAndStories,
  latestStoriesInfo,
  publisherList,
  loadMoreLatestStories,
}: {
  mostPickedStory: Story | null | undefined
  publishersAndStories: MostSponsorPublisher[]
  latestStoriesInfo: LatestStoriesInfo
  publisherList: AllPublisherData
  loadMoreLatestStories: () => void
}) {
  const { stories, shouldLoadmore } = latestStoriesInfo
  const { targetRef: triggerLoadmoreRef, isIntersecting: shouldStartLoadMore } =
    useInView()
  const firstSectionStories = stories.slice(0, 5)
  const secondSectionStories = stories.slice(5)

  useEffect(() => {
    if (shouldStartLoadMore && shouldLoadmore) {
      loadMoreLatestStories()
    }
  }, [loadMoreLatestStories, shouldLoadmore, shouldStartLoadMore])

  return (
    <div className="flex flex-col sm:pb-10 lg:hidden">
      {firstSectionStories.map((story, i) => {
        if (story.story_type === 'story') {
          return (
            <StoryCard
              key={story.id}
              className={`mx-5 first:pt-0 ${
                i === firstSectionStories.length - 1 ? 'border-b-0' : ''
              } md:mx-[70px]`}
              story={story}
              ref={undefined}
              gtmTags={{
                story: 'GTM-media_click_category_article',
                pick: 'GTM-media_pick_category_article',
              }}
            />
          )
        } else {
          return (
            <div
              key={story.id}
              className={`mx-5 border-b pb-4 pt-5 first:pt-0 last:border-b-0 ${
                i === firstSectionStories.length - 1 ? 'border-b-0' : ''
              }`}
            >
              <PodcastCard data={story} />
            </div>
          )
        }
      })}
      <PublisherSuggestion publisherSuggestion={publisherList} />
      <AdSense pageKey="media" adKey="D1" className="my-5" />
      {mostPickedStory ? (
        mostPickedStory.story_type === 'story' ? (
          <MostPickedStoryCard story={mostPickedStory} isDesktop={false} />
        ) : (
          <MostPickedPodcastCard story={mostPickedStory} />
        )
      ) : null}
      {secondSectionStories.map((story, i) => {
        const specialBlock =
          i % 5 === 4 ? publishersAndStories[Math.floor(i / 5)] : null
        const shouldSetTriggerRef = i === secondSectionStories.length - 5
        return (
          <Fragment key={story.id}>
            {story.story_type === 'story' ? (
              <StoryCard
                className={`mx-5 first:pt-0 ${
                  i % 5 === 4 ? 'border-b-0' : ''
                } md:mx-[70px]`}
                story={story}
                ref={shouldSetTriggerRef ? triggerLoadmoreRef : undefined}
                gtmTags={{
                  story: 'GTM-media_click_category_article',
                  pick: 'GTM-media_pick_category_article',
                }}
              />
            ) : (
              <div
                className={`mx-5 border-b pb-4 pt-5 first:pt-0 last:border-b-0 ${
                  i % 5 === 4 ? 'border-b-0' : ''
                }`}
              >
                <PodcastCard data={story} />
              </div>
            )}
            {specialBlock && (
              <>
                <AdSense
                  pageKey="media"
                  adKey={`D2-${Math.floor(i / 5) + 1}`}
                  className="mb-5"
                />
                <div className="p-5 md:px-[70px]">
                  <PublisherCard
                    key={specialBlock.publisher.id}
                    publisherAndStories={specialBlock}
                  />
                </div>
              </>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
