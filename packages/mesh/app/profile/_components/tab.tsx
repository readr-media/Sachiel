import { Dispatch, SetStateAction } from 'react'

type TabProps = {
  setCategory: Dispatch<SetStateAction<TabCategory>>
  category: TabCategory
}

export enum TabCategory {
  picks = 'PICKS',
  bookmarks = 'BOOKMARKS',
}

const Tab = ({ category, setCategory }: TabProps) => {
  const activeTabStyle =
    'after:absolute after:bottom-[-1px] after:left-0 after:w-full after:border after:border-primary-800 text-primary-700'
  const inactiveTabStyle = 'text-primary-400'
  const bookmarksActiveStyle =
    category === TabCategory.bookmarks ? activeTabStyle : inactiveTabStyle
  const picksActiveStyle =
    category === TabCategory.picks ? activeTabStyle : inactiveTabStyle
  function handleTabOnClick(category: TabCategory) {
    setCategory(category)
  }
  const tabList = [
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
  ]
  return (
    <ul
      className="flex w-full items-center justify-around  border-b border-t border-[rgba(0,9,40,0.1)]
sm:justify-start sm:gap-2 sm:pl-5 md:pl-[70px]"
    >
      {tabList.map(({ name, category, activeStyle }) => (
        <li
          key={name}
          onClick={() => handleTabOnClick(category)}
          className={`relative p-[14px] pt-3 font-normal leading-[22.4px] ${activeStyle} sm:px-8 sm:py-[13px]`}
        >
          {name}
        </li>
      ))}
    </ul>
  )
}

export default Tab
