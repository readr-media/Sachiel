import { Dispatch, SetStateAction } from 'react'

import { TabCategory } from '@/types/tab'

type TabProps = {
  setCategory?: Dispatch<SetStateAction<TabCategory>>
  category?: TabCategory
  userType?: string
}

type TabItem = {
  name: string
  category: TabCategory
  activeStyle: string
}

const Tab = ({ category, setCategory, userType }: TabProps) => {
  const activeTabStyle =
    'after:absolute after:bottom-[-1px] after:left-0 after:w-full after:border after:border-primary-800 text-primary-700'
  const inactiveTabStyle = 'text-primary-400'
  const bookmarksActiveStyle =
    category === TabCategory.BOOKMARKS ? activeTabStyle : inactiveTabStyle
  const picksActiveStyle =
    category === TabCategory.PICK ? activeTabStyle : inactiveTabStyle
  function handleTabOnClick(category: TabCategory) {
    if (!setCategory) return
    setCategory(category)
  }
  const tabList: TabItem[] = [
    {
      name: '精選',
      category: TabCategory.PICK,
      activeStyle: picksActiveStyle,
    },
    {
      name: '書籤',
      category: TabCategory.BOOKMARKS,
      activeStyle: bookmarksActiveStyle,
    },
  ]
  const tabFilter = (item: TabItem) => {
    if (userType === 'visitor') {
      return item.category === TabCategory.PICK
    }
    return true
  }
  return (
    <ul
      className="flex h-[48px] w-full items-center justify-around  border-b border-t border-[rgba(0,9,40,0.1)]
sm:justify-start sm:gap-2 sm:pl-5 md:pl-[70px]"
    >
      {tabList.filter(tabFilter).map(({ name, category, activeStyle }) => (
        <li
          key={name}
          onClick={() => handleTabOnClick(category)}
          className={`button-large relative cursor-pointer p-[14px] pt-3 ${activeStyle} sm:px-8 sm:py-[13px]`}
        >
          {name}
        </li>
      ))}
    </ul>
  )
}

export default Tab
