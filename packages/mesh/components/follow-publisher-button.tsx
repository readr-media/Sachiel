'use client'

import Button, { type ButtonSize } from '@/components/button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
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
  const { t } = useCustomTranslation()

  return (
    <div className="shrink-0">
      <Button
        size={size}
        color="transparent"
        text={t('Components.FollowPublisherButton.follow', '追蹤')}
        activeState={{
          isActive: isFollowing,
          activeText: t('Components.FollowPublisherButton.following', '追蹤中'),
        }}
        onClick={handleFollowOnClick}
      />
    </div>
  )
}
