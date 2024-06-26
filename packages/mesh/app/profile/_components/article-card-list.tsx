'use client'
import { useEffect, useState } from 'react'

import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'

import ArticleCard from './article-card'
import Tab, { TabCategory } from './tab'
type ArticleCardListProps = {
  picksData: NonNullable<GetMemberProfileQuery['member']>['picks']
  bookmarkData: NonNullable<GetMemberProfileQuery['member']>['books']
  id: string
  avatar: string
}
const ArticleCardList = ({
  picksData,
  bookmarkData,
  id,
  avatar,
}: ArticleCardListProps) => {
  const [showData, setShowData] = useState(picksData)
  const [category, setCategory] = useState<TabCategory>(TabCategory.picks)

  useEffect(() => {
    switch (category) {
      case TabCategory.picks:
        return setShowData(picksData)
      case TabCategory.bookmarks:
        return setShowData(bookmarkData)
      default:
        return setShowData(picksData)
    }
  }, [bookmarkData, category, picksData])
  if (!showData) return <></>
  return (
    <>
      <Tab category={category} setCategory={setCategory} />
      <ul className="max-w-[1120px] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:p-10 lg:grid-cols-3">
        {showData.map((pick, idx) => {
          if (!pick.story) return
          return (
            <li
              key={pick.story.id}
              className="relative h-full w-full bg-white md:rounded-md md:shadow-[0_2px_2px_0px_rgba(0,9,40,0.1)]"
            >
              <ArticleCard
                data={pick.story}
                isLast={idx === showData.length - 1}
                id={id}
                avatar={avatar}
                category={category}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ArticleCardList
