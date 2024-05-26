'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import type { User } from '@/types/graphql'

type FollowSuggestionUser = User & {
  isFollow: boolean
}

export default function FollowSuggestionFeed({
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
    <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white px-5 py-4 drop-shadow sm:rounded-md lg:hidden">
      <h2 className="list-title pb-3 text-primary-700 sm:pb-1">推薦追蹤</h2>
      <div className="flex h-[210px] flex-row gap-3 overflow-x-auto sm:h-[345px] sm:flex-col sm:gap-0">
        {FollowSuggestionUsers?.map((user, index) => (
          <div
            key={user.id}
            className="rounded-md border border-primary-200 px-3 pt-3 pb-4 sm:border-0 sm:p-0"
          >
            <div className="flex h-[180px] w-[124px] flex-col items-center gap-3 sm:h-[68px] sm:w-full sm:flex-row sm:py-3">
              {
                user.avatar ? (
                  <Image
                    className=" inline-block h-16 w-16 rounded-full ring-2 ring-white  sm:h-11 sm:w-11"
                    src={user.avatar}
                    width={64}
                    height={64}
                    alt={`${user.customId}-avatar`}
                  />
                ) : null
                // <Icon
                //   iconName="icon-avatar-default"
                //   size="2xl"
                //   className="h-16 w-16 sm:h-11 sm:w-11"
                // />
              }
              <div className="flex flex-col justify-center gap-3 sm:w-full sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col items-center gap-1 sm:items-start sm:gap-0.5">
                  <p className="subtitle-2 text-primary-700">{user.name}</p>
                  <p className="caption-1 text-center text-primary-500 sm:text-left">
                    <span>{user.follower[0].name}</span>
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
              <div className="hidden border-t-[0.5px] sm:block"></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
