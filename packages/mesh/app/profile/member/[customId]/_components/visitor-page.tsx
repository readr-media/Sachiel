'use client'
import { useState } from 'react'

import ArticleCardList from '@/app/profile/_components/article-card-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import { useEditProfile } from '@/context/edit-profile'
import { TabCategory, TabKey } from '@/types/profile'

const VisitorPage: React.FC = () => {
  const [category, setCategory] = useState<TabCategory>(TabCategory.PICK)
  const { profile } = useEditProfile()
  if (!profile) return <div>error</div>
  const {
    name,
    avatar,
    memberCustomId,
    userType,
    pickCount,
    followerCount,
    followingCount,
    intro,
    picksData,
    memberId,
  } = profile

  const userStatusList = [
    { tabName: TabKey.PICK, count: pickCount },
    {
      tabName: TabKey.FOLLOWER,
      count: followerCount,
      redirectLink: `${memberCustomId}/follower`,
    },
    {
      tabName: TabKey.FOLLOWING,
      count: followingCount,
      redirectLink: `${memberCustomId}/following`,
    },
  ]

  const buttonList = [{ text: '追蹤' }]

  return (
    <>
      <div className="flex max-h-[calc(100%_-_152px)] max-w-[1120px] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full">
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
        shouldShowComment={true}
        emptyMessage="這個人還沒有精選新聞"
        memberId={memberId}
        avatar={avatar}
        name={name}
      />
    </>
  )
}

export default VisitorPage
