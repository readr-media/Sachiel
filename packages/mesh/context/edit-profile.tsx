'use client'

import { useParams, useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { deletePhoto, updateProfile } from '@/app/actions/edit-profile'
import { IMAGE_SIZE_LIMITATION } from '@/constants/profile'
import TOAST_MESSAGE from '@/constants/toast'
import { useForm } from '@/hooks/use-form'
import useProfileState from '@/hooks/use-profile-state'
import type {
  EditProfileContextType,
  EditProfileFormTypes,
} from '@/types/profile'
import { profileFormValidation } from '@/utils/profile-form-validate'

import { useToast } from './toast'
import { useUser } from './user'

const EditProfileContext = createContext<EditProfileContextType | undefined>(
  undefined
)

export const EditProfileProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const router = useRouter()
  const { user, setUser } = useUser()
  const params = useParams()
  const customId = String(params.customId)
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()
  const formData = formRef.current ? new FormData(formRef.current) : null

  const {
    profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfileState({
    customId,
    takesCount: 20,
  })

  const initialData = useMemo(
    () => ({
      name: user.name || '',
      customId: user.customId || '',
      intro: user.intro || '',
      avatar: user.avatar || '',
    }),
    [user.name, user.customId, user.intro, user.avatar]
  )

  const {
    form: editProfileForm,
    errors,
    isFormValid,
    validateForm,
    updateField,
    resetForm,
    updateErrors,
    isFormDataChanged,
    resetErrors,
  } = useForm(initialData, profileFormValidation)

  /**
   * 記住初始的表單資料，如果沒有修改過表單應該要讓他不能送出
   */
  const originalProfileData = useRef<EditProfileFormTypes>()

  const initializeProfileData = () => {
    resetForm()
    resetErrors()
    originalProfileData.current = initialData
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > IMAGE_SIZE_LIMITATION) {
      updateErrors('avatar', '上傳的檔案大小須小於 10MB')
      // when file exceeds the limitation, will not show the image.
      return
    }

    // if (file && file.type.startsWith('image/')) {
    //   const imageUrl = URL.createObjectURL(file) // Create a temporary URL for the image file
    //   document.querySelector('#test-image').src = imageUrl
    //   console.log(imageUrl)
    // }
    const reader = new FileReader()
    reader.onloadend = () => {
      updateField('avatar', String(reader.result))
    }
    reader.readAsDataURL(file)
  }

  const clearFormInput = (key: 'name' | 'customId' | 'intro') => {
    updateField(key, '')
  }
  const trimIfOnlyWhitespace = (str: string): string => {
    if (/^\s*$/.test(str)) {
      return ''
    }
    return str
  }
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const trimmedValue =
      name === 'customId' ? value.trim() : trimIfOnlyWhitespace(value)
    updateField(name as 'name' | 'customId' | 'intro', trimmedValue)
  }

  const handleDeletePhoto = () => {
    deletePhoto(user.customId || '')
    updateField('avatar', '')
  }

  const handleSubmit = async () => {
    try {
      // 1. 表單驗證
      if (!formData) {
        console.warn('Form data is missing')
        return
      }

      const newCustomId = formData.get('customId')
      if (!newCustomId) {
        console.warn('Custom ID is required')
        return
      }

      if (!(await validateForm()) || !isFormDataChanged()) {
        console.warn('Form validation failed or no changes detected')
        return
      }

      // 2. 處理avatar上傳
      const avatarInput = document.getElementById('avatar') as HTMLInputElement
      const avatarFile = avatarInput?.files?.[0]
      if (avatarFile) {
        formData.append('avatar', avatarFile)
      }

      // 3. state
      setIsSubmitting(true)

      // 4. api
      await updateProfile(formData, user.customId, user.memberId)

      // 5. new profile data
      const newUserData = {
        name: String(formData.get('name')),
        avatar: editProfileForm.avatar,
        intro: String(formData.get('intro')),
        customId: String(newCustomId),
      }

      // 6. 更新local state
      setUser((prev) => ({
        ...prev,
        ...newUserData,
      }))

      // 7. 使用 Promise 確保導航時序正確
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          router.push(`/profile/member/${newCustomId}`)
          resolve()
        }, 100)
      })
    } catch (error) {
      console.error('Failed to update profile:', error)
      addToast({ status: 'fail', text: TOAST_MESSAGE.updateProfileFailed })
      router.push(`/profile/member/${user.customId}`)
    } finally {
      // 9. 清理狀態
      setIsSubmitting(false)
    }
  }

  useEffect(initializeProfileData, [
    user.avatar,
    user.intro,
    user.customId,
    user.name,
    initialData,
    resetErrors,
    resetForm,
  ])

  return (
    <EditProfileContext.Provider
      value={{
        editProfileForm,
        errors,
        isFormValid,
        profileData,
        isProfileLoading,
        formRef,
        isSubmitting,
        updateErrors,
        updateField,
        handleSubmit,
        initializeProfileData,
        handleAvatarChange,
        clearFormInput,
        handleDeletePhoto,
        handleInputChange,
        isProfileError,
      }}
    >
      {children}
    </EditProfileContext.Provider>
  )
}

export const useEditProfile = () => {
  const context = useContext(EditProfileContext)
  if (context === undefined) {
    throw new Error('useEditProfile must be used within an EditProfileProvider')
  }
  return context
}
