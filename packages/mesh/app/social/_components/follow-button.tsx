'use client'

import { useCallback, useState } from 'react'

import {
  addMemberFollowing,
  removeMemberFollowing,
} from '@/app/actions/mutate-member-following'
import Button from '@/components/button'

export default function FollowButton({
  currentUserId,
  followingId,
}: {
  currentUserId: string
  followingId: string
}) {
  const [isFollow, setIsFollow] = useState(false)

  const handelClickFollow = useCallback(async () => {
    if (!isFollow) {
      const response = await addMemberFollowing(currentUserId, followingId)
      if (response) setIsFollow((prev) => !prev)
    } else {
      const response = await removeMemberFollowing(currentUserId, followingId)
      if (response) setIsFollow((prev) => !prev)
    }
  }, [currentUserId, followingId, isFollow])

  return (
    <Button
      size="sm"
      color="transparent"
      text="追蹤"
      activeState={{
        isActive: isFollow,
        activeText: '追蹤中',
      }}
      onClick={handelClickFollow}
    />
  )
}
