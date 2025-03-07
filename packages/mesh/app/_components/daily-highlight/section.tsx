import {
  fetchDailyHighlightGroup,
  fetchDailyHighlightNoGroup,
} from '@/app/actions/get-homepage'
import AdManager from '@/components/ad/ad-manager-ad'
import AdSense from '@/components/ad/adsense-ad'
import { displayDateWithWeekday } from '@/utils/story-display'

import StoryCard from '../story-card'
import MainGroup from './main-group'

type Props = {
  version: 'A' | 'B'
}

export default async function DailyHighlight({ version }: Props) {
  const groupData = await fetchDailyHighlightGroup()
  const noGroupData = await fetchDailyHighlightNoGroup()

  const groupStories = groupData && groupData.slice(0, 4)
  const noGroupStories = noGroupData && noGroupData.slice(0, 6)

  const shouldShowGAMAds = version === 'B'

  return (
    <section className="flex flex-col px-5 pt-4 sm:pt-5 md:px-[70px] lg:px-10 lg:pb-10">
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <h2 className="list-title lg:title-1 text-primary-700">今日焦點</h2>
        <time className="button text-primary-500">
          {displayDateWithWeekday()}
        </time>
      </div>

      {groupStories && <MainGroup stories={groupStories} />}

      {shouldShowGAMAds && (
        <AdManager pageKey="homepage" adKey="A1" className="mb-10" />
      )}

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
      {!shouldShowGAMAds && (
        <AdSense pageKey="homepage" adKey="A1" className="my-5 lg:mb-0" />
      )}
      {shouldShowGAMAds && (
        <AdManager pageKey="homepage" adKey="A2" className="my-5" />
      )}
    </section>
  )
}
