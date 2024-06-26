import { type Dispatch, type SetStateAction } from 'react'

import Button from './button'

type Category = {
  id: string
  title?: string | null
  slug?: string | null
}

export default function CategoryEditor({
  allCategories,
  selectingCategoryIds,
  setSelectingCategoryIds,
}: {
  allCategories: Category[]
  selectingCategoryIds: Set<string>
  setSelectingCategoryIds: Dispatch<SetStateAction<Set<string>>>
}) {
  return (
    <div>
      <div className="subtitle-1 text-center text-primary-500">
        請選擇您想追蹤的新聞類別
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {allCategories.map((category) => (
          <Button
            key={category.id}
            size="md-100"
            color="white"
            text={category.title ?? ''}
            activeState={{ isActive: selectingCategoryIds.has(category.id) }}
            onClick={() => {
              setSelectingCategoryIds((oldIds) => {
                const newIds = new Set(oldIds)
                newIds.has(category.id)
                  ? newIds.delete(category.id)
                  : newIds.add(category.id)
                return newIds
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}
