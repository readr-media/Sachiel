import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import {
  type GetAllCategoriesQuery,
  GetAllCategoriesDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import MediaStories from './_components/media-stories'

//TODO: cache setting
export const revalidate = 0

export type Category = NonNullable<GetAllCategoriesQuery['categories']>[number]

export default async function Page() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const user = await getCurrentUser()

  if (!user) redirect('/login')

  const allCategoriesResponse = await queryGraphQL(
    GetAllCategoriesDocument,
    undefined,
    globalLogFields
  )
  const allCategories = allCategoriesResponse?.categories ?? []

  return <MediaStories allCategories={allCategories} />
}
