'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import type { PublishersQuery } from '@/graphql/__generated__/graphql'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export type Publisher = NonNullable<PublishersQuery['publishers']>[number]

export default async function getMostSponsorPublishers() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  return fetchStatic<Publisher[]>(
    STATIC_FILE_ENDPOINTS.mostSponsorPublishers,
    {
      next: { revalidate: 10 },
    },
    globalLogFields
  )
}
