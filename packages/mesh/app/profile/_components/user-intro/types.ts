export enum TabKey {
  PICK = '精選',
  FOLLOWER = '粉絺',
  FOLLOWING = '追蹤中',
  SPONSORED = '本月獲得贊助',
}

export type TabItem = {
  key: TabKey
  value: number | string | null
}
export type userType = 'member' | 'publisher' | 'visitor'

export type UserIntroProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number | null
  followingCount: number | null
  followerCount: number
  userType: userType
}

export type ButtonConfig = {
  text: string
  primary?: boolean
}
