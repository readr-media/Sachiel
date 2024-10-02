'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import { type Story } from './get-latest-stories-in-category'

export default async function getMostPickedStoriesInCategory(
  categorySlug: string
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return fetchStatic<Story[]>(
    STATIC_FILE_ENDPOINTS.mostPickStoriesInCategoryFn(categorySlug),
    { next: { revalidate: 10 } },
    globalLogFields
  )
}
