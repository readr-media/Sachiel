'use client'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef } from 'react'

import ArticleCardList from '@/app/profile/_components/article-card-list'
import CollectionsCarousel from '@/app/profile/_components/collections-carousel'
import type { ProfileButton } from '@/app/profile/_components/profile-button-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import Button from '@/components/button'
import ErrorPage from '@/components/status/error-page'
import { useEditProfile } from '@/context/edit-profile'
import { useUser } from '@/context/user'
import { useFollow } from '@/hooks/use-follow'
import { PickObjective } from '@/types/objective'
import type { PickCollections, TabCategoryType } from '@/types/profile'
import { type PickList, TabCategory, TabKey } from '@/types/profile'

import Loading from './loading'

interface ProfilePageProps {
  isMember: boolean
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isMember }) => {
  const { user } = useUser()
  const searchParams = useSearchParams()
  const queryTab = searchParams.get('tab')
  const { visitorProfile, isProfileError, isProfileLoading } = useEditProfile()
  const router = useRouter()
  const pathName = usePathname()
  const currentUrl = pathName
  const hasMoreData = useRef({
    [TabCategory.PICKS]: true,
    [TabCategory.BOOKMARKS]: true,
    [TabCategory.COLLECTIONS]: true,
  })
  const category = useMemo(() => {
    // NOTE: 如果tab 非預期，使用精選替代
    const tab = queryTab as TabCategoryType
    return Object.values(TabCategory).includes(tab) ? tab : TabCategory.PICKS
  }, [queryTab])

  const setCategory = (newCategory: TabCategoryType) => {
    // NOTE: 透過url 控制tab內容，移除state
    router.push(`${pathName}?tab=${newCategory}`, { scroll: false })
  }

  const profileData = isMember ? user : visitorProfile
  const { handleClickFollow, isFollowing } = useFollow(
    String(profileData.memberId)
  )

  const tabData = useMemo(() => {
    switch (category) {
      case TabCategory.PICKS:
        return profileData.picksData ?? []
      case TabCategory.BOOKMARKS:
        return profileData.bookmarks ?? []
      case TabCategory.COLLECTIONS:
        return profileData.collections ?? []
      default:
        return profileData.picksData ?? []
    }
  }, [category, profileData])

  const isCollection = tabData.some((item) => item.__typename === 'Collection')

  const pickCollections: PickCollections = useMemo(() => {
    if (isCollection || !(tabData as PickList)?.length) {
      return []
    }

    return (tabData as PickList)
      .filter((item) => item?.objective === PickObjective.Collection)
      .map(({ collection }) => ({
        ...collection!,
        id: collection?.id || '',
      })) as PickCollections
  }, [isCollection, tabData])

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

  const publisherCustomId = user.publishers?.[0].customId
  const isMediaManager = isMember && publisherCustomId

  const buttonList: ProfileButton[] = isMember
    ? isMediaManager
      ? [
          {
            text: { default: '編輯個人檔案', isActive: '' },
            clickFn: () => router.push(`${currentUrl}/edit-profile`),
            isActive: false,
          },
          {
            text: { default: '進入媒體後台', isActive: '' },
            color: 'primary',
            clickFn: () =>
              router.push(`/media-backstage/${publisherCustomId}/point`),
            isActive: false,
          },
        ]
      : [
          {
            text: { default: '編輯個人檔案', isActive: '' },
            clickFn: () => router.push(`${currentUrl}/edit-profile`),
            isActive: false,
          },
        ]
    : [
        {
          text: { default: '追蹤', isActive: '追蹤中' },
          clickFn: handleClickFollow,
          isActive: isFollowing,
        },
      ]

  const getMessage = (category: TabCategoryType): string => {
    const messages: { [key: string]: string } = {
      PICKS: isMember
        ? '這裡還空空的\n趕緊將喜愛的新聞加入精選吧'
        : '這個人還沒有精選新聞',
      BOOKMARKS: '沒有已儲存的書籤',
      COLLECTIONS: `從精選新聞或書籤中\n將數篇新聞打包成集錦`,
    }
    return messages[category] || ''
  }

  const shouldShowComment = category === TabCategory.PICKS
  const emptyElement = (category: TabCategoryType): React.ReactNode => {
    if (category === TabCategory.COLLECTIONS)
      return (
        <Link href={`/collection/new`}>
          <Button size="md" color="transparent" text="立即嘗試" />
        </Link>
      )
  }

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
      {pickCollections?.length ? (
        <>
          <CollectionsCarousel pickCollections={pickCollections} />
        </>
      ) : (
        <></>
      )}
      <ArticleCardList
        items={tabData || []}
        tabCategory={category}
        shouldShowComment={shouldShowComment}
        emptyMessage={getMessage(category)}
        elementForEmpty={emptyElement(category)}
        memberId={memberId}
        customId={customId}
        avatar={avatar}
        name={name}
        hasMoreData={hasMoreData}
      />
    </>
  )
}

export default ProfilePage
