'use client'
import Image from 'next/image'
import { useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'

import { type FollowingListType } from '../page'
type FollowingPublisherListProps = {
  followingList: FollowingListType
  title: string
  defaultToggle: boolean
}
const FollowingPublisherList = ({
  followingList = [],
  title = '媒體',
  defaultToggle,
}: FollowingPublisherListProps) => {
  // TODO: default toggle set to props
  const [resultShowing, toggleResultShowing] = useState(defaultToggle)
  const toggleResult = () => {
    toggleResultShowing((prev) => !prev)
  }
  const hasResult = !!followingList?.length
  return (
    <div className="w-full bg-white px-5 pb-3 pt-4">
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
              <li
                key={following.id}
                className="flex items-center justify-between pb-5 pt-[12.5px] first-of-type:pt-[24.5px]"
              >
                <span className="flex items-center">
                  <Image
                    className=" mr-2 aspect-square rounded-full"
                    src={
                      following?.avatar || '/images/default-avatar-image.png'
                    }
                    alt={`${following.name}'s avatar`}
                    width={44}
                    height={44}
                  />
                  <div className="flex flex-col">
                    <p className="subtitle-1">{following.name}</p>
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
