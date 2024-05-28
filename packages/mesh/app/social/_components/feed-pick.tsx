'use client'

import { useState } from 'react'

import Button from '@/components/button'

export default function FeedPick({ isFeedPicked }: { isFeedPicked: boolean }) {
  const [isPicked, setIsPicked] = useState(isFeedPicked)

  const handleClickPick = () => {
    setIsPicked(!isPicked)
    if (!isPicked) {
      //TODO: handleCreatePick()
    } else {
      //TODO: handleDeletePick()
    }
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
