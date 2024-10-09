'use client'

import Button from '@/components/button'
import { useFollow } from '@/hooks/use-follow'

export default function FollowButton({ followingId }: { followingId: string }) {
  const { handelClickFollow, isFollowing } = useFollow(followingId)

  return (
    <Button
      size="sm"
      color="transparent"
      text="追蹤"
      activeState={{
        isActive: isFollowing,
        activeText: '追蹤中',
      }}
      onClick={handelClickFollow}
    />
  )
}
