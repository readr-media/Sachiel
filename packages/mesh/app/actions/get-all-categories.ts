'use server'

import { GetAllCategoriesDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export default async function getAllCategories() {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    GetAllCategoriesDocument,
    undefined,
    globalLogFields,
    'Failed to get all categories'
  )
  return data
}
