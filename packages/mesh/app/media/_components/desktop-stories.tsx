import { useMemo } from 'react'

import type { MostSponsorPublisher } from '@/utils/data-schema'

import DesktopInfiniteStories from './desktop-infinite-stories'
import HeroStoryCard from './hero-story-card'
import type { LatestStoriesInfo, Story } from './media-stories'
import MostPickedStoryCard from './most-picked-story-card'
import PublisherCard from './publisher-card'
import StoryCard from './story-card'

export default function DesktopStories({
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
  const { stories } = latestStoriesInfo
  const firstSectionCount = 5
  const [firstSectionStories, secondSectionStories] = useMemo(() => {
    return [
      stories?.slice(0, firstSectionCount),
      stories.slice(firstSectionCount),
    ]
  }, [stories])

  return (
    <div className="hidden lg:block">
      <section className="grid grid-cols-2 gap-x-10 p-10 pt-0">
        {firstSectionStories.map((story, i) =>
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
        )}
      </section>
      {mostPickedStory && (
        <MostPickedStoryCard story={mostPickedStory} isDesktop={true} />
      )}
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
        <aside className="flex flex-col gap-3">
          {publishersAndStories.map((publisherAndStories) => (
            <PublisherCard
              key={publisherAndStories.publisher.id}
              publisherAndStories={publisherAndStories}
            />
          ))}
        </aside>
      </div>
    </div>
  )
}
