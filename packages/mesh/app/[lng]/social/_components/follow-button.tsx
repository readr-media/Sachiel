'use client'

import { useT } from '@/app/i18n/client'
import Button from '@/components/button'
import { useFollow } from '@/hooks/use-follow'

export default function FollowButton({
  followingId,
  gtmClassName = '',
}: {
  followingId: string
  gtmClassName?: string
}) {
  const { handleClickFollow, isFollowing } = useFollow(followingId)
  const { t } = useT('components/social')

  return (
    <Button
      size="sm"
      color="transparent"
      text={t('followButton.follow', '追蹤')}
      activeState={{
        isActive: isFollowing,
        activeText: t('followButton.following', '追蹤中') ?? '追蹤中',
      }}
      onClick={handleClickFollow}
      gtmClassName={gtmClassName}
    />
  )
}
