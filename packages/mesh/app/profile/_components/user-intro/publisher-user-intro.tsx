import type { TabItem, UserIntroProps } from './types'
import UserIntroBase from './user-intro-base'

const PublisherUserIntro = (
  props: UserIntroProps & { userStatusList: TabItem[] }
) => (
  <UserIntroBase
    {...props}
    buttons={[{ text: '追蹤' }, { text: '訂閱/贊助媒體', primary: true }]}
  >
    {/* Publisher specific content */}
  </UserIntroBase>
)
export default PublisherUserIntro
