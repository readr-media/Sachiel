'use client'

import MainCard from '@/app/_components/daily-highlight/main-card'
import type { DailyStory } from '@/types/homepage'

import SwiperComponent from './swiper-component'

type Props = {
  stories: DailyStory[]
}

export default function MainGroup({ stories }: Props) {
  const story = stories[0]
  const restStories = stories.slice(1, 5)

  return (
    <article className="mb-6 sm:mb-10">
      <div className="mb-4 sm:mb-5">
        <MainCard
          story={story}
          gtmTags={{
            story: 'GTM-homepage_click_focus_article',
            pick: 'GTM-homepage_pick_focus_article',
          }}
        />
      </div>

      <SwiperComponent stories={restStories} />
    </article>
  )
}
