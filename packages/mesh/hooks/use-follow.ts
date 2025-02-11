'use client'

import {
  addMemberFollowing,
  removeMemberFollowing,
} from '@/app/actions/mutate-member-following'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import { debounce } from '@/utils/performance'

import useRedirectLogin from './use-redirect-login'

export const useFollow = (followingId: string) => {
  const { user, setUser } = useUser()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()
  const memberId = user.memberId
  const isFollowing = user.followingMemberIds.has(followingId)
  const { addToast } = useToast()

  const handleClickFollow = debounce(async () => {
    if (detectIfShouldRedirectToLogin()) {
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

  return { handleClickFollow, isFollowing }
}
