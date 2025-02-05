import { useCallback, useState } from 'react'

import {
  addPick as sendAddPick,
  addPickAndComment as sendAddPickAndComment,
  removeComment as sendRemoveComment,
  removePick as sendRemovePick,
} from '@/app/actions/pick'
import { getPickComment } from '@/app/actions/pick'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import type { PickObjective } from '@/types/objective'
import { addPickToUser, removePickFromUser } from '@/utils/mutate-user-pick-ids'

export default function usePicker() {
  const { user, setUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const memberId = user.memberId
  const { addToast } = useToast()

  const addPick = useCallback(
    async (targetId: string, pickObjective: PickObjective) => {
      if (!memberId) return
      setIsLoading(true)

      const reverseMutation = addPickToUser(
        pickObjective,
        targetId,
        user,
        setUser
      )

      const addPickResponse = await sendAddPick({
        memberId,
        targetId,
        pickObjective,
      })
      if (!addPickResponse) {
        addToast({ status: 'fail', text: TOAST_MESSAGE.pickStoryFailed })
        reverseMutation()
      }
      setIsLoading(false)
    },
    [memberId, user, setUser, addToast]
  )

  const removePick = useCallback(
    async (targetId: string, pickObjective: PickObjective) => {
      if (!memberId) return
      setIsLoading(true)
      const reverseMutation = removePickFromUser(
        pickObjective,
        targetId,
        user,
        setUser
      )
      const commentId = await getPickComment({
        memberId,
        targetId,
        pickObjective,
      })
      const removePickResponse = await sendRemovePick({
        memberId,
        targetId,
        pickObjective,
      })
      if (commentId) {
        await sendRemoveComment({
          memberId,
          commentId,
        })
      }

      if (!removePickResponse) {
        addToast({ status: 'fail', text: TOAST_MESSAGE.deletePickFailed })
        reverseMutation()
      }
      setIsLoading(false)
    },
    [memberId, user, setUser, addToast]
  )

  const addPickAndComment = useCallback(
    async (targetId: string, pickObjective: PickObjective, comment: string) => {
      if (!memberId || !comment) return
      setIsLoading(true)

      const reverseMutation = addPickToUser(
        pickObjective,
        targetId,
        user,
        setUser
      )
      const addPickResponse = await sendAddPickAndComment({
        memberId,
        targetId,
        pickObjective,
        comment,
      })
      if (!addPickResponse) {
        addToast({ status: 'fail', text: TOAST_MESSAGE.pickStoryFailed })
        reverseMutation()
      }
      setIsLoading(false)
    },
    [memberId, user, setUser, addToast]
  )

  return {
    addPick,
    removePick,
    addPickAndComment,
    isLoading,
  }
}
