'use client'

import NextLink from 'next/link'

import Button from '@/components/button'
import Avatar from '@/components/story-card/avatar'
import { useUser } from '@/context/user'
import { useFollow } from '@/hooks/use-follow'
import type { Collector } from '@/types/homepage'

type Props = {
  person: Collector
  rank: number
}

export default function TopCollectorCard({ person, rank }: Props) {
  const { handleClickFollow, isFollowing } = useFollow(String(person.id))
  const { user } = useUser()

  return (
    <div className="mb-3 flex items-center gap-y-3 border-b-[0.5px] pb-3 last:border-0 lg:w-[164px] lg:flex-col lg:rounded-md lg:bg-[#FFF] lg:px-3 lg:pb-4 lg:pt-3 lg:shadow-card xl:w-[192px]">
      <span
        className={`rounded-md ${
          rank === 1 ? 'bg-brand' : 'bg-custom-gray-light'
        } mr-3 px-2 py-[3px] lg:mr-0`}
      >
        {rank}
      </span>

      <div className="flex grow gap-x-3 lg:flex-col lg:items-center lg:gap-y-3">
        <div>
          <NextLink href={`/profile/member/${person.customId}`}>
            <Avatar
              src={person.avatar}
              size="l"
              extra="shrink-0 lg:w-16 lg:h-16"
            />
          </NextLink>
        </div>

        <div className="flex flex-col gap-y-[2px] py-[3px] lg:items-center lg:gap-y-1 lg:py-0">
          <p className="subtitle-2 line-clamp-1 text-primary-700 hover-or-active:underline">
            <NextLink href={`/profile/member/${person.customId}`}>
              {person.name}
            </NextLink>
          </p>
          <p className="caption-1 text-primary-500">
            本週已精選
            <span className="text-primary-700"> {person.pickCount} </span>
            篇文章
          </p>
        </div>
      </div>

      {user.memberId !== String(person.id) && (
        <>
          <div className="shrink-0 lg:hidden">
            <Button
              size="sm"
              color="transparent"
              text="追蹤"
              activeState={{
                isActive: isFollowing,
                activeText: '追蹤中',
              }}
              onClick={handleClickFollow}
              gtmClassName="GTM-homepage_click_hot_user_follow"
            />
          </div>
          <div className="hidden lg:block lg:w-full">
            <Button
              size="md-large"
              color="transparent"
              text="追蹤"
              activeState={{
                isActive: isFollowing,
                activeText: '追蹤中',
              }}
              onClick={handleClickFollow}
              gtmClassName="GTM-homepage_click_hot_user_follow"
            />
          </div>
        </>
      )}
    </div>
  )
}
