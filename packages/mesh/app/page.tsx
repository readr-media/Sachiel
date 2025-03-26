import { NEXT_PAGES_REVALIDATE } from '@/constants/config'

import CategoryStorySection from './_components/category-story/section'
import DailyHighlightSection from './_components/daily-highlight/section'
import DataLayerLogger from './_components/data-layer-logger'
import MostLikedCommentSection from './_components/most-liked-comments/section'
import MostPickedStorySection from './_components/most-picked-story'
import ReadrStorySection from './_components/readr-story'
import TopCollectorSection from './_components/top-collector/section'
import TopPublisherSection from './_components/top-publisher/section'

export const dynamic = 'force-static'
export const revalidate = NEXT_PAGES_REVALIDATE.homepage

export default function Home() {
  const ABConst = Math.random() < 0.5 ? 'A' : 'B'

  return (
    <main>
      <DataLayerLogger version={ABConst} />
      {/* @ts-expect-error Async Server Component */}
      <DailyHighlightSection version={ABConst} />
      {/* @ts-expect-error Async Server Component */}
      <MostPickedStorySection />
      {/* @ts-expect-error Async Server Component */}
      <CategoryStorySection version={ABConst} />
      {/* @ts-expect-error Async Server Component */}
      <TopCollectorSection />
      {/* @ts-expect-error Async Server Component */}
      <MostLikedCommentSection />
      {/* @ts-expect-error Async Server Component */}
      <ReadrStorySection version={ABConst} />
      {/* @ts-expect-error Async Server Component */}
      <TopPublisherSection version={ABConst} />
    </main>
  )
}
