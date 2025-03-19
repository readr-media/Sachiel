'use client'

import { useTranslations } from 'next-intl'

import Button from '@/components/button'
import { useFollow } from '@/hooks/use-follow'

export default function FollowButton({
  followingId,
  gtmClassName = '',
}: {
  followingId: string
  gtmClassName?: string
}) {
  const t = useTranslations('Components.FollowButton')
  const { handleClickFollow, isFollowing } = useFollow(followingId)

  return (
    <Button
      size="sm"
      color="transparent"
      text={t('follow')}
      activeState={{
        isActive: isFollowing,
        activeText: t('following'),
      }}
      onClick={handleClickFollow}
      gtmClassName={gtmClassName}
    />
  )
}
