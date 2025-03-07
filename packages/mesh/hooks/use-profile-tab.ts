import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import type { UserType } from '@/types/profile'

const tabOptions = [
  { key: 'pick', label: '精選' },
  { key: 'collection', label: '集錦' },
  { key: 'bookmark', label: '書籤' },
  { key: 'story', label: '報導' },
  { key: 'podcast', label: 'Podcast' },
] as const
export type ProfileTabKey = typeof tabOptions[number]['key']
export const visibleTabsMap: Record<UserType, ProfileTabKey[]> = {
  visitor: ['pick', 'collection'],
  publisher: ['story', 'podcast'],
  member: ['pick', 'collection', 'bookmark'],
}

export default function useProfileTab(userType: UserType) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab') as ProfileTabKey
  const activeTab = visibleTabsMap[userType].includes(tabParam)
    ? tabParam
    : visibleTabsMap[userType][0]
  const viewTabs = tabOptions.filter((tab) =>
    visibleTabsMap[userType].includes(tab.key)
  )

  const handleTabClick = useCallback(
    (tabKey: ProfileTabKey) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('tab', tabKey)
      router.push(`?${params.toString()}`, { scroll: false })
    },
    [searchParams, router]
  )

  return { activeTab, viewTabs, handleTabClick }
}
