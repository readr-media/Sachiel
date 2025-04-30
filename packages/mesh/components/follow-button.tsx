'use client'

import Button from '@/components/button'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { useFollow } from '@/hooks/use-follow'

export default function FollowButton({
  followingId,
  gtmClassName = '',
}: {
  followingId: string
  gtmClassName?: string
}) {
  const { t } = useCustomTranslation()
  const { handleClickFollow, isFollowing } = useFollow(followingId)

  return (
    <Button
      size="sm"
      color="transparent"
      text={t('Components.FollowButton.follow', '追蹤')}
      activeState={{
        isActive: isFollowing,
        activeText: t('Components.FollowButton.following', '追蹤中'),
      }}
      onClick={handleClickFollow}
      gtmClassName={gtmClassName}
    />
  )
}
