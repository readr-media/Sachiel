'use client'

import { useState } from 'react'

import CategoryEditor from '@/components/category-editor'

import { type Category } from '../category/[slug]/page'

export default function CategorySelector({
  allCategories,
  memberFollowingCategoryIds,
}: {
  allCategories: Category[]
  memberFollowingCategoryIds: Set<string>
}) {
  const [selectingCategoryIds, setSelectingCategoryIds] = useState(
    memberFollowingCategoryIds
  )
  return (
    <div className="flex items-center justify-center">
      <div className="w-[303px]">
        <CategoryEditor
          allCategories={allCategories}
          selectingCategoryIds={selectingCategoryIds}
          setSelectingCategoryIds={setSelectingCategoryIds}
        />
      </div>
    </div>
  )
}
