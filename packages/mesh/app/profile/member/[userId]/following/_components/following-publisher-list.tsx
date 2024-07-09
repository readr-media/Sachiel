'use client'
import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'

import { type FollowingPublisherListType } from '../page'
type FollowingPublisherListProps = {
  followingList: FollowingPublisherListType
}
const FollowingPublisherList = ({
  followingList = [],
}: FollowingPublisherListProps) => {
  const [resultShowing, toggleResultShowing] = useState(false)
  const toggleResult = () => {
    toggleResultShowing((prev) => !prev)
  }
  return (
    <div className="px-5 pb-3 pt-4">
      <section
        className="flex cursor-pointer items-center"
        onClick={toggleResult}
      >
        <p className="w-full">媒體({followingList?.length})</p>
        {resultShowing ? (
          <Icon iconName="icon-up-arrow" size={{ height: 32, width: 32 }} />
        ) : (
          <Icon iconName="icon-down-arrow" size={{ height: 32, width: 32 }} />
        )}
      </section>
      {resultShowing && (
        <ul>
          {followingList?.map((following) => {
            return (
              <li
                key={following.id}
                className="flex items-center justify-between pb-5 pt-[12.5px] first-of-type:pt-[24.5px]"
              >
                <span className="flex items-center">
                  <Image
                    className=" mr-2 aspect-square rounded-full"
                    src={following.logo || '/images/default-avatar-image.png'}
                    alt={`${following.title}'s avatar`}
                    width={44}
                    height={44}
                  />
                  <div className="flex flex-col">
                    <p className="subtitle-1">{following.title}</p>
                    <p className="body-3 text-primary-500">
                      {following.customId}
                    </p>
                  </div>
                </span>
                <Button
                  color="white"
                  onClick={() => {}}
                  size="sm"
                  text="追蹤"
                  activeState={{
                    isActive: true,
                    activeText: '追蹤中',
                  }}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default FollowingPublisherList
