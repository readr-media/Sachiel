'use client'
import { useRouter } from 'next/navigation'
import {
  createContext,
  FormEvent,
  MouseEvent,
  useContext,
  useState,
} from 'react'

import { updateProfile } from '@/app/actions/edit-profile'
import { FormData } from '@/types/profile'

type EditProfileContextType = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  handleSubmit: (e: FormEvent<HTMLFormElement> | MouseEvent) => Promise<void>
  errors: Partial<FormData>
  INTRO_LIMITATION: number
  setCanSubmit: React.Dispatch<React.SetStateAction<boolean>>
  canSubmit: boolean
}

const EditProfileContext = createContext<EditProfileContextType | undefined>(
  undefined
)

export const EditProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter()
  const backToPreviousPage = () => {
    router.back()
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    customId: '',
    intro: '',
    avatar: '',
  })
  const [canSubmit, setCanSubmit] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const errorMessage: Record<'name' | 'customId' | 'intro', string> = {
    name: '名稱不能空白',
    customId: '這個 ID 目前無法使用，請使用其他 ID',
    intro: '自我介紹超過字數上限',
  }
  const INTRO_LIMITATION = 250
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    if (e && 'preventDefault' in e) e.preventDefault()
    setErrors({})
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = errorMessage['name']
    }

    if (!formData.customId.trim()) {
      newErrors.customId = errorMessage['customId']
    }

    if (formData.intro.length > INTRO_LIMITATION) {
      newErrors.intro = errorMessage['intro']
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      if (!formData.customId) return
      await updateProfile(formData, formData.customId)
      backToPreviousPage()
      router.refresh()
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  return (
    <EditProfileContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmit,
        errors,
        setCanSubmit,
        canSubmit,
        INTRO_LIMITATION,
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
