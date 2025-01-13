'use client'

import { useRouter } from 'next/navigation'

import type { ButtonColor, ButtonSize } from '@/components/button'
import Button from '@/components/button'
import { usePickModal } from '@/context/pick-modal'
import { useUser } from '@/context/user'
import { PickObjective } from '@/types/objective'
import { debounce } from '@/utils/performance'

export default function CollectionPickButton({
  collectionId,
  color = 'white',
  size = 'sm',
  gtmClassName = '',
}: {
  collectionId: string
  color?: ButtonColor
  size?: ButtonSize
  gtmClassName?: string
}) {
  const router = useRouter()
  const { user } = useUser()
  const { openPickModal } = usePickModal()
  const memberId = user.memberId
  const isStoryPicked = user.pickCollectionIds.has(collectionId)

  const handleClickPick = debounce(async () => {
    if (!memberId) {
      router.push('/login')
      return
    }
    openPickModal(PickObjective.Collection, collectionId, isStoryPicked)
  })

  return (
    <Button
      size={size}
      color={color}
      text="精選"
      icon={{ iconName: 'icon-star-primary', size: 's' }}
      onClick={handleClickPick}
      activeState={{
        isActive: isStoryPicked,
        activeText: '已精選',
        activeIcon: { iconName: 'icon-star-white', size: 's' },
      }}
      gtmClassName={gtmClassName}
    />
  )
}
