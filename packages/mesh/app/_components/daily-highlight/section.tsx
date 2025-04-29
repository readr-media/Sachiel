import {
  fetchDailyHighlightGroup,
  fetchDailyHighlightNoGroup,
} from '@/app/actions/get-homepage'
import { DisplayDateWithWeekday } from '@/components/story-time-display'

import StoryCard from '../story-card'
import { AdAfterMainGroup } from './ad-after-main-group'
import { AdAfterNoGroup } from './ad-after-no-group'
import MainGroup from './main-group'
import Title from './title'

export default async function DailyHighlight() {
  const groupData = await fetchDailyHighlightGroup()
  const noGroupData = await fetchDailyHighlightNoGroup()

  const groupStories = groupData && groupData.slice(0, 4)
  const noGroupStories = noGroupData && noGroupData.slice(0, 6)

  return (
    <section className="flex flex-col px-5 pt-4 sm:pt-5 md:px-[70px] lg:px-10 lg:pb-10">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <Title />
        <time className="button text-primary-500">
          <DisplayDateWithWeekday />
        </time>
      </div>
      {groupStories && <MainGroup stories={groupStories} />}
      <AdAfterMainGroup />
      <div className="flex flex-col gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:[&>*:nth-child(5)]:shadow-none">
        {noGroupStories &&
          noGroupStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              gtmTags={{
                story: 'GTM-homepage_click_focus_article',
                pick: 'GTM-homepage_pick_focus_article',
              }}
            />
          ))}
      </div>
      <AdAfterNoGroup />
    </section>
  )
}
