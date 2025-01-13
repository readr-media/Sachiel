'use client'

import { usePathname, useRouter } from 'next/navigation'

import type { ButtonColor } from '@/components/button'
import Button from '@/components/button'
import { usePickModal } from '@/context/pick-modal'
import { useUser } from '@/context/user'
import { PickObjective } from '@/types/objective'
import { debounce } from '@/utils/performance'

export default function StoryPickButton({
  storyId,
  color = 'white',
  gtmClassName = '',
}: {
  storyId: string
  color?: ButtonColor
  gtmClassName?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useUser()
  const { openPickModal } = usePickModal()
  const memberId = user.memberId
  const isStoryPicked = user.pickStoryIds.has(storyId)

  const handleClickPick = debounce(async () => {
    if (!memberId) {
      localStorage.setItem('login-redirect', pathname)
      router.push('/login')
      return
    }
    openPickModal(PickObjective.Story, storyId, isStoryPicked)
  })

  return (
    <Button
      size="sm"
      color={color}
      text="精選"
      icon={{ iconName: 'icon-star-primary', size: 's' }}
      onClick={(evt) => {
        evt.preventDefault()
        handleClickPick()
      }}
      activeState={{
        isActive: isStoryPicked,
        activeText: '已精選',
        activeIcon: { iconName: 'icon-star-white', size: 's' },
      }}
      gtmClassName={gtmClassName}
    />
  )
}
