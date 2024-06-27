import MemberUserIntro from './member-user-intro'
import PublisherUserIntro from './publisher-user-intro'
import VisitorUserIntro from './visitor-user-intro'

type UserIntroProps = {
  id: string
  name: string
  avatar: string
  intro: string
  pickCount: number | null
  followingCount: number | null
  followerCount: number
  userType?: string
}

enum TabKey {
  PICK = '精選',
  FOLLOWER = '粉絲',
  FOLLOWING = '追蹤中',
  SPONSORED = '本月獲得贊助',
}

export type TabItem = {
  key: TabKey
  value: number | string | null
}

const UserIntro = ({
  avatar,
  name,
  pickCount,
  intro,
  followingCount,
  followerCount,
  userType = 'member',
}: UserIntroProps) => {
  let ContentComponent

  switch (userType) {
    case 'member':
      ContentComponent = MemberUserIntro
      break
    case 'visitor':
      ContentComponent = VisitorUserIntro
      break
    case 'publisher':
      ContentComponent = PublisherUserIntro
      break
    default:
      ContentComponent = MemberUserIntro
  }

  const userStatusList = [
    { key: TabKey.PICK, value: pickCount },
    { key: TabKey.FOLLOWER, value: followerCount },
    { key: TabKey.FOLLOWING, value: followingCount },
    // TODO: 後續加上贊助資料: `${sponsorCount}次`
    { key: TabKey.SPONSORED, value: '9999次' },
  ]

  const PUBLISHER_TAB_KEYS = new Set([TabKey.FOLLOWER, TabKey.SPONSORED])
  const MEMBER_TAB_KEYS = new Set([
    TabKey.PICK,
    TabKey.FOLLOWER,
    TabKey.FOLLOWING,
  ])

  const createTabFilter = (allowedKeys: Set<string>) => {
    return (tabItem: TabItem) => allowedKeys.has(tabItem.key)
  }

  const tabFilter = (userType: string) => {
    switch (userType) {
      case 'publisher':
        return createTabFilter(PUBLISHER_TAB_KEYS)
      case 'member':
      default:
        return createTabFilter(MEMBER_TAB_KEYS)
    }
  }

  return (
    <>
      <ContentComponent
        avatar={avatar}
        name={name}
        pickCount={pickCount}
        intro={intro}
        userType={userType}
        userStatusList={userStatusList.filter(tabFilter(userType))}
      />
    </>
  )
}

export default UserIntro
