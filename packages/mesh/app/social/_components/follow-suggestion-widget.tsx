'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import type { User } from '@/types/graphql'

type FollowSuggestionUser = User & {
  isFollow: boolean
}

export default function FollowSuggestionWidget({
  recommendedFollowers,
}: {
  recommendedFollowers: User[]
}) {
  const [FollowSuggestionUsers, setFollowSuggestionUsers] = useState<
    FollowSuggestionUser[] | null
  >(null)

  useEffect(() => {
    const newData = recommendedFollowers.map((user) => ({
      ...user,
      isFollow: false,
    }))
    setFollowSuggestionUsers(newData)
  }, [recommendedFollowers])

  const handleClickFollow = (id: string) => {
    // TODO: update user following data
    if (FollowSuggestionUsers) {
      const updatedFollowSuggestionUsers = FollowSuggestionUsers.map((user) =>
        user.id === id ? { ...user, isFollow: !user.isFollow } : user
      )
      setFollowSuggestionUsers(updatedFollowSuggestionUsers)
    }
  }

  return (
    <div className="hidden grow flex-col lg:flex lg:max-w-[260px] xl:max-w-[400px]">
      <h2 className="list-title pb-1 text-primary-700">推薦追蹤</h2>
      {FollowSuggestionUsers?.map((user, index) => (
        <div key={user.id}>
          <div className="flex flex-row items-center py-3">
            {user.avatar ? (
              <Image
                className="h-11 w-11 rounded-full ring-2 ring-white"
                src={user.avatar}
                width={44}
                height={44}
                alt={`${user.id}-avatar`}
              />
            ) : (
              <Icon
                iconName="icon-avatar-default"
                size="2xl"
                className="h-11 w-11"
              />
            )}
            <div className="flex w-full items-center justify-between">
              <div className="ml-3 overflow-hidden lg:max-w-[96px] xl:max-w-[236px]">
                <p className="subtitle-2 mb-[2px] text-primary-700">
                  {user.name}
                </p>
                <p className="caption-1 line-clamp-1 text-primary-500">
                  <span>{user.follower?.[0].name}</span>
                  及其他<span> {user.followerCount} </span>
                  的追蹤對象
                </p>
              </div>
              <Button
                size="sm"
                color="transparent"
                text="追蹤"
                activeState={{
                  isActive: user.isFollow,
                  activeText: '追蹤中',
                }}
                onClick={() => handleClickFollow(user.id)}
              />
            </div>
          </div>
          {index !== FollowSuggestionUsers.length - 1 ? (
            <div className="border-t-[0.5px]"></div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
