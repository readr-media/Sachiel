import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import type { UserType } from '@/types/profile'

const tabOptions = [
  { key: 'pick', labelKey: 'TabOption-pick' },
  { key: 'collection', labelKey: 'TabOption-collection' },
  { key: 'bookmark', labelKey: 'TabOption-bookmark' },
  { key: 'story', labelKey: 'TabOption-story' },
  { key: 'podcast', labelKey: 'TabOption-podcast' },
] as const

export type TabOption = typeof tabOptions
export type ProfileTabKey = typeof tabOptions[number]['key']
export type PublisherStoryType = Extract<ProfileTabKey, 'story' | 'podcast'>[]

const defaultTabsMap: Record<
  Exclude<UserType, 'publisher'>,
  ProfileTabKey[]
> = {
  visitor: ['pick', 'collection'],
  member: ['pick', 'collection', 'bookmark'],
}

export default function useProfileTab({
  userType,
  publisherStoryType,
}: {
  userType: UserType
  publisherStoryType?: PublisherStoryType
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab') as ProfileTabKey

  const currentTabs: ProfileTabKey[] = useMemo(() => {
    if (userType === 'publisher') {
      return publisherStoryType && publisherStoryType.length > 0
        ? publisherStoryType
        : ['story']
    }
    return defaultTabsMap[userType]
  }, [publisherStoryType, userType])

  const activeTab = currentTabs.includes(tabParam) ? tabParam : currentTabs[0]
  const viewTabs = tabOptions.filter(({ key }) => currentTabs.includes(key))

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
