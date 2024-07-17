'use server'
import { cookies } from 'next/headers'

import { DAY } from '@/constants/time-unit'
import { type UserFormData } from '@/context/login'
import {
  type MemberCreateInput,
  GetCurrentUserMemberIdDocument,
  SignUpMemberDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

import admin from '../../firebase/server'

export async function validateIdToken(
  token: string
): Promise<{ status: 'verified' | 'expired' | 'error' }> {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)

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
    const { uid } = await admin.auth().verifyIdToken(idToken)
    const data = await fetchGraphQL(
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
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    const defaultPublishers = [
      '1',
      '2',
      '4',
      '81',
      '82',
      '83',
      '84',
      '85',
      '86',
      '87',
      '88',
      '89',
      '90',
      '91',
      '92',
    ]

    const registrationData: MemberCreateInput = {
      firebaseId: decodedToken.uid,
      name: decodedToken.name,
      nickname: decodedToken.name,
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
        connect: defaultPublishers.map((id) => ({ id })),
      },
    }

    const data = await fetchGraphQL(
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
