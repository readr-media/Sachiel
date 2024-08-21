'use server'

import { GetMemberUnlockStoriesDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function getMemberUnlockStories(
  memberId: string,
  take: number,
  prev?: number
) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await fetchGraphQL(
    GetMemberUnlockStoriesDocument,
    {
      memberId,
      take,
    },
    globalLogFields,
    'Failed to get unlock stories'
  )
  const unlockStoriesResponse = prev
    ? response?.member?.transaction?.slice(prev) || []
    : response?.member?.transaction || []
  const unlockStories =
    unlockStoriesResponse
      ?.map((data) => {
        if (data.unlockStory && data.unlockStory.source) {
          return {
            ...data.unlockStory,
            expireDate: data.expireDate,
          }
        }
      })
      .filter(Boolean) ?? []

  return unlockStories
}
