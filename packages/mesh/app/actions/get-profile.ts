'use server'

import { GetMemberProfileDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'

export async function getMemberProfile(memberId: string, takes: number) {
  try {
    const result = await queryGraphQL(GetMemberProfileDocument, {
      customId: memberId,
      takes,
    })
    return result
  } catch (error) {
    console.error('get member profile data failed: ', error)
  }
}

export async function getVisitorProfile(visitorId: string, takes: number) {
  try {
    const result = await queryGraphQL(GetMemberProfileDocument, {
      customId: visitorId,
      takes,
    })
    return result
  } catch (error) {
    console.error('get visitor profile data failed: ', error)
  }
}
