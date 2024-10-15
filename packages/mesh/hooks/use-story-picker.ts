import { useCallback, useState } from 'react'

import {
  addPick,
  addPickAndComment,
  removeComment,
  removePick,
} from '@/app/actions/pick'
import { getPickComment } from '@/app/actions/pick'
import { useUser } from '@/context/user'

export default function useStoryPicker() {
  const { user, setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const memberId = user.memberId

  // TODO: simplify the mutation and toast message
  const addStoryPick = useCallback(
    async (storyId: string) => {
      if (!memberId) return
      setIsLoading(true)
      const newPickStoryIds = new Set(user.pickStoryIds)
      newPickStoryIds.add(storyId)

      setUser((user) => ({
        ...user,
        pickStoryIds: newPickStoryIds,
      }))

      const addPickResponse = await addPick({ memberId, storyId })
      if (!addPickResponse) {
        newPickStoryIds.delete(storyId)
        setUser((user) => ({
          ...user,
          pickStoryIds: newPickStoryIds,
        }))
      }

      setIsLoading(false)
    },
    [memberId, user.pickStoryIds, setUser]
  )

  // TODO: simplify the mutation and toast message
  const removeStoryPick = useCallback(
    async (storyId: string) => {
      if (!memberId) return
      setIsLoading(true)
      const newPickStoryIds = new Set(user.pickStoryIds)
      newPickStoryIds.delete(storyId)

      setUser((user) => ({
        ...user,
        pickStoryIds: newPickStoryIds,
      }))

      const commentId = await getPickComment({ memberId, storyId })
      const removePickResponse = await removePick({ memberId, storyId })
      if (commentId) {
        await removeComment({
          memberId,
          commentId,
        })
      }

      if (!removePickResponse) {
        newPickStoryIds.add(storyId)
        setUser((user) => ({
          ...user,
          pickStoryIds: newPickStoryIds,
        }))
      }

      setIsLoading(false)
    },
    [memberId, user.pickStoryIds, setUser]
  )

  const addStoryPickAndComment = useCallback(
    async (storyId: string, comment: string) => {
      if (!memberId || !comment) return
      setIsLoading(true)
      const newPickStoryIds = new Set(user.pickStoryIds)
      newPickStoryIds.add(storyId)

      setUser((user) => ({
        ...user,
        pickStoryIds: newPickStoryIds,
      }))

      const addPickResponse = await addPickAndComment({
        memberId,
        storyId,
        comment,
      })
      if (!addPickResponse) {
        newPickStoryIds.delete(storyId)
        setUser((user) => ({
          ...user,
          pickStoryIds: newPickStoryIds,
        }))
      }

      setIsLoading(false)
    },
    [memberId, user.pickStoryIds, setUser]
  )

  return { addStoryPick, removeStoryPick, addStoryPickAndComment, isLoading }
}
