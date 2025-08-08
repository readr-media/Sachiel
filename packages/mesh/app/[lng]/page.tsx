import { Suspense } from 'react'

import DailyHighlightSection from '@/app/[lng]/_components/daily-highlight/section'

import CategoryStorySection from './_components/category-story/section'
import DataLayerLogger from './_components/data-layer-logger'
import MostLikedCommentSection from './_components/most-liked-comments/section'
import MostPickedStorySection from './_components/most-picked-story'
import ReadrStorySection from './_components/readr-story'
import TopCollectorSection from './_components/top-collector/section'
import TopPublisherSection from './_components/top-publisher/section'

export const revalidate = 600

/**
 * Note: https://github.com/vercel/next.js/discussions/46227
 * Async Server Component
 */

export default function Home({ params }: { params: { lng: string } }) {
  const { lng } = params
  return (
    <main>
      <DataLayerLogger />
      <Suspense>
        {/* @ts-expect-error Async Server Component */}
        <DailyHighlightSection lng={lng} />
      </Suspense>
      {/* @ts-expect-error Async Server Component */}
      <MostPickedStorySection />
      {/* @ts-expect-error Async Server Component */}
      <CategoryStorySection />
      {/* @ts-expect-error Async Server Component */}
      <TopCollectorSection />
      <MostLikedCommentSection />
      {/* @ts-expect-error Async Server Component */}
      <ReadrStorySection />
      <TopPublisherSection />
    </main>
  )
}
