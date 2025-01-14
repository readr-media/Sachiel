import type { MouseEventHandler } from 'react'
import { useRef, useState } from 'react'

import { addCategory, removeCategory } from '@/app/actions/edit-category'
import Button from '@/components/button'
import InteractiveIcon, { type Icon } from '@/components/interactive-icon'
import { categorySearchParamName } from '@/constants/search-param-names'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import useInView from '@/hooks/use-in-view'
import useUserPayload from '@/hooks/use-user-payload'
import {
  getAddedCategoryIds,
  getDeletedCategoryIds,
  undoAddCategories,
  undoDeleteCategroies,
} from '@/utils/edit-category'
import { logCategoryClick } from '@/utils/event-logs'
import { setSearchParams } from '@/utils/search-params'

import type { Category } from '../page'
import CategoryEditor from './category-editor'

const scrollDistance = 200

const NavigateButton = ({
  onClick,
  icon,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>
  icon: Icon
}) => {
  return (
    <button onClick={onClick} className="group">
      <InteractiveIcon size={{ width: 24, height: 24 }} icon={icon} />
    </button>
  )
}

export default function CategorySelector({
  allCategories,
  currentCategory,
}: {
  allCategories: Category[]
  currentCategory?: Category
}) {
  const { user, setUser } = useUser()
  const displayCategories = user.followingCategories
  const { addToast } = useToast()
  const userPayoload = useUserPayload()

  const [showCategoryEditor, setShowCategoryEditor] = useState(false)
  const { memberId } = user

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
        console.error('send addedCategory to pubsub failed', addedCategoryIds)
        addToast({ status: 'fail', text: TOAST_MESSAGE.followCategoryFailed })
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
        console.error('send deleteCategory to pubsub failed', addedCategoryIds)
        addToast({ status: 'fail', text: TOAST_MESSAGE.unfollowCategoryFailed })
      }
    }

    const isCurrentCategoryDeleted = !finalCategories.find(
      (category) => category.slug === currentCategory?.slug
    )
    if (isCurrentCategoryDeleted) {
      setSearchParams(categorySearchParamName, finalCategories[0].slug ?? '')
    }

    setUser((user) => ({
      ...user,
      followingCategories: finalCategories,
    }))
    setShowCategoryEditor(false)
  }

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
              <div
                key={category.id}
                className="GTM-latest_click_category shrink-0"
              >
                <Button
                  size="xs"
                  color="nav-chip"
                  text={category.title ?? ''}
                  activeState={{
                    isActive: category.slug === currentCategory?.slug,
                  }}
                  onClick={() => {
                    logCategoryClick(userPayoload, category?.title ?? '')
                    setSearchParams(
                      categorySearchParamName,
                      category.slug ?? ''
                    )
                  }}
                />
              </div>
            ))}
            <div className="shrink-0">
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
              className={`flex items-center bg-[linear-gradient(90deg,_#fff_60%,_rgba(255,255,255,0%)_100%)] pr-6 opacity-0 ${
                showNavigatePrevious
                  ? 'pointer-events-auto opacity-100'
                  : undefined
              }`}
            >
              <NavigateButton
                icon={{
                  default: 'icon-navigate-previous',
                  hover: 'icon-navigate-previous-hover',
                }}
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
              className={`flex items-center bg-[linear-gradient(270deg,_#fff_60%,_rgba(255,255,255,0%)_100%)] pl-6 opacity-0 ${
                showNavigateNext ? 'pointer-events-auto opacity-100' : undefined
              }`}
            >
              <NavigateButton
                icon={{
                  default: 'icon-navigate-next',
                  hover: 'icon-navigate-next-hover',
                }}
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
