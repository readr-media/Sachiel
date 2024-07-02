import type { TabItem, UserIntroProps } from './types'
import UserIntroBase from './user-intro-base'

const VisitorUserIntro = (
  props: UserIntroProps & { userStatusList: TabItem[] }
) => (
  <UserIntroBase {...props} buttons={[{ text: '追蹤' }]}>
    <p className="text-[13px] font-normal leading-[19.5px] text-primary-500 sm:text-sm sm:leading-[14px]">
      本週精選了<span className="text-primary-800"> {props.pickCount} </span>
      篇文章
    </p>
  </UserIntroBase>
)

export default VisitorUserIntro
