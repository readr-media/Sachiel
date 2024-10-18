'use client'

import { usePathname, useRouter } from 'next/navigation'

import {
  addMemberFollowing,
  removeMemberFollowing,
} from '@/app/actions/mutate-member-following'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import { debounce } from '@/utils/performance'

export const useFollow = (followingId: string) => {
  const router = useRouter()
  const pathname = usePathname()
  const { user, setUser } = useUser()
  const memberId = user.memberId
  const isFollowing = user.followingMemberIds.has(followingId)
  const { addToast } = useToast()

  const handelClickFollow = debounce(async () => {
    if (!memberId) {
      localStorage.setItem('login-redirect', pathname)
      router.push('/login')
      return
    }

    const newFollowingMemberIds = new Set(user.followingMemberIds)
    if (!isFollowing) {
      // TODO: simplify the mutation
      newFollowingMemberIds.add(followingId)
      setUser((user) => ({
        ...user,
        followingMemberIds: newFollowingMemberIds,
      }))
      const response = await addMemberFollowing(memberId, followingId)
      if (!response) {
        addToast({ status: 'fail', text: TOAST_MESSAGE.followMemberFailed })
        // TODO: simplify the mutation
        newFollowingMemberIds.delete(followingId)
        setUser((user) => ({
          ...user,
          followingMemberIds: newFollowingMemberIds,
        }))
      }
    } else {
      // TODO: simplify the mutation
      newFollowingMemberIds.delete(followingId)
      setUser((user) => ({
        ...user,
        followingMemberIds: newFollowingMemberIds,
      }))

      const response = await removeMemberFollowing(memberId, followingId)
      if (!response) {
        addToast({ status: 'fail', text: TOAST_MESSAGE.unfollowMemberFailed })
        // TODO: simplify the mutation
        newFollowingMemberIds.add(followingId)
        setUser((user) => ({
          ...user,
          followingMemberIds: newFollowingMemberIds,
        }))
      }
    }
  })

  return { handelClickFollow, isFollowing }
}
