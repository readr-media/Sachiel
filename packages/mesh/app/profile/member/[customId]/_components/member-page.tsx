'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import ArticleCardList from '@/app/profile/_components/article-card-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import {
  type Bookmarks,
  type PickList,
  type UserType,
  TabCategory,
  TabKey,
} from '@/types/profile'
import { useEditProfile } from '@/context/edit-profile'

const MemberPage: React.FC = () => {
  const { profile } = useEditProfile()
  const {
    pickCount,
    picksData,
    name,
    avatar,
    followerCount,
    followingCount,
    memberCustomId,
    intro,
    bookmarks,
    userType,
    memberId,
  } = profile
  const [picksOrBookmarks, setPicksOrBookmarks] = useState<
    PickList | Bookmarks
  >(picksData)
  const [category, setCategory] = useState<TabCategory>(TabCategory.PICK)

  const router = useRouter()
  const pathName = usePathname()
  const currentUrl = pathName
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

  const buttonList = [
    {
      text: '編輯個人檔案',
      clickFn: () => router.push(`${currentUrl}/edit-profile`),
    },
  ]

  const getMessage = (category: TabCategory): string => {
    const messages: { [key: string]: string } = {
      PICKS: '這裡還空空的\n趕緊將喜愛的新聞加入精選吧',
      BOOKMARKS: '沒有已儲存的書籤',
    }
    return messages[category] || ''
  }

  const shouldShowComment = category !== TabCategory.BOOKMARKS
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
        items={picksOrBookmarks || []}
        shouldShowComment={shouldShowComment}
        emptyMessage={getMessage(category)}
        memberId={memberId}
        avatar={avatar}
        name={name}
      />
    </>
  )
}

export default MemberPage
