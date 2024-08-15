'use server'

import { GetMemberByFollowingCategoryDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export default async function getMemberByFollowingCategory(
  slugs: string | string[]
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    GetMemberByFollowingCategoryDocument,
    { slugs },
    globalLogFields,
    'Failed to get members by following categories'
  )
  return data
}
