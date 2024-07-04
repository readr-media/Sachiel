'use server'

import { GetMemberByFollowingCategoryDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export default async function getMemberByFollowingCategory(
  slugs: string | string[]
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await fetchGraphQL(
    GetMemberByFollowingCategoryDocument,
    { slugs },
    globalLogFields,
    'Failed to get members by following categories'
  )
  return data
}
