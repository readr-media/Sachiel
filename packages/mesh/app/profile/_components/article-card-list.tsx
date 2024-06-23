'use client'
import { useEffect, useState } from 'react'

import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'

import ArticleCard from './article-card'
import Tab, { TabCategory } from './tab'
type ArticleCardListProps = {
  picksData: NonNullable<GetMemberProfileQuery['member']>['picks']
  bookmarkData: NonNullable<GetMemberProfileQuery['member']>['books']
}
const ArticleCardList = ({ picksData, bookmarkData }: ArticleCardListProps) => {
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
      <ul>
        {showData.map((pick, idx) => {
          if (!pick.story) return <></>
          return (
            <li key={pick.story?.id} className="relative">
              <ArticleCard
                data={pick.story}
                isLast={idx === showData.length - 1}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ArticleCardList
