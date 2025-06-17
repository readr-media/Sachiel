'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

import { getMoreMemberFollowing } from '@/app/actions/get-profile'
import FollowListItem from '@/app/profile/_components/follow-list-item'
import Icon from '@/components/icon'
import { takeCount } from '@/constants/profile-following'
import useInViewDynamicRef from '@/hooks/use-in-view-dynamic-ref'

import {
  type FollowingListType,
  type FollowingPublisherListType,
} from '../page'

type FollowingListProps = {
  followingList: FollowingListType | FollowingPublisherListType
  title: string
  defaultToggle: boolean
  type: 'member' | 'publisher'
  followingCount: number
  publisherCustomId: string
}

const FollowingList = ({
  followingList = [],
  title,
  defaultToggle,
  type,
  followingCount,
  publisherCustomId,
}: FollowingListProps) => {
  const [list, setList] = useState<
    FollowingListType | FollowingPublisherListType
  >(followingList)
  const [resultShowing, toggleResultShowing] = useState(defaultToggle)
  const isLoadingRef = useRef(false)
  const listLengthRef = useRef(followingList.length)

  const { setTarget: triggerLoadmoreRef, isIntersecting: shouldStartLoadMore } =
    useInViewDynamicRef()
  const toggleResult = () => {
    toggleResultShowing((prev) => !prev)
  }
  const hasResult = !!followingList?.length
  const shouldLoadMore = list.length < followingCount

  const fetchNextPage = useCallback(async () => {
    if (type === 'member') {
      isLoadingRef.current = true
      const response = await getMoreMemberFollowing(
        publisherCustomId,
        takeCount,
        listLengthRef.current
      )
      if (!response?.member) return
      setList(
        (list) =>
          [...list, ...(response.member?.following ?? [])] as FollowingListType
      )
      listLengthRef.current =
        listLengthRef.current + (response.member?.following?.length ?? 0)
      isLoadingRef.current = false
    }
  }, [publisherCustomId, title])

  useEffect(() => {
    if (shouldStartLoadMore && shouldLoadMore && !isLoadingRef.current) {
      fetchNextPage()
    }
  }, [shouldStartLoadMore, fetchNextPage, shouldLoadMore])

  return (
    <div className="w-full rounded-xl bg-white px-5 pb-3 pt-4">
      <section
        className={`flex ${hasResult && 'cursor-pointer'} items-center`}
        onClick={toggleResult}
      >
        <p className="list-title w-full">
          {title}({followingCount})
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
          {list?.map((following, i) => {
            switch (following.__typename) {
              case 'Member':
                return (
                  <FollowListItem
                    key={following.id}
                    followerId={following.id}
                    followerAvatar={following.avatar || ''}
                    followerName={following.name || ''}
                    followerCustomId={following.customId || ''}
                    type={type}
                    ref={i === list.length - 1 ? triggerLoadmoreRef : undefined}
                  />
                )
              case 'Publisher':
                return (
                  <FollowListItem
                    key={following.id}
                    followerId={following.id}
                    followerAvatar={following.logo || ''}
                    followerName={following.title || ''}
                    followerCustomId={following.customId || ''}
                    type={type}
                  />
                )
              default:
                return null
            }
          })}
        </ul>
      )}
    </div>
  )
}

export default FollowingList
