'use client'
import { Dispatch, SetStateAction } from 'react'

import { TabCategory } from '@/types/tab'

type TabProps = {
  setCategory?: Dispatch<SetStateAction<TabCategory>>
  tabCategory?: TabCategory
  userType: string
}

type TabItem = {
  tabName: string
  tabCategory: TabCategory
  tabActiveStyle: string
}

const Tab = ({ tabCategory, setCategory, userType }: TabProps) => {
  const activeTabStyle =
    'after:absolute after:bottom-[-1px] after:left-0 after:w-full after:border after:border-primary-800 text-primary-700'
  const inactiveTabStyle = 'text-primary-400'
  const bookmarksActiveStyle =
    tabCategory === TabCategory.BOOKMARKS ? activeTabStyle : inactiveTabStyle
  const picksActiveStyle =
    tabCategory === TabCategory.PICK ? activeTabStyle : inactiveTabStyle
  const storiesActiveStyle =
    tabCategory === TabCategory.PUBLISH ? activeTabStyle : inactiveTabStyle
  function handleTabOnClick(tabCategory: TabCategory) {
    if (!setCategory) return
    setCategory(tabCategory)
  }
  const tabList: TabItem[] = [
    {
      tabName: '精選',
      tabCategory: TabCategory.PICK,
      tabActiveStyle: picksActiveStyle,
    },
    {
      tabName: '書籤',
      tabCategory: TabCategory.BOOKMARKS,
      tabActiveStyle: bookmarksActiveStyle,
    },
    {
      tabName: '報導',
      tabCategory: TabCategory.PUBLISH,
      tabActiveStyle: storiesActiveStyle,
    },
  ]
  const tabFilter = (item: TabItem) => {
    if (userType === 'visitor') {
      return item.tabCategory === TabCategory.PICK
    }
    if (userType === 'publisher') {
      return item.tabCategory === TabCategory.PUBLISH
    }
    return (
      item.tabCategory === TabCategory.PICK ||
      item.tabCategory === TabCategory.BOOKMARKS
    )
  }
  return (
    <ul
      className="flex h-[48px] w-full items-center justify-around  border-b border-t border-primary-200
sm:justify-start sm:gap-2 sm:pl-5 md:pl-[70px]"
    >
      {tabList
        .filter(tabFilter)
        .map(({ tabName, tabCategory, tabActiveStyle }) => (
          <li
            key={tabName}
            onClick={() => handleTabOnClick(tabCategory)}
            className={`button-large relative cursor-pointer p-[14px] pt-3 ${tabActiveStyle} sm:px-8 sm:py-[13px]`}
          >
            {tabName}
          </li>
        ))}
    </ul>
  )
}

export default Tab
