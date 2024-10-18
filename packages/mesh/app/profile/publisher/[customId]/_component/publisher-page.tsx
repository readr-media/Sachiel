'use client'
import {
  addFollowPublisher,
  removeFollowPublisher,
} from '@/app/actions/follow-publisher'
import ArticleCardList from '@/app/profile/_components/article-card-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import { useUser } from '@/context/user'
import {
  type StoryData,
  type UserType,
  TabCategory,
  TabKey,
} from '@/types/profile'
import { debounce } from '@/utils/performance'

type PublisherPageProps = {
  name: string
  avatar: string
  intro: string
  userType: UserType
  storyData: StoryData
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
  const { user, setUser } = useUser()
  const followingPublisherList = user.followingPublishers

  const isFollowing = !!followingPublisherList.find(
    (publisher) => publisher.id === publisherId
  )
  const handleFollowOnClick = debounce(() => {
    const followPublisherArgs = {
      memberId: user.memberId,
      publisherId,
    }
    if (isFollowing) {
      setUser((prev) => {
        return {
          ...prev,
          followingPublishers: prev.followingPublishers.filter(
            (publisher) => publisher.id !== publisherId
          ),
        }
      })
      removeFollowPublisher(followPublisherArgs)
    } else {
      setUser((prev) => {
        const newPublisher = {
          __typename: 'Publisher' as const,
          id: publisherId,
          title: name,
        }
        return {
          ...prev,
          followingPublishers: [...prev.followingPublishers, newPublisher],
        }
      })
      return addFollowPublisher(followPublisherArgs)
    }
  })
  const userStatusList = [
    { tabName: TabKey.SPONSORED, count: `${sponsoredCount}次` },
    {
      tabName: TabKey.FOLLOWER,
      count: followerCount,
      redirectLink: `${publisherCustomId}/follower`,
    },
  ]

  const buttonList = [
    {
      text: { default: '追蹤', isActive: '追蹤中' },
      isActive: isFollowing,
      clickFn: handleFollowOnClick,
    },
    {
      text: { default: '贊助/訂閱媒體', isActive: '' },
      primary: true,
      isActive: false,
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
