'use client'

import { useMemo, useState } from 'react'

import type { MongoDBResponse, MostFollowersMember } from '@/utils/data-schema'

type SuggestedFollowers = MongoDBResponse['members'] | MostFollowersMember[]

const suggestedFollowersPageSize = 5

export default function useSuggestedFollowers(
  suggestedFollowers: MongoDBResponse['members'] | MostFollowersMember[]
) {
  const [page, setPage] = useState(1)

  const displaySuggestedFollowers = useMemo(() => {
    return suggestedFollowers.slice(
      (page - 1) * suggestedFollowersPageSize,
      page * suggestedFollowersPageSize
    ) as SuggestedFollowers
  }, [page, suggestedFollowers])
  const hasNextPage = useMemo(() => {
    return page * suggestedFollowersPageSize < suggestedFollowers.length
  }, [page, suggestedFollowers.length])

  return { displaySuggestedFollowers, setPage, hasNextPage }
}
