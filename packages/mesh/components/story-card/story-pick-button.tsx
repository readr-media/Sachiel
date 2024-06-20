'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import Button from '@/components/button'
import { RESTFUL_ENDPOINTS } from '@/constants/config'
import fetchData from '@/utils/fetch-statics'

export default function StoryPickButton({
  isStoryPicked,
  storyId,
}: {
  isStoryPicked: boolean
  storyId: string
}) {
  const [isPicked, setIsPicked] = useState(isStoryPicked)
  const params = useParams()
  const { id: memberId } = params

  const handleClickPick = async () => {
    setIsPicked(!isPicked)

    const payload = {
      action: isPicked ? 'remove_pick' : 'add_pick',
      memberId,
      objective: 'story',
      targetId: storyId,
      ...(!isPicked && { state: 'public' }),
    }
    const response = await fetchData(RESTFUL_ENDPOINTS.pubsub, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  }

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
