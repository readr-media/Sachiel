'use client'

import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import Link from 'next/link'
import { useState } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import { getMemberUnlockStories } from '@/app/actions/subscribe-stories'
import { ImageCategory } from '@/constants/fallback-src'
import { displayTime } from '@/utils/story-display'

import { type SubscribeStories } from '../subscribe-stories/page'

export default function SubscribeStoriesList({
  initialList,
  pageSize,
  amountOfElements,
  memberId,
}: {
  initialList: SubscribeStories
  pageSize: number
  amountOfElements: number
  memberId: string
}) {
  const [hasMoreData, setHasMoreData] = useState(true)
  const fetchMoreSubscribeStories = async (pageIndex: number) => {
    if (!hasMoreData) return []

    const moreUnlockStories = await getMemberUnlockStories(
      memberId,
      pageSize,
      pageSize * (pageIndex - 1)
    )

    if (moreUnlockStories.length) {
      return moreUnlockStories
    } else {
      setHasMoreData(false)
      return []
    }
  }

  return (
    <InfiniteScrollList
      initialList={initialList}
      pageSize={pageSize}
      amountOfElements={amountOfElements}
      fetchListInPage={fetchMoreSubscribeStories}
      isAutoFetch={true}
    >
      {(renderList) => (
        <>
          <ul className="bg-white px-5 lg:hidden">
            {renderList.map((story) => (
              <li key={story?.id}>
                <Link href={`/story/${story?.id}`}>
                  <div className="flex flex-row justify-between gap-3 border-b py-4 sm:gap-9">
                    <div className="flex flex-col gap-2 sm:gap-1">
                      <p className="subtitle-1 sm:title-2">{story?.title}</p>
                      <p className="caption-1 text-primary-500">
                        {displayTime(story?.expireDate)}到期
                      </p>
                    </div>
                    <div className="w-24 shrink-0 sm:w-40">
                      <ImageWithFallback
                        src={story?.og_image ?? ''}
                        width={96}
                        height={48}
                        alt={`${story?.id}-image`}
                        style={{ objectFit: 'cover' }}
                        className="aspect-[2/1] overflow-hidden rounded sm:hidden"
                        fallbackCategory={ImageCategory.STORY}
                      />
                      <ImageWithFallback
                        src={story?.og_image ?? ''}
                        width={160}
                        height={80}
                        alt={`${story?.id}-image`}
                        style={{ objectFit: 'cover' }}
                        className="hidden aspect-[2/1] overflow-hidden rounded sm:block"
                        fallbackCategory={ImageCategory.STORY}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="hidden lg:grid lg:grid-cols-3 lg:gap-5 lg:p-10">
            {renderList.map((story) => (
              <li
                key={story?.id}
                className="flex flex-col rounded-md bg-white drop-shadow"
              >
                <Link href={`/story/${story?.id}`}>
                  <div className="relative h-[167px]">
                    <ImageWithFallback
                      src={story?.og_image ?? ''}
                      fill
                      alt={`${story?.id}-image`}
                      style={{ objectFit: 'cover' }}
                      className="rounded-t-md"
                      fallbackCategory={ImageCategory.STORY}
                    />
                  </div>
                  <div className="flex grow flex-col justify-between gap-2 px-5 pb-5 pt-4">
                    <p className="subtitle-1">{story?.title}</p>
                    <p className="caption-1 text-primary-500">
                      {displayTime(story?.expireDate)}到期
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </InfiniteScrollList>
  )
}
