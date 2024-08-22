import { INTRO_LIMITATION } from '@/constants/profile'
import type { EditProfileFormTypes } from '@/types/profile'

export function profileFormValidation(
  form: EditProfileFormTypes
): Partial<EditProfileFormTypes> {
  const errorMessages: Record<keyof EditProfileFormTypes, string> = {
    name: '名稱不能空白',
    customId: '這個 ID 目前無法使用，請使用其他 ID',
    intro: '自我介紹超過字數上限',
    avatar: '', //TODO: Add an appropriate error message if needed
  }

  const newErrors: Partial<EditProfileFormTypes> = {}
  if (!form.name.trim()) newErrors.name = errorMessages.name
  if (!form.customId.trim()) newErrors.customId = errorMessages.customId
  if (form.intro.length > INTRO_LIMITATION)
    newErrors.intro = errorMessages.intro
  return newErrors
}
