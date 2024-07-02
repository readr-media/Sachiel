import { type TabItem, TabKey } from './types'

const PUBLISHER_TAB_KEYS = new Set([TabKey.FOLLOWER, TabKey.SPONSORED])
const MEMBER_TAB_KEYS = new Set([
  TabKey.PICK,
  TabKey.FOLLOWER,
  TabKey.FOLLOWING,
])

export const createTabFilter = (allowedKeys: Set<TabKey>) => {
  return (tabItem: TabItem) => allowedKeys.has(tabItem.key)
}

export const tabFilter = (userType: string) => {
  switch (userType) {
    case 'publisher':
      return createTabFilter(PUBLISHER_TAB_KEYS)
    case 'member':
    case 'visitor':
    default:
      return createTabFilter(MEMBER_TAB_KEYS)
  }
}
