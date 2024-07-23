'use client'
import { useState } from 'react'

import FollowListItem from '@/app/profile/_components/follow-list-item'
import Icon from '@/components/icon'

import { type FollowingListType } from '../page'
type FollowingListProps = {
  followingList: FollowingListType
  title: string
  defaultToggle: boolean
}
const FollowingList = ({
  followingList = [],
  title = '媒體',
  defaultToggle,
}: FollowingListProps) => {
  // TODO: default toggle set to props
  const [resultShowing, toggleResultShowing] = useState(defaultToggle)
  const toggleResult = () => {
    toggleResultShowing((prev) => !prev)
  }
  const hasResult = !!followingList?.length
  return (
    <div className="w-full rounded-xl bg-white px-5 pb-3 pt-4">
      <section
        className={`flex ${hasResult && 'cursor-pointer'} items-center`}
        onClick={toggleResult}
      >
        <p className="list-title w-full">
          {title}({followingList?.length})
        </p>
        {resultShowing ? (
          <span className={`${hasResult ? 'block' : 'opacity-0'}`}>
            <Icon iconName="icon-up-arrow" size={{ height: 32, width: 32 }} />
          </span>
        ) : (
          <span className={`${hasResult ? 'block' : 'opacity-0'}`}>
            <Icon iconName="icon-down-arrow" size={{ height: 32, width: 32 }} />
          </span>
        )}
      </section>
      {resultShowing && (
        <ul className="lg:grid lg:grid-cols-2 lg:gap-x-5">
          {followingList?.map((following) => {
            return (
              <FollowListItem
                key={following.id}
                followerId={following.id}
                followerAvatar={following.avatar || ''}
                followerName={following.name || ''}
                followerCustomId={following.customId || ''}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default FollowingList
