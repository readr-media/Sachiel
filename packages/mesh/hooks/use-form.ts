import { useRef, useState } from 'react'

type ValidationErrors<T> = Partial<Record<keyof T, string>>

export const useForm = <T extends Record<string, unknown>>(
  initialState: T,
  validateFormFn: (form: T) => Promise<ValidationErrors<T>>
) => {
  const originalState = useRef(initialState)
  const [form, setForm] = useState<T>(initialState)
  const [errors, setErrors] = useState<ValidationErrors<T>>({})

  const updateField = (field: keyof T, value: T[keyof T]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const resetForm = () => {
    setForm(initialState)
  }

  const validateForm = async () => {
    const newErrors = await validateFormFn(form)
    setErrors(newErrors)
    return !Object.keys(newErrors).length
  }

  const resetErrors = () => setErrors({})

  const updateErrors = (key: keyof T, errorMessage: string) => {
    setErrors((prev) => ({ ...prev, [key]: errorMessage }))
  }

  const isFormDataChanged = () => {
    for (const [key, value] of Object.entries(
      originalState.current as Record<keyof T, string>
    )) {
      if (form[key] !== value) return true
    }
    return false
  }

  const hasChange = () => {
    for (const [formField, FormValue] of Object.entries(
      originalState.current
    )) {
      if (FormValue !== form[formField]) return true
    }
    return false
  }

  const isFormValid = !Object.keys(errors).length && hasChange()

  return {
    form,
    isFormValid,
    isFormDataChanged,
    errors,
    updateField,
    resetForm,
    updateErrors,
    validateForm,
    resetErrors,
  }
}
