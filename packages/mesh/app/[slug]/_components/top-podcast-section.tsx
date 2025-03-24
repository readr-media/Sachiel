import type { DailyStory } from '@/types/homepage'

import PodcastSlugCard from './podcast-slug-card'

export default function TopPodcastSection({
  otherStories,
}: {
  otherStories: DailyStory[]
}) {
  return (
    <section>
      <ul className="grid justify-center p-5 sm:p-0 sm:px-5 sm:pb-5 lg:grid-cols-2">
        {otherStories.slice(0, 6).map((data, idx) => (
          <li
            key={data.id}
            className={`border-b bg-white pb-4 pt-5 first:pt-0 last:border-b-0 md:mx-5 md:h-[182px] md:max-w-[600px] md:py-0 lg:h-[174px] ${
              idx >= 4 ? 'lg:border-b-0' : ''
            }`}
          >
            <PodcastSlugCard data={data} />
          </li>
        ))}
      </ul>
    </section>
  )
}
