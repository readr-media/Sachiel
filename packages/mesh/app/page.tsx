import CategoryStorySection from './_components/category-story/section'
import DailyHighlightSection from './_components/daily-highlight/section'
import DataLayerLogger from './_components/data-layer-logger'
import MostLikedCommentSection from './_components/most-liked-comments/section'
import MostPickedStorySection from './_components/most-picked-story'
import ReadrStorySection from './_components/readr-story'
import TopCollectorSection from './_components/top-collector/section'
import TopPublisherSection from './_components/top-publisher/section'

export const dynamic = 'force-static'
export const revalidate = 600

export default function Home() {
  return (
    <main>
      <DataLayerLogger />
      {/* @ts-expect-error Async Server Component */}
      <DailyHighlightSection />
      {/* @ts-expect-error Async Server Component */}
      <MostPickedStorySection />
      {/* @ts-expect-error Async Server Component */}
      <CategoryStorySection />
      {/* @ts-expect-error Async Server Component */}
      <TopCollectorSection />
      {/* @ts-expect-error Async Server Component */}
      <MostLikedCommentSection />
      {/* @ts-expect-error Async Server Component */}
      <ReadrStorySection />
      {/* @ts-expect-error Async Server Component */}
      <TopPublisherSection />
    </main>
  )
}
