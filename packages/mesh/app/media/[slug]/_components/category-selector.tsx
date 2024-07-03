'use client'

import { MouseEventHandler, useRef } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import useInView from '@/hooks/use-in-view'

import { type Category } from './category-editor'

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
  activeCategoryId = '1',
}: {
  allCategories: Category[]
  memberFollowingCategoryIds: Set<string>
  activeCategoryId: string
}) {
  const categoriesRef = useRef<HTMLDivElement>(null)
  const { targetRef: leadingRef, isIntersecting: isLeadingRefInView } =
    useInView()
  const { targetRef: endingRef, isIntersecting: isEndingRefInView } =
    useInView()

  const showNavigatePrevious =
    isLeadingRefInView !== null && !isLeadingRefInView
  const showNavigateNext = isEndingRefInView !== null && !isEndingRefInView
  return (
    <div className="flex h-[68px] items-center px-5 sm:h-[76px] md:px-[70px] lg:px-10">
      <div className="relative w-full">
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
        <nav
          ref={categoriesRef}
          className="no-scrollbar flex items-center gap-2 overflow-auto"
        >
          <div
            ref={leadingRef as React.RefObject<HTMLDivElement>}
            className="mr-[-8px]"
          />
          {allCategories.map((category) => (
            <a key={category.id} className="flex-shrink-0">
              <Button
                size="xs"
                color="gray"
                text={category.title ?? ''}
                activeState={{ isActive: category.id === activeCategoryId }}
                onClick={() => {
                  // TODO: redirect to category
                }}
              />
            </a>
          ))}
          <div
            ref={endingRef as React.RefObject<HTMLDivElement>}
            className="ml-[-8px]"
          />
        </nav>
      </div>
    </div>
  )
}
