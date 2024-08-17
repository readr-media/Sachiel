'use client'
import { useParams, useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { createContext, useContext, useEffect, useRef } from 'react'

import { deletePhoto, updateProfile } from '@/app/actions/edit-profile'
import { IMAGE_SIZE_LIMITATION } from '@/constants/profile'
import { useForm } from '@/hooks/use-form'
import useProfileState from '@/hooks/use-profile-state'
import type { EditProfileFormTypes, ProfileTypes } from '@/types/profile'
import { profileFormValidation } from '@/utils/profile-form-validate'

import { useUser } from './user'

type EditProfileContextType = {
  editProfileForm: EditProfileFormTypes
  visitorProfile: ProfileTypes
  isFormValid: boolean
  errors: Partial<EditProfileFormTypes>
  isProfileLoading: boolean
  updateErrors: (
    key: 'name' | 'customId' | 'intro' | 'avatar',
    errorMessage: string
  ) => void
  updateField: (field: keyof EditProfileFormTypes, value: string) => void
  handleSubmit: (formData: FormData) => Promise<void>
  initializeProfileData: () => void
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void
  clearFormInput: (key: 'name' | 'customId' | 'intro') => void
  handleDeletePhoto: (avatarImageId?: string) => void
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

const EditProfileContext = createContext<EditProfileContextType | undefined>(
  undefined
)

export const EditProfileProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const router = useRouter()
  const params = useParams()
  const customId = String(params.customId)
  const { user, setUser } = useUser()

  const { visitorProfile, isLoading: isProfileLoading } = useProfileState({
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

  const originalProfileData = useRef<EditProfileFormTypes>()

  const initializeProfileData = () => {
    resetForm()
    resetErrors()
    originalProfileData.current = initialData
  }

  // TODO: extract to custom hook
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > IMAGE_SIZE_LIMITATION) {
      updateErrors('avatar', '上傳的檔案大小須小於 10MB')
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    updateField(name as 'name' | 'customId' | 'intro', value.trim())
  }

  const handleDeletePhoto = () => {
    deletePhoto(user.customId || '')
    updateField('avatar', '')
  }

  const handleSubmit = async (formData: FormData) => {
    if (!('get' in formData)) return
    const avatarInput = document.getElementById('avatar') as HTMLInputElement
    const avatarFile = avatarInput.files?.[0]

    // NOTE: with FormData we can pass image from client to server
    if (avatarFile) formData.append('avatar', avatarFile)

    if (!validateForm() || !isFormDataChanged()) {
      return
    }

    try {
      if (!formData.get('customId')) return
      await updateProfile(formData, user.customId)

      // update user data to stay consistency
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
        updateErrors,
        updateField,
        handleSubmit,
        initializeProfileData,
        handleAvatarChange,
        clearFormInput,
        handleDeletePhoto,
        handleInputChange,
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
