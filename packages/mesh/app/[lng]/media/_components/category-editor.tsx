import { useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import useBlockBodyScroll from '@/hooks/use-block-body-scroll'

import type { Category } from '../page'

export default function CategoryEditor({
  allCategories,
  followingCategories,
  onFinish,
  onClose,
}: {
  allCategories: Category[]
  followingCategories: Category[]
  onFinish: (categories: Category[]) => void
  onClose: () => void
}) {
  const [selectingCategories, setSelectingCategories] =
    useState(followingCategories)
  useBlockBodyScroll(true)

  const selectingCategoryIds = new Set(
    selectingCategories.map((category) => category.id)
  )

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center overflow-hidden bg-lightbox-light"
      onClick={onClose}
    >
      <div
        className="flex w-screen max-w-[480px] flex-col rounded-xl bg-white"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="flex h-15 items-center justify-between border-b px-2">
          <div className="size-11"></div>
          <h2 className="list-title text-primary-800">編輯追蹤類別</h2>
          <div className="cursor-pointer" onClick={onClose}>
            <Icon size="2xl" iconName="icon-modal-close" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-10 px-6 py-5">
          <div className="px-3">
            <div className="subtitle-1 text-center text-primary-500">
              請選擇您想追蹤的新聞類別
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {allCategories.map((category) => {
                const isSelecting = selectingCategoryIds.has(category.id)
                return (
                  <Button
                    key={category.id}
                    size="md-100"
                    color="lightbox"
                    text={category.title ?? ''}
                    activeState={{
                      isActive: isSelecting,
                    }}
                    onClick={() => {
                      setSelectingCategories((oldCategories) => {
                        return isSelecting
                          ? oldCategories.filter(
                              (oldCategory) => oldCategory.id !== category.id
                            )
                          : // TODO: sort categories through new order field
                            [...oldCategories, category].sort(
                              (a, b) => parseInt(a.id) - parseInt(b.id)
                            )
                      })
                    }}
                  />
                )
              })}
            </div>
          </div>
          <Button
            size="lg"
            color="primary"
            text={selectingCategories.length === 0 ? '至少要選1個' : '儲存'}
            disabled={selectingCategories.length === 0}
            onClick={() => {
              onFinish(selectingCategories)
            }}
          />
        </div>
      </div>
    </div>
  )
}
