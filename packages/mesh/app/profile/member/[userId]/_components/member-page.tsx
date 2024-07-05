'use client'
import { useEffect, useState } from 'react'

import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'
import { tabFilter, TabKey } from '@/utils/profile-tab'

import ArticleCardList from './article-card-list'
import ProfileButtonLIst from './profile-button-list'
import Tab, { TabCategory } from './tab'
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
  const [category, setCategory] = useState<TabCategory>(TabCategory.picks)
  const getUserStatusList = () => {
    const userStatusList = [
      { key: TabKey.PICK, value: pickCount },
      { key: TabKey.FOLLOWER, value: followerCount },
      { key: TabKey.FOLLOWING, value: followingCount },
      // TODO: sponsored value need api
      { key: TabKey.SPONSORED, value: '9999次' },
    ].filter(tabFilter(userType))
    return userStatusList
  }

  const emptyStatusMaxHeight = 'max-h-[calc(100%_-_152px)]'
  const buttonList = [{ text: '編輯個人檔案' }]

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

  return (
    <>
      <div
        className={`flex grow ${emptyStatusMaxHeight} flex-col items-center px-5 pb-8 pt-6 sm:max-h-full`}
      >
        <UserProfile
          name={name}
          pickCount={pickCount || 0}
          avatar={avatar}
          userType={userType}
          intro={intro}
        />
        <ProfileButtonLIst buttonList={buttonList} />
        <UserStatusList userStatusList={getUserStatusList()} />
      </div>

      <Tab userType={userType} category={category} setCategory={setCategory} />
      <ArticleCardList
        showData={showData}
        id={visitID}
        avatar={avatar}
        userType={userType}
        category={category}
      />
    </>
  )
}

export default MemberPage
