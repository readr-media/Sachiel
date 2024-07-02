import MemberUserIntro from './member-user-intro'
import PublisherUserIntro from './publisher-user-intro'
import { type UserIntroProps, TabKey } from './types'
import { tabFilter } from './utils'
import VisitorUserIntro from './visitor-user-intro'

const UserIntro: React.FC<UserIntroProps> = (props) => {
  console.log(props)
  const userStatusList = [
    { key: TabKey.PICK, value: props.pickCount },
    { key: TabKey.FOLLOWER, value: props.followerCount },
    { key: TabKey.FOLLOWING, value: props.followingCount },
    { key: TabKey.SPONSORED, value: '9999次' },
  ].filter(tabFilter(props.userType))

  const childProps = { ...props, userStatusList }

  switch (props.userType) {
    case 'publisher':
      return <PublisherUserIntro {...childProps} />
    case 'visitor':
      return <VisitorUserIntro {...childProps} />
    case 'member':
    default:
      return <MemberUserIntro {...childProps} />
  }
}

export default UserIntro
