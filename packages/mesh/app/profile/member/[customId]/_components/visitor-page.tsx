'use client'
import { useState } from 'react'

import { type GetVisitorProfileQuery } from '@/graphql/__generated__/graphql'
import { TabCategory, TabKey } from '@/types/tab'

import ArticleCardList from './article-card-list'
import { type userType } from './member-page'
import ProfileButtonList from './profile-button-list'
import Tab from './tab'
import UserProfile from './user-profile'
import UserStatusList from './user-status-list'

type VisitorPageProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number
  followingCount: number | null
  followerCount: number
  userType: userType
  picksData: NonNullable<GetVisitorProfileQuery['member']>['picks']
  memberId: string
}

const VisitorPage: React.FC<VisitorPageProps> = ({
  userType,
  name,
  avatar,
  intro,
  pickCount,
  followingCount,
  followerCount,
  picksData,
  memberId,
}) => {
  const [category, setCategory] = useState<TabCategory>(TabCategory.PICK)

  const userStatusList = [
    { tabName: TabKey.PICK, count: pickCount },
    { tabName: TabKey.FOLLOWER, count: followerCount },
    { tabName: TabKey.FOLLOWING, count: followingCount },
  ]

  const buttonList = [{ text: '追蹤' }]

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
        picksOrBookmarks={picksData}
        memeberId={memberId}
        avatar={avatar}
        userType={userType}
        category={category}
        name={name}
      />
    </>
  )
}

export default VisitorPage
