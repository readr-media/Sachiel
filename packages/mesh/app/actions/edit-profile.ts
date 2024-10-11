'use server'
import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  ConnectMemberAvatarDocument,
  CreatePhotoDocument,
  DeletePhotoDocument,
  GetMemberProfileDocument,
  UpdateMemberProfileDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL, { mutateGraphQL } from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function updateProfile(
  formData: FormData,
  currentCustomId: string,
  memberId: string
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    // only when has avatar
    if (formData.get('avatar')) {
      let imageId = ''
      let imageOriginUrl = ''
      try {
        const result = await mutateGraphQL(CreatePhotoDocument, {
          image: formData.get('avatar'),
          imageName: `${formData.get('name')}'s avatar`,
        })
        imageId = result?.createPhoto?.id || ''
        imageOriginUrl = result?.createPhoto?.resized?.original || ''
        await mutateGraphQL(ConnectMemberAvatarDocument, {
          customId: String(formData.get('customId')),
          imageId,
          imageOriginUrl,
        })
      } catch (error) {
        logServerSideError(error, 'update avatar failed', globalLogFields)
      }
    }
    // default action
    const result = await mutateGraphQL(UpdateMemberProfileDocument, {
      changedCustomId: String(formData.get('customId')),
      name: String(formData.get('name')),
      customId: currentCustomId,
      intro: String(formData.get('intro')),
    })
    // add pub/sub update member
    const payload = { action: 'update_member', memberId }
    fetchRestfulPost(
      RESTFUL_ENDPOINTS.pubsub,
      payload,
      { cache: 'no-cache' },
      'Failed to add pick state via pub/sub'
    )
    return result
  } catch (error) {
    logServerSideError(error, 'updateProfile failed:', globalLogFields)
  }
}

export async function deletePhoto(memberId: string) {
  try {
    await mutateGraphQL(DeletePhotoDocument, {
      memberId,
    })
  } catch (error) {
    console.error(`deletePhoto failed: ${error}`)
  }
}

export async function getMemberProfile(customId: string, takes: number) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const result = await queryGraphQL(GetMemberProfileDocument, {
      customId,
      takes,
    })
    const memberData = result?.member
    if (!memberData) throw new Error('something wrong with GetMemberProfile')

    return {
      intro: memberData.intro,
      pickCount: memberData.picksCount,
      followerCount: memberData.followerCount,
      followingCount: memberData.followingCount,
      picksData: memberData.picks,
      bookmarks: memberData.books,
    }
  } catch (error) {
    logServerSideError(error, 'Failed to get member profile', globalLogFields)
  }
}
