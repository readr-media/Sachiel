'use server'
import {
  ConnectMemberAvatarDocument,
  CreatePhotoDocument,
  DeletePhotoDocument,
  UpdateMemberProfileDocument,
} from '@/graphql/__generated__/graphql'
import { type FormData } from '@/types/profile'
import base64ToFile from '@/utils/base-sixty-four-to-file'
import { mutateGraphQL } from '@/utils/fetch-graphql'

export async function updateProfile(
  formData: FormData,
  currentCustomId: string
) {
  try {
    let imageId = ''
    let imageOriginUrl = ''
    if (formData.avatar.startsWith('data:')) {
      try {
        const file = await base64ToFile(
          formData.avatar,
          `${currentCustomId}'s avatar`
        )
        const result = await mutateGraphQL(CreatePhotoDocument, {
          image: file,
          imageName: `${formData['name']}'s avatar`,
        })
        imageId = result?.createPhoto?.id || ''
        imageOriginUrl = result?.createPhoto?.resized?.original || ''
        await mutateGraphQL(ConnectMemberAvatarDocument, {
          customId: formData['customId'],
          imageId,
          imageOriginUrl,
        })
      } catch (error) {
        console.error('update avatar failed', error)
      }
    }
    const result = await mutateGraphQL(UpdateMemberProfileDocument, {
      changedCustomId: formData['customId'],
      name: formData['name'],
      customId: currentCustomId,
      intro: formData['intro'],
    })
    return result
  } catch (error) {
    console.error('updateProfile failed:', error)
    throw error
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
