'use server'
import { cookies } from 'next/headers'

import { DAY } from '@/constants/time-unit'
import { type UserFormData } from '@/context/login'
import { getAdminAuth } from '@/firebase/server'
import {
  type MemberCreateInput,
  GetCurrentUserMemberIdDocument,
  SignUpMemberDocument,
  UpdateWalletAddressDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

import getAllPublishers from './get-all-publishers'

export async function validateIdToken(
  token: string
): Promise<{ status: 'verified' | 'expired' | 'error' }> {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const decodedToken = await getAdminAuth().verifyIdToken(token)

    if (decodedToken.exp * 1000 < Date.now()) {
      return { status: 'expired' }
    }

    cookies().set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: DAY,
    })
    return { status: 'verified' }
  } catch (error) {
    logServerSideError(
      error,
      'Failed to verify firebase token',
      globalLogFields
    )
    return { status: 'error' }
  }
}

export async function clearTokenCookie() {
  cookies().set('token', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 0,
  })
}

export async function getCurrentUser() {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const idToken = cookies().get('token')?.value

  if (!idToken) return undefined

  try {
    const { uid } = await getAdminAuth().verifyIdToken(idToken)
    const data = await queryGraphQL(
      GetCurrentUserMemberIdDocument,
      { uid },
      globalLogFields,
      'Failed to get current user member id'
    )
    if (data?.member) {
      return {
        memberId: data.member.id,
        customId: data.member.customId ?? '',
        name: data.member.name ?? '',
        avatar: data.member.avatar ?? '',
        avatarImageId: data.member.avatar_image?.id ?? '',
        intro: data.member.intro ?? '',
        wallet: data.member.wallet ?? '',
        followingMemberIds: new Set(
          data.member.followingMembers?.map((member) => member.id) ?? []
        ),
        pickStoryIds: new Set(
          data.member.picks?.map((pick) => pick.story?.id ?? '') ?? []
        ),
        followingCategories: data.member.followingCategories ?? [],
        followingPublishers: data.member.followingPublishers ?? [],
        idToken,
      }
    } else {
      return undefined
    }
  } catch (error) {
    logServerSideError(
      error,
      'Failed to verify firebase token',
      globalLogFields
    )
    return undefined
  }
}

export async function signUpMember(formData: UserFormData) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const idToken = cookies().get('token')?.value

  if (!idToken) return undefined

  try {
    const decodedToken = await getAdminAuth().verifyIdToken(idToken)

    //TODO: sync with different environment JSON/Class
    const publishersData = (await getAllPublishers()) ?? []

    const registrationData: MemberCreateInput = {
      firebaseId: decodedToken.uid,
      name: decodedToken.name || formData.name,
      nickname: formData.name,
      email: decodedToken.email,
      customId: decodedToken.email?.split('@')[0],
      avatar: decodedToken.picture,
      following: {
        connect: formData.followings.map((id) => ({ id })),
      },
      following_category: {
        connect: formData.interests.map((id) => ({ id })),
      },
      follow_publisher: {
        connect: publishersData.map((data) => ({ id: data.id })),
      },
    }

    const data = await queryGraphQL(
      SignUpMemberDocument,
      { registrationData },
      globalLogFields,
      'Failed to sign up new member'
    )

    return data?.createMember
  } catch (error) {
    logServerSideError(
      error,
      'Failed to verify firebase token',
      globalLogFields
    )
    return undefined
  }
}

export async function updateMemberWallet(id: string, wallet: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const idToken = cookies().get('token')?.value

  if (!idToken) return undefined
  try {
    const data = await queryGraphQL(
      UpdateWalletAddressDocument,
      { id, wallet },
      globalLogFields,
      'Failed to sign up new member'
    )
    return data?.updateMember
  } catch (error) {
    logServerSideError(error, 'Failed to update member wallet', globalLogFields)
    return undefined
  }
}
