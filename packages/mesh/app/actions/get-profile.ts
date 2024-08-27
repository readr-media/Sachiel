'use server'

import { notFound } from 'next/navigation'

import { GetMemberProfileDocument } from '@/graphql/__generated__/graphql'
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
    // if member data not found bubble this error to nextjs error handling
    if (!memberData) notFound()

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
    throw error
  }
}

export async function getVisitorProfile(visitorId: string, takes: number) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const result = await queryGraphQL(GetMemberProfileDocument, {
      customId: visitorId,
      takes,
    })
    // if visitor data not found bubble this error to nextjs error handling
    if (!result?.member) notFound()

    return result
  } catch (error) {
    logServerSideError(error, 'Failed to get visitor profile', globalLogFields)
    throw error
  }
}
