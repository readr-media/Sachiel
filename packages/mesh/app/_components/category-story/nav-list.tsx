'use client'

import { useSearchParams } from 'next/navigation'
import type { MouseEventHandler } from 'react'
import { useEffect, useRef, useState } from 'react'

import { fetchCategoryStory } from '@/app/actions/get-homepage'
import Button from '@/components/button'
import InteractiveIcon, { type Icon } from '@/components/interactive-icon'
import { categorySearchParamName } from '@/constants/search-param-names'
import type { GetAllCategoriesQuery } from '@/graphql/__generated__/graphql'
import useInView from '@/hooks/use-in-view'
import useUserPayload from '@/hooks/use-user-payload'
import type { CategoryStory } from '@/types/homepage'
import { logCategoryClick } from '@/utils/event-logs'
import { replaceSearchParams, setSearchParams } from '@/utils/search-params'

import StorySection from './story-section'

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

type Props = {
  categories: NonNullable<GetAllCategoriesQuery['categories']>
  initialStories: CategoryStory[] | null
}

export default function NavList({ categories, initialStories }: Props) {
  const [data, setData] = useState<CategoryStory[] | null>(initialStories)
  const userPayload = useUserPayload()
  const searchParams = useSearchParams()
  const activeCategorySlug = searchParams.get(categorySearchParamName)
  const activeCategory = categories?.find(
    (category) => category.slug === activeCategorySlug
  )

  useEffect(() => {
    if (!activeCategorySlug) {
      replaceSearchParams(categorySearchParamName, categories[0].slug ?? '')
    }
  }, [activeCategorySlug, categories])

  useEffect(() => {
    const fetchCategoryData = async (categorySlug: string) => {
      const result = await fetchCategoryStory(categorySlug)
      setData(result)
    }

    if (activeCategory?.slug) {
      fetchCategoryData(activeCategory.slug)
    }
  }, [activeCategory])

  const categoriesRef = useRef<HTMLDivElement>(null)
  const { targetRef: leadingRef, isIntersecting: isLeadingRefInView } =
    useInView()
  const { targetRef: endingRef, isIntersecting: isEndingRefInView } =
    useInView()

  const showNavigatePrevious =
    isLeadingRefInView !== null && !isLeadingRefInView
  const showNavigateNext = isEndingRefInView !== null && !isEndingRefInView

  return (
    <>
      <div className="flex h-[68px] items-center sm:h-[76px]">
        <div className="relative w-full">
          <nav
            ref={categoriesRef}
            className="no-scrollbar flex items-center gap-x-2 overflow-auto"
          >
            <div
              ref={leadingRef as React.RefObject<HTMLDivElement>}
              className="mr-[-8px]"
            />
            {categories?.map((category) => (
              <div
                className="GTM-homepage_click_category shrink-0"
                key={category.id}
              >
                <Button
                  size="xs"
                  color="nav-chip"
                  text={category.title ?? ''}
                  activeState={{
                    isActive: category === activeCategory,
                  }}
                  onClick={() => {
                    logCategoryClick(userPayload, category?.title ?? '')
                    setSearchParams(
                      categorySearchParamName,
                      category.slug ?? ''
                    )
                  }}
                />
              </div>
            ))}
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

      <StorySection
        stories={data}
        activeTitle={activeCategory?.title ?? ''}
        slug={activeCategory?.slug ?? ''}
      />
    </>
  )
}
