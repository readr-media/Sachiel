'use client'

import useProfileTab from '@/hooks/use-profile-tab'
import { type UserType } from '@/types/profile'

const activeTabStyle =
  'after:absolute after:bottom-[-1px] after:left-0 after:w-full after:border after:border-primary-800 text-primary-700'
const inactiveTabStyle = 'text-primary-400'

export default function Tab({
  userType,
  hasPodcast,
}: {
  userType: UserType
  hasPodcast?: boolean
}) {
  const { activeTab, viewTabs, handleTabClick } = useProfileTab(userType)

  const filteredViewTabs =
    userType === 'publisher' && !hasPodcast
      ? viewTabs.filter(({ key }) => key !== 'podcast')
      : viewTabs

  return (
    <ul
      className="flex h-[48px] w-full items-center justify-around border-y border-primary-200 bg-white
sm:justify-start sm:gap-2 sm:pl-5 md:pl-[70px] lg:pl-10"
    >
      {filteredViewTabs.map(({ key, label }) => (
        <li
          key={key}
          onClick={() => handleTabClick(key)}
          className={`button-large relative cursor-pointer p-[14px] pt-3 sm:px-8 sm:py-[13px] ${
            activeTab === key ? activeTabStyle : inactiveTabStyle
          }`}
        >
          {label}
        </li>
      ))}
    </ul>
  )
}
