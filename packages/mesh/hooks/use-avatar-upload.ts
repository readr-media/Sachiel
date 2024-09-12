import { useCallback } from 'react'

import { deletePhoto } from '@/app/actions/edit-profile'
import { IMAGE_SIZE_LIMITATION } from '@/constants/profile'

export const useEditProfileAvatar = (
  updateField: (field: 'avatar', value: string) => void
) => {
  const handleAvatarChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      if (file.size > IMAGE_SIZE_LIMITATION) {
        console.error('上傳的檔案大小須小於 10MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        updateField('avatar', reader.result as string)
      }
      reader.readAsDataURL(file)
    },
    [updateField]
  )

  const handleDeletePhoto = useCallback(
    (customId: string) => {
      deletePhoto(customId)
      updateField('avatar', '')
    },
    [updateField]
  )

  return { handleAvatarChange, handleDeletePhoto }
}
