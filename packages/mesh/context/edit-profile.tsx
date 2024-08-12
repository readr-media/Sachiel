'use client'
import { useRouter } from 'next/navigation'
import type { ChangeEvent, FormEvent, MouseEvent } from 'react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { deletePhoto, updateProfile } from '@/app/actions/edit-profile'
import { IMAGE_SIZE_LIMITATION, INTRO_LIMITATION } from '@/constants/profile'
import useProfileState from '@/hooks/use-profile-state'
import type { FormData, ProfileTypes } from '@/types/profile'

type EditProfileContextType = {
  formData: FormData
  profile: ProfileTypes
  isFormValid: boolean
  errors: Partial<FormData>
  updateFormField: (field: keyof FormData, value: string) => void
  handleSubmit: (e: FormEvent<HTMLFormElement> | MouseEvent) => Promise<void>
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

const errorMessages: Record<keyof FormData, string> = {
  name: '名稱不能空白',
  customId: '這個 ID 目前無法使用，請使用其他 ID',
  intro: '自我介紹超過字數上限',
  avatar: '', //TODO: Add an appropriate error message if needed
}

export const EditProfileProvider: React.FC<{
  children: React.ReactNode
  customId: string
}> = ({ children, customId }) => {
  const router = useRouter()
  const { profile, setProfile } = useProfileState({
    memberId: customId,
    takesCount: 20,
  })

  const [formData, setFormData] = useState<FormData>({
    name: '',
    customId: '',
    intro: '',
    avatar: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const originalProfileData = useRef<FormData>()

  const initializeProfileData = () => {
    const initialData = {
      name: profile.name || '',
      customId: profile.memberCustomId || '',
      intro: profile.intro || '',
      avatar: profile.avatar || '',
    }
    setFormData(initialData)
    originalProfileData.current = initialData
  }

  useEffect(initializeProfileData, [profile.memberCustomId])

  const validateForm = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = errorMessages.name
    if (!formData.customId.trim()) newErrors.customId = errorMessages.customId
    if (formData.intro.length > INTRO_LIMITATION)
      newErrors.intro = errorMessages.intro
    return newErrors
  }

  const isFormValid =
    Object.keys(errors).length === 0 && formData !== originalProfileData.current

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > IMAGE_SIZE_LIMITATION) {
      setErrors((prev) => ({ ...prev, avatar: '上傳的檔案大小須小於 10MB' }))
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const clearFormInput = (key: 'name' | 'customId' | 'intro') => {
    setFormData((prev) => ({ ...prev, [key]: '' }))
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }))
  }

  const handleDeletePhoto = (avatarImageId?: string) => {
    if (!avatarImageId) return
    deletePhoto(avatarImageId || '', profile.memberCustomId || '')
    setFormData((prev) => ({ ...prev, avatar: '' }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | MouseEvent) => {
    if (e && 'preventDefault' in e) e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      if (!formData.customId) return
      await updateProfile(formData, profile.memberCustomId)
      setProfile((prev) => ({
        ...prev,
        name: formData.name,
        avatar: formData.avatar,
        intro: formData.intro,
        memberCustomId: formData.customId,
      }))
      router.push(`/profile/member/${formData.customId}`)
    } catch (error) {
      router.push(`/profile/member/${profile.memberCustomId}`)
      console.error('Failed to update profile:', error)
    }
  }

  return (
    <EditProfileContext.Provider
      value={{
        formData,
        errors,
        isFormValid,
        profile,
        updateFormField,
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
