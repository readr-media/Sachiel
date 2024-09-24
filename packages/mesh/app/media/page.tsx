import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { type GetAllCategoriesQuery } from '@/graphql/__generated__/graphql'

import getAllCategories from '../actions/get-all-categories'
import MediaStories from './_components/media-stories'

//TODO: cache setting
export const revalidate = 0

export type Category = NonNullable<GetAllCategoriesQuery['categories']>[number]

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) redirect('/login')

  const allCategoriesResponse = await getAllCategories()
  const allCategories = allCategoriesResponse?.categories ?? []

  return <MediaStories allCategories={allCategories} />
}
