'use server'

import { RESTFUL_ENDPOINTS, STATIC_FILE_ENDPOINTS } from '@/constants/config'
import {
  type MongoDBResponse,
  type MostFollowersMember,
  MongoDBResponseSchema,
  mostFollowersMemberSchema,
} from '@/utils/data-schema'
import { fetchRestfulGet } from '@/utils/fetch-restful'
import fetchStatic from '@/utils/fetch-static'

export async function getSocialPageData(memberId: string) {
  const url = RESTFUL_ENDPOINTS.socialPage + memberId
  const data = await fetchRestfulGet<MongoDBResponse>(url)
  const parseResult = MongoDBResponseSchema.safeParse(data)
  if (parseResult.success) {
    return parseResult.data
  } else {
    console.error('Validation error:', parseResult.error.errors)
    return null
  }
}

export async function getMostFollowersData() {
  const data = await fetchStatic<MostFollowersMember[]>(
    STATIC_FILE_ENDPOINTS.mostFollowers,
    {
      next: { revalidate: 10 },
    }
  )
  const parseResult = mostFollowersMemberSchema.safeParse(data)
  if (parseResult.success) {
    return parseResult.data
  } else {
    console.error('Validation error:', parseResult.error.errors)
    return null
  }
}
