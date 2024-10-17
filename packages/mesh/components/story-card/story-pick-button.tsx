'use client'

import { usePathname, useRouter } from 'next/navigation'

import type { ButtonColor } from '@/components/button'
import Button from '@/components/button'
import { usePickModal } from '@/context/pick-modal'
import { useUser } from '@/context/user'
import { debounce } from '@/utils/performance'

export default function StoryPickButton({
  storyId,
  color = 'white',
}: {
  storyId: string
  color?: ButtonColor
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
    openPickModal(storyId, isStoryPicked)
  })

  return (
    <Button
      size="sm"
      color={color}
      text="精選"
      icon={{ iconName: 'icon-star-primary', size: 's' }}
      onClick={handleClickPick}
      activeState={{
        isActive: isStoryPicked,
        activeText: '已精選',
        activeIcon: { iconName: 'icon-star-white', size: 's' },
      }}
    />
  )
}
