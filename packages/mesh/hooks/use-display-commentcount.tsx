import { useEffect, useState } from 'react'

import { usePickModal } from '@/context/pick-modal'

export function useDisplayCommentCount({
  objectiveId,
  initialCount,
}: {
  objectiveId: string
  initialCount: number
}) {
  const [displayCommentCount, setDisplayCommentCount] = useState(initialCount)
  const { interactCommentStack, setInteractCommentStack } = usePickModal()

  useEffect(() => {
    if (
      interactCommentStack.length > 0 &&
      objectiveId &&
      interactCommentStack.includes(objectiveId)
    ) {
      setDisplayCommentCount((prev) => prev + 1)
      setInteractCommentStack((prev) => prev.filter((id) => id !== objectiveId))
    }
  }, [
    interactCommentStack,
    interactCommentStack.length,
    setInteractCommentStack,
    objectiveId,
  ])

  return { displayCommentCount, setDisplayCommentCount }
}
