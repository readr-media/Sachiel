import { fetchAllCategory } from '@/app/actions/get-homepage'

import NavList from './nav-list'

type Props = {
  followingMembers: Set<string>
}

export default async function CategoryStorySection({
  followingMembers,
}: Props) {
  const data = await fetchAllCategory()
  const categories = data?.categories ?? []

  return (
    <section className="px-5 pt-5 md:px-[70px] lg:px-10">
      <NavList categories={categories} followingMembers={followingMembers} />
    </section>
  )
}
