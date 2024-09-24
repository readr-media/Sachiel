import CategoryStorySection from './_components/category-story/section'
import DailyHighlightSection from './_components/daily-highlight/section'
import MostLikedCommentSection from './_components/most-liked-comments/section'
import MostPickedStorySection from './_components/most-picked-story'
import ReadrStorySection from './_components/readr-story'
import TopCollectorSection from './_components/top-collector/section'
import TopPublisherSection from './_components/top-publisher/section'

export default async function Home() {
  return (
    <main>
      <DailyHighlightSection />
      <MostPickedStorySection />
      <CategoryStorySection />
      <TopCollectorSection />
      <MostLikedCommentSection />
      <ReadrStorySection />
      <TopPublisherSection />
    </main>
  )
}
