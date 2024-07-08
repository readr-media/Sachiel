'use client'
import { useState } from 'react'

import { type GetPublisherProfileQuery } from '@/graphql/__generated__/graphql'
import { tabFilter, TabKey } from '@/utils/profile-tab'

import ProfileButtonLIst from './profile-button-list'
import StoryCardList from './story-card-list'
import Tab, { TabCategory } from './tab'
import UserProfile from './user-profile'
import UserStatusList from './user-status-list'

export type userType = 'publisher'
type PublisherPageProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number | null
  followerCount: number
  userType: userType
  storyData: NonNullable<GetPublisherProfileQuery['stories']>
  userId: string
}

const PublisherPage: React.FC<PublisherPageProps> = ({
  userType,
  name,
  avatar,
  intro,
  pickCount,
  followerCount,
  storyData,
}) => {
  const [_, setCategory] = useState<TabCategory>(TabCategory.publish)
  const getUserStatusList = () => {
    const userStatusList = [
      { key: TabKey.PICK, value: pickCount },
      { key: TabKey.FOLLOWER, value: followerCount },
      // TODO: sponsored value need api
      { key: TabKey.SPONSORED, value: '9999次' },
    ].filter(tabFilter(userType))
    return userStatusList
  }

  const emptyStatusMaxHeight = 'max-h-[calc(100%_-_152px)]'
  const buttonList = [
    { text: '追蹤' },
    { text: '贊助/訂閱媒體', primary: true },
  ]

  return (
    <>
      <div
        className={`flex ${emptyStatusMaxHeight} flex-col items-center px-5 pb-8 pt-6 sm:max-h-full`}
      >
        <UserProfile
          name={name}
          pickCount={pickCount || 0}
          avatar={avatar}
          intro={intro}
        />
        <ProfileButtonLIst buttonList={buttonList} />
        <UserStatusList userStatusList={getUserStatusList()} />
      </div>
      <Tab userType={userType} setCategory={setCategory} />
      <StoryCardList
        storyData={storyData}
        avatar={avatar}
        userType={userType}
      />
    </>
  )
}

export default PublisherPage
