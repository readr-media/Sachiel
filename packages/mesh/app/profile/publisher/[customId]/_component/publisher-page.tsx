'use client'
import ArticleCardList from '@/app/profile/_components/article-card-list'
import type { ProfileButton } from '@/app/profile/_components/profile-button-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import useFollowPublisher from '@/hooks/use-publisher-follow'
import { type UserType, TabCategory, TabKey } from '@/types/profile'
import type { PublisherProfile } from '@/utils/data-schema'

type PublisherPageProps = {
  name: string
  avatar: string
  intro: string
  userType: UserType
  storyData: PublisherProfile['stories']
  publisherId: string
  publisherCustomId: string
  followerCount: string
  sponsoredCount: string
  pickedCount: number
}

const PublisherPage: React.FC<PublisherPageProps> = ({
  name,
  avatar,
  intro,
  storyData,
  userType,
  followerCount,
  sponsoredCount,
  pickedCount,
  publisherId,
  publisherCustomId,
}) => {
  const { isFollowing, handleFollowOnClick } = useFollowPublisher({
    publisherId,
    publisherName: name,
  })
  const userStatusList = [
    { tabName: TabKey.SPONSORED, count: `${sponsoredCount}次` },
    {
      tabName: TabKey.FOLLOWER,
      count: followerCount,
      redirectLink: `${publisherCustomId}/follower`,
    },
  ]

  const buttonList: ProfileButton[] = [
    {
      text: { default: '追蹤', isActive: '追蹤中' },
      isActive: isFollowing,
      clickFn: handleFollowOnClick,
    },
    {
      text: { default: '贊助/訂閱媒體', isActive: '' },
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
      <Tab userType={userType} tabCategory={TabCategory.PUBLISH} />
      <ArticleCardList
        items={storyData}
        shouldShowComment={false}
        emptyMessage="這個媒體還沒有發佈任何新聞"
      />
    </>
  )
}

export default PublisherPage
