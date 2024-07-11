'use client'
import { useEffect, useState } from 'react'

import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'
import { TabCategory, TabKey } from '@/types/tab'

import ArticleCardList from './article-card-list'

export type userType = 'member' | 'visitor'

type Picks = NonNullable<GetMemberProfileQuery['member']>['picks']
type Bookmarks = NonNullable<GetMemberProfileQuery['member']>['books']

type MemberPageProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number
  followingCount: number | null
  followerCount: number
  userType: userType
  picksData: Picks
  bookmarks: Bookmarks
  memeberId: string
}

const MemberPage: React.FC<MemberPageProps> = ({
  userType,
  name,
  avatar,
  intro,
  pickCount,
  followingCount,
  followerCount,
  picksData,
  bookmarks,
  memeberId,
}) => {
  const [picksOrBookmarks, setPicksOrBookmarks] = useState<Picks | Bookmarks>(
    picksData
  )
  const [category, setCategory] = useState<TabCategory>(TabCategory.PICK)

  const userStatusList = [
    { tabName: TabKey.PICK, count: pickCount },
    { tabName: TabKey.FOLLOWER, count: followerCount },
    { tabName: TabKey.FOLLOWING, count: followingCount },
  ]

  const buttonList = [{ text: '編輯個人檔案' }]

  useEffect(() => {
    switch (category) {
      case TabCategory.PICK:
        return setPicksOrBookmarks(picksData)
      case TabCategory.BOOKMARKS:
        return setPicksOrBookmarks(bookmarks)
      default:
        return setPicksOrBookmarks(picksData)
    }
  }, [bookmarks, category, picksData])

  return (
    <>
      <div className="flex max-h-[calc(100%_-_152px)] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full">
        <UserProfile
          name={name}
          pickCount={pickCount || 0}
          avatar={avatar}
          userType={userType}
          intro={intro}
        />
        <ProfileButtonList buttonList={buttonList} />
        <UserStatusList userStatusList={userStatusList} />
      </div>

      <Tab category={category} setCategory={setCategory} userType={userType} />
      <ArticleCardList
        picksOrBookmarks={picksOrBookmarks}
        memeberId={memeberId}
        avatar={avatar}
        userType={userType}
        category={category}
        name={name}
      />
    </>
  )
}

export default MemberPage
