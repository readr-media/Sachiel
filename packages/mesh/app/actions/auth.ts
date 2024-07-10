'use server'
import { cookies } from 'next/headers'

import { DAY } from '@/constants/time-unit'
import { GetCurrentUserMemberIdDocument } from '@/graphql/__generated__/graphql'
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
      message: `handleToken Error: ${error}`,
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

export default async function getCurrentUserMemberId() {
  const idToken = cookies().get('token')?.value
  if (!idToken) return ''

  const { uid } = await admin.auth().verifyIdToken(idToken)

  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await fetchGraphQL(
    GetCurrentUserMemberIdDocument,
    { uid },
    globalLogFields,
    'Failed to get all categories'
  )
  return data?.member?.id
}
