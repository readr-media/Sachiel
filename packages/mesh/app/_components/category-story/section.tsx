import {
  fetchAllCategory,
  fetchCategoryStory,
} from '@/app/actions/get-homepage'

import NavList from './nav-list'

export default async function CategoryStorySection() {
  const data = await fetchAllCategory()
  const categories = data?.categories ?? []

  const initialSlug = categories?.[0].slug
  const categoryStories = await fetchCategoryStory(initialSlug)

  return (
    <section className="px-5 pt-5 md:px-[70px] lg:px-10 lg:pb-10">
      <NavList categories={categories} initialStories={categoryStories} />
    </section>
  )
}
