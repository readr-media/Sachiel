'use server'

import {
  GetMemberFollowingDocument,
  GetMemberFollowingListDocument,
  GetMemberForOgDocument,
  GetMemberProfileDocument,
  GetPublisherForOgDocument,
  GetPublishersDocument,
  GetVisitorProfileDocument,
} from '@/graphql/__generated__/graphql'
import { PickObjective } from '@/types/objective'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function getMemberProfile(customId: string, takes: number) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const result = await queryGraphQL(GetMemberProfileDocument, {
      customId,
      takes,
    })
    const memberData = result?.member
    // if member data not found bubble this error to nextjs error handling
    if (!memberData) {
      return null
    }

    return {
      intro: memberData.intro || '',
      pickCount: memberData.picksCount || 0,
      followerCount: memberData.followerCount || 0,
      followingCount: memberData.followingCount || 0,
      picksData: memberData.picks || [],
      bookmarks: memberData.books || [],
      collections: result.collections ?? [],
      pickCollections:
        memberData.picks?.filter(
          (pick) => pick.objective === PickObjective.Collection
        ) ?? [],
      publishers: memberData.publishers || [],
    }
  } catch (error) {
    logServerSideError(error, 'Failed to get member profile', globalLogFields)
    throw error
  }
}

export async function getVisitorProfile(customId: string, takes: number) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const result = await queryGraphQL(GetVisitorProfileDocument, {
      customId,
      takes,
    })
    // if visitor data not found bubble this error to nextjs error handling
    if (!result?.member) {
      return null
    }
    return result
  } catch (error) {
    logServerSideError(error, 'Failed to get visitor profile', globalLogFields)
    throw error
  }
}

export async function getMemberForOG(customId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const result = await queryGraphQL(GetMemberForOgDocument, {
      memberCustomId: customId,
    })
    // if visitor data not found bubble this error to nextjs error handling
    if (!result?.member) {
      return null
    }
    return result
  } catch (error) {
    logServerSideError(error, 'Failed to get visitor profile', globalLogFields)
    throw error
  }
}

export async function getPublisherForOG(customId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const result = await queryGraphQL(GetPublisherForOgDocument, {
      publisherCustomId: customId,
    })
    // if visitor data not found bubble this error to nextjs error handling
    if (!result?.publishers || !result.publishers[0]) {
      return null
    }
    return result
  } catch (error) {
    logServerSideError(error, 'Failed to get visitor profile', globalLogFields)
    throw error
  }
}

export async function getMemberFollowingList(customId: string, take: number) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const response = await queryGraphQL(GetMemberFollowingListDocument, {
      customId,
      take,
    })
    return response
  } catch (error) {
    logServerSideError(
      error,
      'Failed to get member following list',
      globalLogFields
    )
    throw error
  }
}

export async function getMoreMemberFollowing(
  customId: string,
  take: number,
  skip: number
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const response = await queryGraphQL(GetMemberFollowingDocument, {
      customId,
      take,
      skip,
    })
    return response
  } catch (error) {
    logServerSideError(
      error,
      'Failed to get member following loadmre',
      globalLogFields
    )
    throw error
  }
}

export async function getPublishers({
  publisherCustomIds,
}: {
  publisherCustomIds: string[]
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const response = await queryGraphQL(GetPublishersDocument, {
      publisherCustomIds,
    })
    return response?.publishers || []
  } catch (error) {
    logServerSideError(error, 'Failed to get publishers', globalLogFields)
    throw error
  }
}
