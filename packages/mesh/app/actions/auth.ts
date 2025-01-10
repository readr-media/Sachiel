'use server'
import type { FirebaseError } from 'firebase-admin/app'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { type Hex } from 'viem'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { SECOND } from '@/constants/time-unit'
import { type UserFormData } from '@/context/login'
import { getAdminAuth } from '@/firebase/server'
import {
  type MemberCreateInput,
  GetCurrentUserMemberIdDocument,
  SignUpMemberDocument,
  UpdateWalletAddressDocument,
} from '@/graphql/__generated__/graphql'
import { BookmarkObjective, PickObjective } from '@/types/objective'
import { mutateGraphQL } from '@/utils/fetch-graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

import { generateInvitationCodes } from './invitation-code'
import { invalidateInvitationCode } from './invitation-code'
import { getAllPublishers } from './publisher'

export async function validateIdToken(
  token: string
): Promise<{ status: 'verified' | 'expired' | 'error' }> {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const decodedToken = await getAdminAuth().verifyIdToken(token)
    if (decodedToken) {
      return { status: 'verified' }
    } else {
      return { status: 'error' }
    }
  } catch (error) {
    const err = error as FirebaseError
    logServerSideError(
      error,
      'Failed to verify firebase token',
      globalLogFields
    )
    if (err.code === 'auth/id-token-expired') {
      return { status: 'expired' }
    } else {
      return { status: 'error' }
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

export async function getAccessToken(idToken: string) {
  const response = (await fetchRestfulPost(
    RESTFUL_ENDPOINTS.accessToken,
    {},
    {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
    'Fail to get access token'
  )) as { token: string }

  if (!response) return undefined
  const accessToken = response.token
  const decodedAccessToken = jwt.decode(accessToken, { json: true })
  let expiresDate = undefined
  if (decodedAccessToken?.exp) {
    expiresDate = new Date(decodedAccessToken.exp * 1000)
  }

  cookies().set('token', accessToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    expires: expiresDate,
  })

  return accessToken
}

export async function getCurrentUser() {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const accessToken = cookies().get('token')?.value

  if (!accessToken) return undefined

  const decodedAccessToken = jwt.decode(accessToken, { json: true })
  if (!decodedAccessToken?.exp || decodedAccessToken.exp < Date.now() / 1000) {
    return undefined
  }

  try {
    const uid = decodedAccessToken.uid
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
        firebaseId: uid,
        email: data.member.email ?? '',
        avatar: data.member.avatar ?? '',
        avatarImageId: data.member.avatar_image?.id ?? '',
        intro: data.member.intro ?? '',
        wallet: data.member.wallet ?? '',
        followingMemberIds: new Set(
          data.member.followingMembers?.map((member) => member.id) ?? []
        ),
        pickStoryIds: new Set(
          data.member.picks
            ?.filter((pick) => pick.objective === PickObjective.Story)
            .map((pick) => pick.story?.id ?? '') ?? []
        ),
        pickCollectionIds: new Set(
          data.member.picks
            ?.filter((pick) => pick.objective === PickObjective.Collection)
            .map((pick) => pick.collection?.id ?? '') ?? []
        ),
        bookmarkStoryIds: new Set(
          data.member.bookmarks
            ?.filter(
              (bookmark) => bookmark.objective === BookmarkObjective.Story
            )
            .map((bookmark) => bookmark.story?.id ?? '') ?? []
        ),
        bookmarkCollectionIds: new Set(
          data.member.bookmarks
            ?.filter(
              (bookmark) => bookmark.objective === BookmarkObjective.Collection
            )
            .map((bookmark) => bookmark.collection?.id ?? '') ?? []
        ),
        followingCategories: data.member.followingCategories ?? [],
        followingPublishers: data.member.followingPublishers ?? [],
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

export async function signUpMember(
  formData: UserFormData,
  idToken: string | undefined
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
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
      customId: nanoid(8),
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

    const data = await mutateGraphQL(
      SignUpMemberDocument,
      { registrationData },
      globalLogFields,
      'Failed to sign up new member'
    )

    if (!data?.createMember) return undefined

    const { createMember } = data

    await invalidateInvitationCode(formData.code.id, createMember.id)
    await generateInvitationCodes()

    // 更新 backend db 用戶資訊
    const pubSubResponse = await fetchRestfulPost(
      RESTFUL_ENDPOINTS.pubsub,
      {
        action: 'update_member',
        memberId: createMember.id,
      },
      { cache: 'no-cache' },
      'Failed to update_member via pub/sub'
    )

    if (!pubSubResponse) throw new Error('PubSub update member failed')

    return createMember
  } catch (error) {
    logServerSideError(
      error,
      'Failed to verify firebase token',
      globalLogFields
    )
    return undefined
  }
}

export async function updateMemberWallet(id: string, wallet: Hex) {
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

export async function getStoryAccess(idToken: string, storyId: string) {
  let isMatch = false
  let attempt = 0
  //TODO: integrate with new api later
  while (!isMatch && attempt < 20) {
    const accessToken = await getAccessToken(idToken)
    if (!accessToken) break

    const decodedAccessToken = jwt.decode(accessToken, { json: true })

    if (!decodedAccessToken || !decodedAccessToken.story) return undefined

    isMatch = decodedAccessToken.story.some(
      (arr: [string, number]) => arr[0] === storyId
    )

    if (isMatch) {
      const expiresDate = decodedAccessToken.exp
        ? new Date(decodedAccessToken.exp * SECOND)
        : undefined

      cookies().set('token', accessToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        expires: expiresDate,
      })

      return accessToken
    }
    attempt++
    await new Promise((resolve) => setTimeout(resolve, SECOND))
  }

  return undefined
}

export async function deactiveMember(memberId: string) {
  const pubSubResponse = await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    {
      action: 'remove_member',
      memberId: memberId,
    },
    { cache: 'no-cache' },
    `Failed to deactive_member via pub/sub, memberId:${memberId}`
  )

  if (!pubSubResponse) {
    return { success: false }
  }

  return { success: true }
}
