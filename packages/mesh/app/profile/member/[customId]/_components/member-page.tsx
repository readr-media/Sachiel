'use client'
import { useEffect, useState } from 'react'

import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'
import { TabCategory, TabKey } from '@/types/tab'

import ArticleCardList from './article-card-list'
import ProfileButtonList from './profile-button-list'
import Tab from './tab'
import UserProfile from './user-profile'
import UserStatusList from './user-status-list'

export type userType = 'member' | 'visitor'

type MemberPageProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number | null
  followingCount: number | null
  followerCount: number
  userType: userType
  picksData: NonNullable<GetMemberProfileQuery['member']>['picks']
  bookmarkData: NonNullable<GetMemberProfileQuery['member']>['books']
  visitID: string
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
  bookmarkData,
  visitID,
}) => {
  const [showData, setShowData] = useState(picksData)
  const [category, setCategory] = useState<TabCategory>(TabCategory.PICK)

  const userStatusList = [
    { key: TabKey.PICK, value: pickCount },
    { key: TabKey.FOLLOWER, value: followerCount },
    { key: TabKey.FOLLOWING, value: followingCount },
  ]

  const buttonList = [{ text: '編輯個人檔案' }]

  useEffect(() => {
    switch (category) {
      case TabCategory.PICK:
        return setShowData(picksData)
      case TabCategory.BOOKMARKS:
        return setShowData(bookmarkData)
      default:
        return setShowData(picksData)
    }
  }, [bookmarkData, category, picksData])

  return (
    <>
      <div className="flex max-h-[calc(100%_-_152px)] flex-col items-center px-5 pb-8 pt-6 sm:max-h-full">
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
        showData={showData}
        id={visitID}
        avatar={avatar}
        userType={userType}
        category={category}
        name={name}
      />
    </>
  )
}

export default MemberPage
