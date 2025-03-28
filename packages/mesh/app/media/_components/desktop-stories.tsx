import { useMemo } from 'react'

import { type AllPublisherData } from '@/app/actions/publisher'
import AdSense from '@/components/ad/adsense-ad'
import type { MostSponsorPublisher } from '@/utils/data-schema'

import DesktopInfiniteStories from './desktop-infinite-stories'
import HeroStoryCard from './hero-story-card'
import type { LatestStoriesInfo, Story } from './media-stories'
import MostPickedPodcastCard from './most-picked-podcast-card'
import MostPickedStoryCard from './most-picked-story-card'
import PodcastCard from './podcast-card'
import PublisherCard from './publisher-card'
import PublisherSuggestion from './publisher-suggestion'
import StoryCard from './story-card'

export default function DesktopStories({
  mostPickedStory,
  publishersAndStories,
  latestStoriesInfo,
  publisherList,
  loadMoreLatestStories,
  slug,
}: {
  mostPickedStory: Story | null | undefined
  publishersAndStories: MostSponsorPublisher[]
  latestStoriesInfo: LatestStoriesInfo
  publisherList: AllPublisherData
  loadMoreLatestStories: () => void
  slug: string
}) {
  const { stories } = latestStoriesInfo
  const firstSectionCount = slug === 'podcast' ? 6 : 5
  const [firstSectionStories, secondSectionStories] = useMemo(() => {
    return [
      stories?.slice(0, firstSectionCount),
      stories.slice(firstSectionCount),
    ]
  }, [firstSectionCount, stories])

  return (
    <div className="hidden lg:block">
      <section className="grid grid-cols-2 gap-x-10 p-10 pt-0">
        {slug !== 'podcast'
          ? firstSectionStories.map((story, i) =>
              i === 0 ? (
                <HeroStoryCard key={story.id} story={story} />
              ) : (
                <StoryCard
                  key={story.id}
                  story={story}
                  className={i >= firstSectionCount - 2 ? 'border-b-0' : ''}
                  gtmTags={{
                    story: 'GTM-media_click_category_article',
                    pick: 'GTM-media_pick_category_article',
                  }}
                />
              )
            )
          : firstSectionStories.map((story, i) => (
              <div
                key={story.id}
                className={
                  i >= firstSectionCount - 2 ? 'border-b-0' : 'border-b'
                }
              >
                <PodcastCard data={story} />
              </div>
            ))}
      </section>
      <AdSense pageKey="media" adKey="D1" className="mb-10 mt-[-20px]" />
      {mostPickedStory ? (
        mostPickedStory.story_type === 'story' ? (
          <MostPickedStoryCard story={mostPickedStory} isDesktop={false} />
        ) : (
          <MostPickedPodcastCard story={mostPickedStory} />
        )
      ) : null}
      <div className="flex gap-10 p-10 pb-15">
        <section className="w-articleMain shrink-0">
          <DesktopInfiniteStories
            key={latestStoriesInfo.stories.length}
            latestStoriesInfo={{
              ...latestStoriesInfo,
              stories: secondSectionStories,
              totalCount: latestStoriesInfo.totalCount - firstSectionCount,
            }}
            loadMoreLatestStories={loadMoreLatestStories}
          />
        </section>
        <aside className="flex flex-col items-center gap-3">
          <PublisherSuggestion publisherSuggestion={publisherList} />
          {publishersAndStories.map((publisherAndStories) => (
            <PublisherCard
              key={publisherAndStories.publisher.id}
              publisherAndStories={publisherAndStories}
            />
          ))}
          <AdSense pageKey="media" adKey="D3" className="mt-5" />
        </aside>
      </div>
    </div>
  )
}
