import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import { type GetPublisherProfileQuery } from '@/graphql/__generated__/graphql'
import { TabCategory, TabKey } from '@/types/tab'

import StoryCardList from './story-card-list'

export type userType = 'publisher'
type PublisherPageProps = {
  name: string
  avatar: string
  intro: string
  userType: userType
  storyData: NonNullable<GetPublisherProfileQuery['stories']>
  userId: string
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
}) => {
  const userStatusList = [
    { tabName: TabKey.SPONSORED, count: `${sponsoredCount}次` },
    { tabName: TabKey.FOLLOWER, count: followerCount },
  ]

  const buttonList = [
    { text: '追蹤' },
    { text: '贊助/訂閱媒體', primary: true },
  ]

  return (
    <>
      <div className="flex max-h-[calc(100%_-_152px)] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full">
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
      <Tab userType={userType} tabCategory={TabCategory.PUBLISH} />
      <StoryCardList storyData={storyData} userType={userType} />
    </>
  )
}

export default PublisherPage
