import { useEffect, useState } from 'react'

import getAllCategories from '@/app/actions/get-all-categories'
import Button from '@/components/button'
import Icon from '@/components/icon'
import { LoginState, useLogin } from '@/context/login'
import type { GetAllCategoriesQuery } from '@/graphql/__generated__/graphql'

export default function LoginSetCategory() {
  const { formData, setFormData, setStep } = useLogin()
  const [allCategories, setAllCategories] =
    useState<GetAllCategoriesQuery['categories']>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllCategories()
      const data = response?.categories ?? []
      setAllCategories(data)
    }
    fetchData()
  }, [])

  const handleCategoryToggle = (categoryId: string) => {
    const categoryIndex = formData.interests.findIndex(
      (val) => val === categoryId
    )

    const newInterests = [...formData.interests]
    if (categoryIndex === -1) {
      newInterests.push(categoryId)
    } else {
      newInterests.splice(categoryIndex, 1)
    }

    setFormData((prev) => ({
      ...prev,
      interests: newInterests,
    }))
  }

  return (
    <>
      <div className="flex flex-col items-center gap-5 p-5">
        <Icon iconName="icon-login-step-2" size={{ width: 335, height: 20 }} />
        <p className="subtitle-1 text-center text-primary-500">
          請選擇您想追蹤的新聞類別
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {allCategories?.map((category) => (
            <Button
              key={category.id}
              size="md-100"
              color="lightbox"
              text={category.title ?? ''}
              activeState={{
                isActive: formData.interests.includes(category.id),
              }}
              onClick={() => handleCategoryToggle(category.id)}
            />
          ))}
        </div>
      </div>
      <div className="w-full border-t px-5 py-3 sm:px-10 sm:py-5">
        <Button
          size="lg"
          color="primary"
          text={formData.interests.length < 3 ? '至少要選 3 個' : '下一步'}
          onClick={() => setStep(LoginState.SetFollowing)}
          disabled={formData.interests.length < 3}
        />
      </div>
    </>
  )
}
