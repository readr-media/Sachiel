'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  type MostSponsorPublisher,
  mostSponsorPublishersSchema,
} from '@/utils/data-schema'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export default async function getMostSponsorPublishersAndStories() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const response = await fetchStatic<MostSponsorPublisher[]>(
      STATIC_FILE_ENDPOINTS.mostSponsorPublishers,
      {
        next: { revalidate: 10 },
      },
      globalLogFields
    )
    return mostSponsorPublishersSchema.parse(response)
  } catch (error) {
    logServerSideError(
      error,
      'Error on validate most_recommend_sponsors.json',
      globalLogFields
    )
    return null
  }
}
