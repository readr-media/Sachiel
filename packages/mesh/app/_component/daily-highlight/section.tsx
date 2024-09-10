import {
  fetchDailyHighlightGroup,
  fetchDailyHighlightNoGroup,
} from '@/app/actions/get-homepage'
import { displayDateWithWeekday } from '@/utils/story-display'

import StoryCard from '../story-card'
import MainGroup from './main-group'

type Props = {
  followingMembers: Set<string>
}

export default async function DailyHighlight({ followingMembers }: Props) {
  const groupData = await fetchDailyHighlightGroup()
  const noGroupData = await fetchDailyHighlightNoGroup()
  if (!groupData || !noGroupData) return null

  const groupStory = groupData.slice(0, 4)
  const noGroupStory = noGroupData.slice(0, 6)

  return (
    <section className="px-5 pt-4 sm:pt-5 md:px-[70px] lg:px-10 lg:pb-5">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <h2 className="list-title text-primary-700">今日焦點</h2>
        <time className="button text-primary-500">
          {displayDateWithWeekday()}
        </time>
      </div>

      <MainGroup stories={groupStory} followingMembers={followingMembers} />

      <div className="flex flex-col gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:gap-y-4 lg:[&>*:nth-child(5)]:shadow-none">
        {noGroupStory.map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            followingMembers={followingMembers}
          />
        ))}
      </div>
    </section>
  )
}
