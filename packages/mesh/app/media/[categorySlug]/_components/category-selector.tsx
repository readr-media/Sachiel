'use client'

import { useRouter } from 'next/navigation'
import { MouseEventHandler, useEffect, useRef, useState } from 'react'

import { addCategory, removeCategory } from '@/app/actions/edit-category'
import Button from '@/components/button'
import Icon from '@/components/icon'
import useInView from '@/hooks/use-in-view'
import {
  getAddedCategoryIds,
  getDeletedCategoryIds,
  undoAddCategories,
  undoDeleteCategroies,
} from '@/utils/edit-category'

import CategoryEditor, { type Category } from './category-editor'

const scrollDistance = 200

const NavigateButton = ({
  onClick,
  iconName,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  iconName: 'icon-navigate-previous' | 'icon-navigate-next'
}) => {
  return (
    <button
      className="hover:rounded-[50%] hover:bg-primary-100 active:rounded-[50%] active:bg-primary-100"
      onClick={onClick}
    >
      <Icon size={{ width: 36, height: 36 }} iconName={iconName} />
    </button>
  )
}

export default function CategorySelector({
  allCategories,
  followingCategories,
  activeCategorySlug,
  // TODO: get memberId from client side store
  memberId,
}: {
  allCategories: Category[]
  followingCategories: Category[]
  activeCategorySlug: string
  memberId: string
}) {
  const [displayCategories, setDisplayCategories] =
    useState(followingCategories)
  const [showCategoryEditor, setShowCategoryEditor] = useState(false)
  const router = useRouter()

  const categoriesRef = useRef<HTMLDivElement>(null)
  const { targetRef: leadingRef, isIntersecting: isLeadingRefInView } =
    useInView()
  const { targetRef: endingRef, isIntersecting: isEndingRefInView } =
    useInView()

  const showNavigatePrevious =
    isLeadingRefInView !== null && !isLeadingRefInView
  const showNavigateNext = isEndingRefInView !== null && !isEndingRefInView

  const onEditCategoriesFinish = async (newCategories: Category[]) => {
    const addedCategoryIds = getAddedCategoryIds(
      displayCategories,
      newCategories
    )
    const deletedCategoryIds = getDeletedCategoryIds(
      displayCategories,
      newCategories
    )
    let finalCategories = [...newCategories]
    if (addedCategoryIds.size) {
      const addCategoryResponse = await addCategory({
        memberId,
        categoryIds: Array.from(addedCategoryIds),
      })
      if (!addCategoryResponse) {
        finalCategories = undoAddCategories(finalCategories, addedCategoryIds)
        // TODO: show toast to hint user something went wrong
        console.error('send addedCategory to pubsub failed', addedCategoryIds)
      }
    }
    if (deletedCategoryIds.size) {
      const deleteCategoryResponse = await removeCategory({
        memberId,
        categoryIds: Array.from(deletedCategoryIds),
      })
      if (!deleteCategoryResponse) {
        finalCategories = undoDeleteCategroies(
          finalCategories,
          deletedCategoryIds,
          allCategories
        )
        // TODO: show toast to hint user something went wrong
        console.error('send deleteCategory to pubsub failed', addedCategoryIds)
      }
    }

    setDisplayCategories(finalCategories)
    setShowCategoryEditor(false)
  }

  useEffect(() => {
    const activeCategoryDeleted = !displayCategories.find(
      (category) => category.slug === activeCategorySlug
    )
    if (activeCategoryDeleted) {
      setTimeout(() => {
        // wait for followingCategories to update
        router.replace(displayCategories[0].slug ?? '')
      }, 500)
    }
  }, [activeCategorySlug, displayCategories, router])

  return (
    <>
      <div className="flex h-[68px] items-center px-5 sm:h-[76px] md:px-[70px] lg:px-10">
        <div className="relative w-full">
          <nav
            ref={categoriesRef}
            className="no-scrollbar flex items-center gap-2 overflow-auto"
          >
            <div
              ref={leadingRef as React.RefObject<HTMLDivElement>}
              className="mr-[-8px]"
            />
            {displayCategories.map((category) => (
              <a
                key={category.id}
                className="flex-shrink-0"
                href={category.slug ?? ''}
              >
                <Button
                  size="xs"
                  color="nav-chip"
                  text={category.title ?? ''}
                  activeState={{
                    isActive: category.slug === activeCategorySlug,
                  }}
                  onClick={() => {}}
                />
              </a>
            ))}
            <div className="flex-shrink-0">
              <Button
                size="xs"
                color="nav-button-add"
                text="編輯"
                icon={{
                  iconName: 'icon-add',
                  size: 'm',
                }}
                onClick={() => {
                  setShowCategoryEditor(true)
                }}
              />
            </div>
            <div
              ref={endingRef as React.RefObject<HTMLDivElement>}
              className="ml-[-8px]"
            />
          </nav>
          <div className="pointer-events-none absolute inset-[0_-8px_0_-8px] flex justify-between">
            <div
              className={` bg-[linear-gradient(90deg,_#fff_60%,_rgba(255,255,255,0%)_100%)] pr-6 opacity-0 ${
                showNavigatePrevious
                  ? 'pointer-events-auto opacity-100'
                  : undefined
              }`}
            >
              <NavigateButton
                iconName="icon-navigate-previous"
                onClick={() => {
                  if (categoriesRef.current) {
                    categoriesRef.current.scrollBy({
                      top: 0,
                      left: -scrollDistance,
                      behavior: 'smooth',
                    })
                  }
                }}
              />
            </div>
            <div
              className={`bg-[linear-gradient(270deg,_#fff_60%,_rgba(255,255,255,0%)_100%)] pl-6 opacity-0 ${
                showNavigateNext ? 'pointer-events-auto opacity-100' : undefined
              }`}
            >
              <NavigateButton
                iconName="icon-navigate-next"
                onClick={() => {
                  if (categoriesRef.current) {
                    categoriesRef.current.scrollBy({
                      top: 0,
                      left: scrollDistance,
                      behavior: 'smooth',
                    })
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {showCategoryEditor && (
        <CategoryEditor
          allCategories={allCategories}
          followingCategories={displayCategories}
          onFinish={onEditCategoriesFinish}
          onClose={() => {
            setShowCategoryEditor(false)
          }}
        />
      )}
    </>
  )
}
