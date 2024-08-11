'use client'

import Link from 'next/link'

import Button from '@/components/button'
import Avatar from '@/components/story-card/avatar'

type FollowListItemProps = {
  followerId: string
  followerAvatar: string
  followerName: string
  followerCustomId: string
  type: 'member' | 'publisher'
  isMutualFans?: boolean
}

const FollowListItem = ({
  followerId,
  followerAvatar,
  followerName,
  followerCustomId,
  type,
  isMutualFans = true,
}: FollowListItemProps) => {
  const handleFollowOnClick = () => {
    // TODO: add function
    return
  }
  return (
    <li
      key={followerId}
      className="flex items-center justify-between pb-5 pt-[12.5px] first-of-type:pt-[24.5px] lg:px-5"
    >
      <Link
        href={`/profile/${type}/${followerCustomId}`}
        className="flex w-full grow items-center"
      >
        <Avatar src={followerAvatar} size="l" extra="mr-2 shrink-0" />
        <div className="mr-2 flex min-w-0 grow flex-col">
          <p className="subtitle-1 truncate">{followerName}</p>
          <p className="body-3 truncate text-primary-500">{followerCustomId}</p>
        </div>
        <div className="shrink-0">
          <Button
            color="white"
            onClick={handleFollowOnClick}
            size="sm"
            text="追蹤"
            activeState={{
              isActive: isMutualFans,
              activeText: '追蹤中',
            }}
          />
        </div>
      </Link>
    </li>
  )
}

export default FollowListItem
