'use server'

import {
  GetMemberProfileDocument,
  GetVisitorProfileDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function getMemberProfile(memberId: string, takes: number) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const result = await queryGraphQL(GetMemberProfileDocument, {
      customId: memberId,
      takes,
    })
    const memberData = result?.member
    if (!memberData) throw new Error('something wrong with GetMemberProfile')

    return {
      intro: memberData.intro || '',
      pickCount: memberData.picksCount || 0,
      followerCount: memberData.followerCount || 0,
      followingCount: memberData.followingCount || 0,
      picksData: memberData.picks || [],
      bookmarks: memberData.books || [],
    }
  } catch (error) {
    logServerSideError(error, 'Failed to get member profile', globalLogFields)
  }
}

export async function getVisitorProfile(visitorId: string, takes: number) {
  try {
    const result = await queryGraphQL(GetVisitorProfileDocument, {
      customId: visitorId,
      takes,
    })
    return result
  } catch (error) {
    console.error('get visitor profile data failed: ', error)
  }
}
