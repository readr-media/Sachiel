'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import ArticleCardList from '@/app/profile/_components/article-card-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import ErrorPage from '@/components/status/error-page'
import { useEditProfile } from '@/context/edit-profile'
import { useUser } from '@/context/user'
import {
  type Bookmarks,
  type PickList,
  TabCategory,
  TabKey,
} from '@/types/profile'
import Spinner from '@/components/spinner'

interface ProfilePageProps {
  isMember: boolean
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isMember }) => {
  const { user } = useUser()
  const { visitorProfile, isProfileError, isProfileLoading } = useEditProfile()
  const router = useRouter()
  const pathName = usePathname()
  const currentUrl = pathName

  const [category, setCategory] = useState<TabCategory>(TabCategory.PICK)
  const [tabData, setTabData] = useState<PickList | Bookmarks>([])

  const profileData = isMember ? user : visitorProfile

  const {
    pickCount,
    picksData,
    name,
    avatar,
    followerCount,
    followingCount,
    customId,
    memberId,
    intro,
    bookmarks,
  } = profileData

  const userStatusList = [
    { tabName: TabKey.PICK, count: pickCount },
    {
      tabName: TabKey.FOLLOWER,
      count: followerCount,
      redirectLink: `${customId}/follower`,
    },
    {
      tabName: TabKey.FOLLOWING,
      count: followingCount,
      redirectLink: `${customId}/following`,
    },
  ]

  const buttonList = isMember
    ? [
        {
          text: '編輯個人檔案',
          clickFn: () => router.push(`${currentUrl}/edit-profile`),
        },
      ]
    : // TODO: add click function
      [{ text: '追蹤' }]

  const getMessage = (category: TabCategory): string => {
    const messages: { [key: string]: string } = {
      PICKS: isMember
        ? '這裡還空空的\n趕緊將喜愛的新聞加入精選吧'
        : '這個人還沒有精選新聞',
      BOOKMARKS: '沒有已儲存的書籤',
    }
    return messages[category] || ''
  }

  const shouldShowComment = category !== TabCategory.BOOKMARKS || !isMember

  useEffect(() => {
    if (isMember) {
      switch (category) {
        case TabCategory.PICK:
          return setTabData(picksData)
        case TabCategory.BOOKMARKS:
          return setTabData(bookmarks)
        default:
          return setTabData(picksData)
      }
    } else {
      setTabData(picksData)
    }
  }, [bookmarks, category, picksData, isMember])
  // 如果使用者沒有customId 表示沒有這個使用者的資料
  if (isProfileError) return <ErrorPage statusCode={404} />
  if (isProfileLoading) return <Spinner />

  return (
    <>
      <section className="bg-white">
        <div className="flex max-h-[calc(100%_-_152px)] max-w-[1120px] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full">
          <UserProfile
            name={name}
            pickCount={pickCount}
            avatar={avatar}
            userType={isMember ? 'member' : 'visitor'}
            intro={intro}
          />
          <ProfileButtonList buttonList={buttonList} />
          <UserStatusList userStatusList={userStatusList} />
        </div>
      </section>
      <Tab
        tabCategory={category}
        setCategory={setCategory}
        userType={isMember ? 'member' : 'visitor'}
      />
      <ArticleCardList
        items={tabData || []}
        shouldShowComment={shouldShowComment}
        emptyMessage={getMessage(category)}
        memberId={memberId}
        avatar={avatar}
        name={name}
      />
    </>
  )
}

export default ProfilePage
