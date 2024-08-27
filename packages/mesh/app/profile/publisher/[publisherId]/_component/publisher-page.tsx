import ArticleCardList from '@/app/profile/_components/article-card-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import {
  type StoryData,
  type UserType,
  TabCategory,
  TabKey,
} from '@/types/profile'

type PublisherPageProps = {
  name: string
  avatar: string
  intro: string
  userType: UserType
  storyData: StoryData
  publisherId: string
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
}) => {
  const userStatusList = [
    { tabName: TabKey.SPONSORED, count: `${sponsoredCount}次` },
    {
      tabName: TabKey.FOLLOWER,
      count: followerCount,
      redirectLink: `${publisherId}/follower`,
    },
  ]

  const buttonList = [
    { text: '追蹤' },
    { text: '贊助/訂閱媒體', primary: true },
  ]

  return (
    <>
      <section className="bg-white">
        <div className="flex max-h-[calc(100%_-_152px)] max-w-[1120px] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full">
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
