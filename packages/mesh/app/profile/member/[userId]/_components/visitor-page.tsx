'use client'
import { useState } from 'react'

import { type GetVisitorProfileQuery } from '@/graphql/__generated__/graphql'
import { tabFilter, TabKey } from '@/utils/profile-tab'

import ArticleCardList from './article-card-list'
import { type userType } from './member-page'
import ProfileButtonLIst from './profile-button-list'
import Tab, { TabCategory } from './tab'
import UserProfile from './user-profile'
import UserStatusList from './user-status-list'

type VisitorPageProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number | null
  followingCount: number | null
  followerCount: number
  userType: userType
  picksData: NonNullable<GetVisitorProfileQuery['member']>['picks']
  visitID: string
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
  visitID,
}) => {
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
  const buttonList = [{ text: '追蹤' }]

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
        showData={picksData}
        id={visitID}
        avatar={avatar}
        userType={userType}
        category={category}
      />
    </>
  )
}

export default VisitorPage
