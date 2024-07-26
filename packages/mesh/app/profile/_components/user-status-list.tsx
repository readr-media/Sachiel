'use client'

import Link from 'next/link'

import { type TabItem } from '@/types/profile'

type UserStatusListProps = {
  userStatusList: TabItem[]
}

const UserStatusList = ({ userStatusList }: UserStatusListProps) => (
  <ul className="mt-6 flex w-full items-center justify-center gap-6 sm:mt-4 sm:justify-start">
    {userStatusList.map(({ tabName, count, redirectLink }) => (
      <li
        key={tabName}
        className="relative flex h-[38px] w-[84px] flex-col items-center justify-between after:absolute after:-right-3 after:top-[9px] after:h-5 after:w-[0.5px] after:bg-primary-200 last:after:hidden sm:w-fit sm:flex-row sm:gap-1 sm:after:hidden"
      >
        {/* 如果沒有redirectLink的話就使用<div/> */}
        {redirectLink ? (
          <Link
            href={redirectLink}
            className="flex flex-col items-center gap-[2px] sm:flex-row sm:items-center"
          >
            <p className="profile-title-2 text-primary-700">{count}</p>
            <p className="profile-subtitle sm:body-2 text-primary-500">
              {tabName}
            </p>
          </Link>
        ) : (
          <div className="flex flex-col items-center gap-[2px] sm:flex-row sm:items-center">
            <p className="profile-title-2 text-primary-700">{count}</p>
            <p className="profile-subtitle sm:body-2 text-primary-500">
              {tabName}
            </p>
          </div>
        )}
      </li>
    ))}
  </ul>
)

export default UserStatusList
