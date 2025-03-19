'use client'
import { useTranslations } from 'next-intl'

import ArticleCardList from '@/app/profile/_components/article-card-list'
import type { ProfileButton } from '@/app/profile/_components/profile-button-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import useProfileTab, { type PublisherStoryType } from '@/hooks/use-profile-tab'
import useFollowPublisher from '@/hooks/use-publisher-follow'
import { type UserType, TabKey } from '@/types/profile'
import { type ProfileJSONType } from '@/utils/data-schema'

import PodcastList from './podcast-list'

type PublisherPageProps = {
  name: string
  avatar: string
  intro: string
  userType: UserType
  source: ProfileJSONType['source']
  storyData: ProfileJSONType['stories']
  podcastData: ProfileJSONType['podcasts']
  publisherId: string
  publisherCustomId: string
  publisherStoryType: PublisherStoryType
  followerCount: string
  sponsoredCount: string
  pickedCount: number
}

const PublisherPage: React.FC<PublisherPageProps> = ({
  name,
  avatar,
  intro,
  source,
  storyData,
  podcastData,
  userType,
  followerCount,
  sponsoredCount,
  pickedCount,
  publisherId,
  publisherCustomId,
  publisherStoryType,
}) => {
  const t = useTranslations('Pages.Profile')
  const { isFollowing, handleFollowOnClick } = useFollowPublisher({
    publisherId,
    publisherName: name,
  })
  const { activeTab, viewTabs, handleTabClick } = useProfileTab({
    userType,
    publisherStoryType,
  })

  const filteredViewTabs = !podcastData.length
    ? viewTabs.filter(({ key }) => key !== 'podcast')
    : viewTabs

  const userStatusList = [
    {
      tabName: t(TabKey.SPONSORED),
      count: t('PublisherPage-sponsor-count', { count: sponsoredCount }),
    },
    {
      tabName: t(TabKey.FOLLOWER),
      count: followerCount,
      redirectLink: `${publisherCustomId}/follower`,
    },
  ]

  const buttonList: ProfileButton[] = [
    {
      text: {
        default: t('ProfilePage-follow'),
        isActive: t('ProfilePage-following'),
      },
      isActive: isFollowing,
      clickFn: handleFollowOnClick,
    },
    {
      text: { default: t('PublisherPage-sponsor-or-payment'), isActive: '' },
      color: 'custom-blue',
      isActive: false,
      component: <PublisherDonateButton key={0} publisherId={publisherId} />,
    },
  ]

  return (
    <>
      <section className="bg-white">
        <div className="flex max-h-[calc(100%_-_152px)] max-w-[theme(width.maxMain)] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full sm:pt-0 md:px-[70px] lg:px-10">
          <UserProfile
            userType={userType}
            name={name}
            avatar={avatar}
            intro={intro}
            pickedCount={pickedCount}
          />
          <ProfileButtonList buttonList={buttonList} />
          <UserStatusList userStatusList={userStatusList} />
        </div>
      </section>
      <Tab
        viewTabs={filteredViewTabs}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
      {activeTab === 'story' ? (
        <ArticleCardList
          items={storyData}
          userType={userType}
          activeTab={activeTab}
        />
      ) : (
        <PodcastList list={podcastData} source={source} />
      )}
    </>
  )
}

export default PublisherPage
