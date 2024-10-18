'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  addFollowMember,
  removeFollowMember,
} from '@/app/actions/follow-member'
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
import { debounce } from '@/utils/performance'

import Loading from './loading'

interface ProfilePageProps {
  isMember: boolean
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isMember }) => {
  const { user, setUser } = useUser()
  const { visitorProfile, isProfileError, isProfileLoading } = useEditProfile()
  const router = useRouter()
  const pathName = usePathname()
  const currentUrl = pathName

  const [category, setCategory] = useState<TabCategory>(TabCategory.PICK)
  const [tabData, setTabData] = useState<PickList | Bookmarks>([])

  const profileData = isMember ? user : visitorProfile

  useEffect(() => {
    if (isMember) {
      switch (category) {
        case TabCategory.PICK:
          setTabData(profileData.picksData)
          break
        case TabCategory.BOOKMARKS:
          setTabData(profileData.bookmarks)
          break
        default:
          setTabData(profileData.picksData)
      }
    } else {
      setTabData(profileData.picksData)
    }
  }, [category, isMember, profileData])

  if (isProfileLoading) {
    return <Loading />
  }

  if (isProfileError) {
    return <ErrorPage statusCode={404} />
  }

  const {
    pickCount,
    name,
    avatar,
    followerCount,
    followingCount,
    customId,
    memberId,
    intro,
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
  const followList = user.followingMemberIds
  const isFollowing = followList.has(profileData.memberId)

  const handleFollowOnClick = debounce(() => {
    const followMemberArgs = {
      memberId: user.memberId,
      targetId: profileData.memberId,
    }
    if (!isFollowing) {
      setUser((prev) => {
        return {
          ...prev,
          followingMemberIds: prev.followingMemberIds.add(profileData.memberId),
        }
      })
      return addFollowMember(followMemberArgs)
    }
    setUser((prev) => {
      return {
        ...prev,
        followingMemberIds: new Set(
          Array.from(prev.followingMemberIds).filter(
            (id) => id !== profileData.memberId
          )
        ),
      }
    })
    return removeFollowMember(followMemberArgs)
  })

  const buttonList = isMember
    ? [
        {
          text: { default: '編輯個人檔案', isActive: '' },
          clickFn: () => router.push(`${currentUrl}/edit-profile`),
          isActive: false,
        },
      ]
    : [
        {
          text: { default: '追蹤', isActive: '追蹤中' },
          clickFn: handleFollowOnClick,
          isActive: isFollowing,
        },
      ]

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

  return (
    <>
      <section className="bg-white">
        <div className="flex max-h-[calc(100%_-_152px)] max-w-[theme(width.maxMain)] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full sm:pt-0 md:px-[70px] lg:px-10">
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
