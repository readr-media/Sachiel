import {
  fetchDailyHighlightGroup,
  fetchDailyHighlightNoGroup,
} from '@/app/actions/get-homepage'
import { displayDateWithWeekday } from '@/utils/story-display'

import StoryCard from '../story-card'
import MainGroup from './main-group'

export default async function DailyHighlight() {
  const groupData = await fetchDailyHighlightGroup()
  const noGroupData = await fetchDailyHighlightNoGroup()

  const groupStories = groupData && groupData.slice(0, 4)
  const noGroupStories = noGroupData && noGroupData.slice(0, 6)

  return (
    <section className="px-5 pt-4 sm:pt-5 md:px-[70px] lg:px-10 lg:pb-5">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <h2 className="list-title lg:title-1 text-primary-700">今日焦點</h2>
        <time className="button text-primary-500">
          {displayDateWithWeekday()}
        </time>
      </div>

      {groupStories && <MainGroup stories={groupStories} />}

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
    </section>
  )
}
