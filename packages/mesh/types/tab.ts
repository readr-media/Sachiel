export enum TabKey {
  PICK = '精選',
  FOLLOWER = '粉絲',
  FOLLOWING = '追蹤中',
  SPONSORED = '本月獲得贊助',
}

export type TabItem = {
  key: TabKey
  count: number | string | null
}
export enum TabCategory {
  PICK = 'PICKS',
  BOOKMARKS = 'BOOKMARKS',
  PUBLISH = 'PUBLISH',
}
