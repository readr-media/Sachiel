'use client'

import Button from '@/components/button'
import Avatar from '@/components/story-card/avatar'

type FollowListItemProps = {
  followerId: string
  followerAvatar: string
  followerName: string
  followerCustomId: string
}

const FollowListItem = ({
  followerId,
  followerAvatar,
  followerName,
  followerCustomId,
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
      <span className="flex items-center">
        <Avatar src={followerAvatar} size="l" extra="mr-2" />
        <div className="flex flex-col">
          <p className="subtitle-1">{followerName}</p>
          <p className="body-3 text-primary-500">{followerCustomId}</p>
        </div>
      </span>
      <Button
        color="white"
        onClick={handleFollowOnClick}
        size="sm"
        text="追蹤"
        activeState={{
          isActive: true,
          activeText: '追蹤中',
        }}
      />
    </li>
  )
}

export default FollowListItem
