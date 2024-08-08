'use client'

import { useRouter } from 'next/navigation'

import {
  addMemberFollowing,
  removeMemberFollowing,
} from '@/app/actions/mutate-member-following'
import Button from '@/components/button'
import { useUser } from '@/context/user'
import { debounce } from '@/utils/performance'

export default function FollowButton({ followingId }: { followingId: string }) {
  const router = useRouter()
  const { user, setUser } = useUser()
  const memberId = user?.memberId
  const isFollowing =
    user?.followingMembers.findIndex(
      (following) => following.id === followingId
    ) !== -1

  const handelClickFollow = debounce(async () => {
    if (!memberId) {
      router.push('/login')
      return
    }

    if (!isFollowing) {
      // TODO: simplify the mutation
      setUser((user) => ({
        ...user,
        followingMembers: [...user.followingMembers, { id: followingId }],
      }))
      const response = await addMemberFollowing(memberId, followingId)
      if (!response) {
        // TODO: error toast
        // TODO: simplify the mutation
        setUser((user) => ({
          ...user,
          followingMembers: user.followingMembers.filter(
            (following) => following.id !== followingId
          ),
        }))
      }
    } else {
      // TODO: simplify the mutation
      setUser((user) => ({
        ...user,
        followingMembers: user.followingMembers.filter(
          (following) => following.id !== followingId
        ),
      }))

      const response = await removeMemberFollowing(memberId, followingId)
      if (!response) {
        // TODO: error toast
        // TODO: simplify the mutation
        setUser((user) => ({
          ...user,
          followingMembers: [...user.followingMembers, { id: followingId }],
        }))
      }
    }
  })

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
