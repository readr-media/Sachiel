'use client'

import type { ButtonColor } from '@/components/button'
import Button from '@/components/button'
import { usePickModal } from '@/context/pick-modal'
import { useUser } from '@/context/user'
import useRedirectLogin from '@/hooks/use-redirect-login'
import { PickObjective } from '@/types/objective'
import { debounce } from '@/utils/performance'

export default function StoryPickButton({
  storyId,
  storyTitle,
  color = 'white',
  gtmClassName = '',
}: {
  storyId: string
  storyTitle: string
  color?: ButtonColor
  gtmClassName?: string
}) {
  const { user } = useUser()
  const { openPickModal } = usePickModal()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()
  const isStoryPicked = user.pickStoryIds.has(storyId)

  const handleClickPick = debounce(async () => {
    if (detectIfShouldRedirectToLogin()) {
      return
    }
    openPickModal(PickObjective.Story, storyId, storyTitle, isStoryPicked)
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
