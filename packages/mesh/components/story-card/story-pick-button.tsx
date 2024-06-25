'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import Button from '@/components/button'
import { addPick, removePick } from '@/utils/action'
import { debounce } from '@/utils/performance'

export default function StoryPickButton({
  isStoryPicked,
  storyId,
}: {
  isStoryPicked: boolean
  storyId: string
}) {
  const [isPicked, setIsPicked] = useState(isStoryPicked)
  //TODO: replace with logged-in member's status
  const params = useParams()
  const { id } = params
  const memberId = Array.isArray(id) ? id[0] : id

  const handleClickPick = debounce(async () => {
    if (isPicked) {
      const removePickResponse = await removePick({ memberId, storyId })
      setIsPicked(!isPicked)
    } else {
      const addPickResponse = await addPick({ memberId, storyId })
      setIsPicked(!isPicked)
    }
  })

  return (
    <Button
      size="sm"
      color="white"
      text="精選"
      icon={{ iconName: 'icon-star-primary', size: 's' }}
      onClick={handleClickPick}
      activeState={{
        isActive: isPicked,
        activeText: '已精選',
        activeIcon: { iconName: 'icon-star-white', size: 's' },
      }}
    />
  )
}
