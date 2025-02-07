import MainCard from '@/app/_components/daily-highlight/main-card'
import SwiperComponent from '@/app/_components/daily-highlight/swiper-component'
import StoryCard from '@/app/_components/story-card'
import type { DailyStory } from '@/types/homepage'

type Props = {
  otherStories: DailyStory[] | undefined
  groupStories: DailyStory[] | undefined
}

export default function TopStoriesSection({
  otherStories,
  groupStories,
}: Props) {
  return (
    <section className="flex flex-col gap-y-6 px-5 sm:gap-y-10 md:px-[70px] lg:px-10 lg:pb-5">
      {groupStories && (
        <div className="flex flex-col gap-y-4 sm:gap-y-5">
          <MainCard
            story={groupStories[0]}
            gtmTags={{
              story: 'GTM-categorypage_click_focus_article',
              pick: 'GTM-categorypage_pick_pop_article',
            }}
          />
          {groupStories.length > 3 && (
            <SwiperComponent stories={groupStories.slice(1, 4)} />
          )}
        </div>
      )}
      <div className="flex flex-col gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:[&>*:nth-child(5)]:shadow-none">
        {otherStories &&
          otherStories.slice(0, 6).map((story) => (
            <StoryCard
              story={story}
              key={story.id}
              gtmTags={{
                story: 'GTM-categorypage_click_focus_article',
                pick: 'GTM-categorypage_pick_pop_article',
              }}
            />
          ))}
      </div>
    </section>
  )
}
