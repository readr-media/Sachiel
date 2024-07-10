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
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import admin from '../../firebase/server'

export async function validateIdToken(token: string): Promise<{
  ok: boolean
  status: 'refresh' | 'verified' | 'error'
  message: string
}> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)

    if (decodedToken.exp * 1000 < Date.now()) {
      return { ok: false, status: 'refresh', message: 'need to refresh token' }
    }

    cookies().set('token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: DAY,
    })
    return { ok: true, status: 'verified', message: 'token verified' }
  } catch (error) {
    return {
      ok: false,
      status: 'error',
      message: `verify token Error: ${error}`,
    }
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

export async function getCurrentUserMemberId() {
  const idToken = cookies().get('token')?.value
  if (!idToken) return undefined

  const { uid } = await admin.auth().verifyIdToken(idToken)
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await fetchGraphQL(
    GetCurrentUserMemberIdDocument,
    { uid },
    globalLogFields,
    'Failed to get current user member id'
  )
  return data?.member?.id
}

export async function signUpMember(formData: UserFormData) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const idToken = cookies().get('token')?.value
  if (!idToken) return undefined
  const decodedToken = await admin.auth().verifyIdToken(idToken)

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
  }

  const data = await fetchGraphQL(
    SignUpMemberDocument,
    { registrationData },
    globalLogFields,
    'Failed to sign up new member'
  )

  return data?.createMember
}
