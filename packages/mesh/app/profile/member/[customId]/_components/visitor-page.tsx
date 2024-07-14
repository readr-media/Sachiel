'use client'
import { useState } from 'react'

import ArticleCard from '@/app/profile/_components/article-card'
import ArticleCardList from '@/app/profile/_components/article-card-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import { type GetVisitorProfileQuery } from '@/graphql/__generated__/graphql'
import { TabCategory, TabKey } from '@/types/tab'

import { type userType } from './member-page'

type VisitorPageProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number
  followingCount: string
  followerCount: string
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
      <div className="flex max-h-[calc(100%_-_152px)] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full">
        <UserProfile
          name={name}
          pickCount={pickCount}
          avatar={avatar}
          userType={userType}
          intro={intro}
        />
        <ProfileButtonList buttonList={buttonList} />
        <UserStatusList userStatusList={userStatusList} />
      </div>

      <Tab
        tabCategory={category}
        setCategory={setCategory}
        userType={userType}
      />
      <ArticleCardList
        items={picksData || []}
        renderItem={(pick, index, isLast) =>
          pick.story ? (
            <ArticleCard
              storyData={pick.story}
              isLast={isLast}
              memberId={memberId}
              avatar={avatar}
              category={category}
              name={name}
              userType={userType}
            />
          ) : (
            <></>
          )
        }
        userType={userType}
        category={category}
        emptyMessage="這個人還沒有精選新聞"
      />
    </>
  )
}

export default VisitorPage
