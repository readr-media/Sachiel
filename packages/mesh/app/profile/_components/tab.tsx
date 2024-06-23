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

  return (
    <ul
      className="flex w-full items-center justify-around border-b border-t
border-[rgba(0,9,40,0.1)]"
    >
      <li
        onClick={() => setCategory(TabCategory.picks)}
        className={`relative p-[14px] pt-3 font-normal leading-[22.4px] ${picksActiveStyle}`}
      >
        精選
      </li>
      <li
        onClick={() => setCategory(TabCategory.bookmarks)}
        className={`relative p-[14px] pt-3 font-normal leading-[22.4px] text-primary-400 ${bookmarksActiveStyle}`}
      >
        書籤
      </li>
    </ul>
  )
}

export default Tab
