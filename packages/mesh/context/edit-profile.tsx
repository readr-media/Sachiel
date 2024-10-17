'use client'
import { useParams, useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { deletePhoto, updateProfile } from '@/app/actions/edit-profile'
import { IMAGE_SIZE_LIMITATION } from '@/constants/profile'
import { useForm } from '@/hooks/use-form'
import useProfileState from '@/hooks/use-profile-state'
import type {
  EditProfileContextType,
  EditProfileFormTypes,
} from '@/types/profile'
import { profileFormValidation } from '@/utils/profile-form-validate'

import { useUser } from './user'

const EditProfileContext = createContext<EditProfileContextType | undefined>(
  undefined
)

export const EditProfileProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const router = useRouter()
  const params = useParams()
  const { user, setUser } = useUser()
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const customId = String(params.customId)
  const formData = formRef.current ? new FormData(formRef.current) : null

  const {
    visitorProfile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfileState({
    memberId: customId,
    takesCount: 20,
  })

  const initialData = {
    name: user.name || '',
    customId: user.customId || '',
    intro: user.intro || '',
    avatar: user.avatar || '',
  }

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
    if (!formData) return
    const avatarInput = document.getElementById('avatar') as HTMLInputElement
    const avatarFile = avatarInput.files?.[0]

    if (avatarFile) formData.append('avatar', avatarFile)

    if (!validateForm() || !isFormDataChanged()) {
      return
    }

    try {
      if (!formData.get('customId')) return
      setIsSubmitting(true)
      await updateProfile(formData, user.customId, user.memberId)

      setUser((prev) => ({
        ...prev,
        name: String(formData.get('name')),
        avatar: editProfileForm.avatar,
        intro: String(formData.get('intro')),
        customId: String(formData.get('customId')),
      }))
      router.push(`/profile/member/${formData.get('customId')}`)
    } catch (error) {
      router.push(`/profile/member/${user.customId}`)
      console.error('Failed to update profile:', error)
    }
  }

  useEffect(initializeProfileData, [
    user.avatar,
    user.intro,
    user.customId,
    user.name,
  ])

  return (
    <EditProfileContext.Provider
      value={{
        editProfileForm,
        errors,
        isFormValid,
        visitorProfile,
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
