'use client'

import { useState } from 'react'

import Button from '@/components/button'

export default function FollowButton({ id }: { id: string }) {
  const [isFollow, setIsFollow] = useState(false)

  const handelClickFollow = () => {
    setIsFollow(!isFollow)
  }

  return (
    <Button
      size="sm"
      color="transparent"
      text="追蹤"
      activeState={{
        isActive: isFollow,
        activeText: '追蹤中',
      }}
      onClick={handelClickFollow}
    />
  )
}
