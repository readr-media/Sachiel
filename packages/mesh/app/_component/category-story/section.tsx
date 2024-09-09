import {
  fetchAllCategory,
  fetchCategoryStory,
} from '@/app/actions/get-homepage'

import NavList from './nav-list'

type Props = {
  followingMembers: Set<string>
}

export default async function CategoryStorySection({
  followingMembers,
}: Props) {
  const data = await fetchAllCategory()
  const categories = data?.categories ?? []

  const initialSlug = categories?.[0].slug
  const categoryStories = await fetchCategoryStory(initialSlug)

  return (
    <section className="px-5 pt-5 md:px-[70px] lg:px-10">
      <NavList
        categories={categories}
        followingMembers={followingMembers}
        initialStories={categoryStories}
      />
    </section>
  )
}
