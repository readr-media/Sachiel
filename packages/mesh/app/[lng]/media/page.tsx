import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import getAllCategories from '@/app/actions/get-all-categories'
import { getAllPublishers, getExcludePublishers } from '@/app/actions/publisher'
import { NEXT_PAGES_REVALIDATE } from '@/constants/config'
import { type GetAllCategoriesQuery } from '@/graphql/__generated__/graphql'
import { getLoginUrl } from '@/utils/get-url'

import MediaStories from './_components/media-stories'

export const revalidate = NEXT_PAGES_REVALIDATE.media

export type Category = NonNullable<GetAllCategoriesQuery['categories']>[number]

export default async function Page({ params }: { params: { lng: string } }) {
  const user = await getCurrentUser()

  if (!user) redirect(getLoginUrl(params.lng))

  const allCategoriesResponse = await getAllCategories()
  const allCategories = allCategoriesResponse?.categories ?? []
  const allPublishers = await getAllPublishers()
  const excludePublishers = await getExcludePublishers(user.memberId)
  const excludedIdsSet = new Set(excludePublishers.map((exclude) => exclude.id))
  const publisherList = allPublishers
    .filter((publisher) => !excludedIdsSet.has(publisher.id))
    .slice(0, 5)

  return (
    <MediaStories allCategories={allCategories} publisherList={publisherList} />
  )
}
