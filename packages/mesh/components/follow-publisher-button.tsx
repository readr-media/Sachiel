'use client'

import { useTranslations } from 'next-intl'

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
  const t = useTranslations('Components.FollowPublisherButton')
  const { isFollowing, handleFollowOnClick } = useFollowPublisher({
    publisherId,
    publisherName,
  })

  return (
    <div className="shrink-0">
      <Button
        size={size}
        color="transparent"
        text={t('follow')}
        activeState={{
          isActive: isFollowing,
          activeText: t('following'),
        }}
        onClick={handleFollowOnClick}
      />
    </div>
  )
}
