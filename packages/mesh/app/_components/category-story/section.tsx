import {
  fetchAllCategory,
  fetchCategoryStory,
} from '@/app/actions/get-homepage'
import AdManager from '@/components/ad/ad-manager-ad'
import AdSense from '@/components/ad/adsense-ad'

import NavList from './nav-list'

type Props = {
  version: 'A' | 'B'
}

export default async function CategoryStorySection({ version }: Props) {
  const data = await fetchAllCategory()
  const categories = data?.categories ?? []

  const initialSlug = categories?.[0]?.slug
  const categoryStories = await fetchCategoryStory(initialSlug)

  const shouldShowGAMAds = version === 'B'

  return (
    <section className="flex flex-col px-5 pt-5 md:px-[70px] lg:px-10 lg:pb-10">
      <NavList categories={categories} initialStories={categoryStories} />
      {!shouldShowGAMAds && (
        <AdSense pageKey="homepage" adKey="A2" className="mt-10" />
      )}
      {shouldShowGAMAds && (
        <AdManager pageKey="homepage" adKey="A3" className="mt-10" />
      )}
    </section>
  )
}
