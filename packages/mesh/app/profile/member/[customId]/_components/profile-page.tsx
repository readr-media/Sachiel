'use client'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import ArticleCardList from '@/app/profile/_components/article-card-list'
import CollectionsCarousel from '@/app/profile/_components/collections-carousel'
import type { ProfileButton } from '@/app/profile/_components/profile-button-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import ErrorPage from '@/components/status/error-page'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { useFollow } from '@/hooks/use-follow'
import useProfileState from '@/hooks/use-profile-state'
import useProfileTab from '@/hooks/use-profile-tab'
import { type UserType, TabKey } from '@/types/profile'

import Loading from './loading'

export default function ProfilePage({
  userType,
  profileCustomId,
}: {
  userType: UserType
  profileCustomId: string
}) {
  const { t } = useCustomTranslation()
  const router = useRouter()
  const { user } = useUser()
  const {
    profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useProfileState({
    customId: profileCustomId,
    takesCount: 20,
  })
  const { activeTab, viewTabs, handleTabClick } = useProfileTab({ userType })
  const { handleClickFollow, isFollowing } = useFollow(
    String(profileData.memberId)
  )
  const {
    pickCount,
    name,
    avatar,
    followerCount,
    followingCount,
    customId,
    memberId,
    intro,
    picksData,
    collections,
    bookmarks,
  } = profileData

  const tabData = useMemo(() => {
    switch (activeTab) {
      case 'pick':
        return picksData ?? []
      case 'bookmark':
        return bookmarks ?? []
      case 'collection':
        return collections ?? []
      default:
        return picksData ?? []
    }
  }, [activeTab, bookmarks, collections, picksData])

  const pickCollections = useMemo(() => {
    if (activeTab !== 'pick') return []
    return picksData
      .filter((item) => item.objective === 'collection' && item.collection)
      .map((item) => item.collection)
  }, [activeTab, picksData])

  if (isProfileLoading) {
    return <Loading />
  }

  if (isProfileError) {
    return <ErrorPage statusCode={404} />
  }

  const userStatusList = [
    { tabName: t(`Pages.Profile.${TabKey.PICK}`, '精選'), count: pickCount },
    {
      tabName: t(`Pages.Profile.${TabKey.FOLLOWER}`, '粉絲'),
      count: followerCount,
      redirectLink: `${customId}/follower`,
    },
    {
      tabName: t(`Pages.Profile.${TabKey.FOLLOWING}`, '追蹤中'),
      count: followingCount,
      redirectLink: `${customId}/following`,
    },
  ]

  const publisherCustomId = user.publishers?.[0]?.customId
  const isMediaManager = userType === 'member' && publisherCustomId
  const buttonList: ProfileButton[] =
    userType === 'member'
      ? isMediaManager
        ? [
            {
              text: {
                default: t(
                  'Pages.Profile.ProfilePage-edit-profile',
                  '編輯個人檔案'
                ),
                isActive: '',
              },
              clickFn: () => router.push(`${customId}/edit-profile`),
              isActive: false,
            },
            {
              text: {
                default: t(
                  'Pages.Profile.ProfilePage-media-backstage',
                  '進入媒體後台'
                ),
                isActive: '',
              },
              color: 'primary',
              clickFn: () =>
                router.push(`/media-backstage/${publisherCustomId}/point`),
              isActive: false,
            },
          ]
        : [
            {
              text: {
                default: t(
                  'Pages.Profile.ProfilePage-edit-profile',
                  '編輯個人檔案'
                ),
                isActive: '',
              },
              clickFn: () => router.push(`${customId}/edit-profile`),
              isActive: false,
            },
          ]
      : [
          {
            text: {
              default: t('Pages.Profile.ProfilePage-follow', '追蹤'),
              isActive: t('Pages.Profile.ProfilePage-following', '追蹤中'),
            },
            clickFn: handleClickFollow,
            isActive: isFollowing,
          },
        ]

  return (
    <>
      <section className="bg-white">
        <div className="flex max-h-[calc(100%_-_152px)] max-w-[theme(width.maxMain)] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full sm:pt-0 md:px-[70px] lg:px-10">
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
      </section>
      <Tab
        viewTabs={viewTabs}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      {activeTab === 'pick' && !!pickCollections.length && (
        <CollectionsCarousel pickCollections={pickCollections} />
      )}
      <ArticleCardList
        items={tabData}
        userType={userType}
        activeTab={activeTab}
        memberId={memberId}
        customId={customId}
        avatar={avatar}
        name={name}
      />
    </>
  )
}
