import { Dispatch, SetStateAction } from 'react'

type TabProps = {
  setCategory?: Dispatch<SetStateAction<TabCategory>>
  category?: TabCategory
  userType?: string
}

export enum TabCategory {
  picks = 'PICKS',
  bookmarks = 'BOOKMARKS',
  publish = 'PUBLISH',
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
    category === TabCategory.bookmarks ? activeTabStyle : inactiveTabStyle
  const picksActiveStyle =
    category === TabCategory.picks ? activeTabStyle : inactiveTabStyle
  function handleTabOnClick(category: TabCategory) {
    if (!setCategory) return
    setCategory(category)
  }
  const tabFilterByRole = (tab: TabItem) => {
    if (userType === 'publisher') return tab.category === TabCategory.publish
    if (userType === 'visitor') return tab.category === TabCategory.picks
    return tab.category !== TabCategory.publish
  }
  const tabList: TabItem[] = [
    {
      name: '精選',
      category: TabCategory.picks,
      activeStyle: picksActiveStyle,
    },
    {
      name: '書籤',
      category: TabCategory.bookmarks,
      activeStyle: bookmarksActiveStyle,
    },
    {
      name: '報導',
      category: TabCategory.publish,
      activeStyle: activeTabStyle,
    },
  ]
  return (
    <ul
      className="flex h-[48px] w-full items-center justify-around  border-b border-t border-[rgba(0,9,40,0.1)]
sm:justify-start sm:gap-2 sm:pl-5 md:pl-[70px]"
    >
      {tabList
        .filter(tabFilterByRole)
        .map(({ name, category, activeStyle }) => (
          <li
            key={name}
            onClick={() => handleTabOnClick(category)}
            className={`relative cursor-pointer p-[14px] pt-3 font-normal leading-[22.4px] ${activeStyle} sm:px-8 sm:py-[13px]`}
          >
            {name}
          </li>
        ))}
    </ul>
  )
}

export default Tab
