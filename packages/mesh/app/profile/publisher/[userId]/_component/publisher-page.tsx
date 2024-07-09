import { type GetPublisherProfileQuery } from '@/graphql/__generated__/graphql'
import { TabKey } from '@/types/tab'

import ProfileButtonLIst from './profile-button-list'
import StoryCardList from './story-card-list'
import Tab from './tab'
import UserProfile from './user-profile'
import UserStatusList from './user-status-list'

export type userType = 'publisher'
type PublisherPageProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number | null
  userType: userType
  storyData: NonNullable<GetPublisherProfileQuery['stories']>
  userId: string
}

const PublisherPage: React.FC<PublisherPageProps> = ({
  userType,
  name,
  avatar,
  intro,
  pickCount,
  storyData,
}) => {
  const userStatusList = [{ key: TabKey.SPONSORED, count: '9999次' }]

  const buttonList = [
    { text: '追蹤' },
    { text: '贊助/訂閱媒體', primary: true },
  ]

  return (
    <>
      <div className="flex max-h-[calc(100%_-_152px)] flex-col items-center px-5 pb-8 pt-6 sm:max-h-full">
        <UserProfile
          name={name}
          pickCount={pickCount || 0}
          avatar={avatar}
          intro={intro}
        />
        <ProfileButtonLIst buttonList={buttonList} />
        <UserStatusList userStatusList={userStatusList} />
      </div>
      <Tab />
      <StoryCardList
        storyData={storyData}
        avatar={avatar}
        userType={userType}
      />
    </>
  )
}

export default PublisherPage
