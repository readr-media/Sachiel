'use server'

import type { MemberLanguageType } from '@/graphql/__generated__/graphql'
import { SetMemberLanguageDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function updateMemberLanguage(
  userId: string,
  language: MemberLanguageType
) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    const data = await queryGraphQL(
      SetMemberLanguageDocument,
      { userId, language },
      globalLogFields,
      'Failed to sign up new member'
    )
    return data?.updateMember
  } catch (error) {
    logServerSideError(error, 'Failed to update member wallet', globalLogFields)
    return undefined
  }
}
