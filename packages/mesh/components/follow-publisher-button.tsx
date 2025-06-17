'use client'

import Button, { type ButtonSize } from '@/components/button'
import useFollowPublisher from '@/hooks/use-publisher-follow'

export default function FollowPublisherButton({
  size,
  publisherId,
  publisherName,
}: {
  size: ButtonSize
  publisherId: string
  publisherName: string
}) {
  const { isFollowing, handleFollowOnClick } = useFollowPublisher({
    publisherId,
    publisherName,
  })

  return (
    <div className="shrink-0">
      <Button
        size={size}
        color="transparent"
        text="追蹤"
        activeState={{
          isActive: isFollowing,
          activeText: '追蹤中',
        }}
        onClick={handleFollowOnClick}
      />
    </div>
  )
}
