import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { useState } from 'react'

import {
  getMoreMemberBookmarks,
  getMoreMemberCollections,
  getMoreMemberPicks,
} from '@/app/actions/get-more-profile-data'
import ArticleCard from '@/app/profile/_components/article-card'
import { type ProfileTabKey } from '@/hooks/use-profile-tab'
import type * as profile from '@/types/profile'
import type { PublisherProfile } from '@/utils/data-schema'
import { type PodcastJSONType } from '@/utils/data-schema'

import EmptyTabState from './empty-tab-state'

interface ArticleCardListProps {
  activeTab: ProfileTabKey
  items:
    | profile.PickList
    | profile.Bookmarks
    | profile.Collections
    | PublisherProfile['stories']
    | PodcastJSONType
  memberId?: string
  avatar?: string
  name?: string
  userType: profile.UserType
  customId?: string
}

const PAGINATION_CONFIG = {
  PAGE_SIZE: 40,
  MAX_ELEMENTS: 200,
} as const

export default function ArticleCardList({
  items,
  memberId,
  avatar,
  name,
  customId,
  activeTab,
  userType,
}: ArticleCardListProps) {
  const [hasMoreData, setHasMoreData] = useState(true)
  const shouldShowComment = activeTab === 'pick'
  const isCollection = activeTab === 'collection'

  if (!items?.length) {
    return <EmptyTabState tabKey={activeTab} userType={userType} />
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchMoreItemsInProfile = async (pageIndex: number): Promise<any[]> => {
    if (!customId) return []
    if (!hasMoreData) return []

    const fetchFunction = fetchFunctionOption(activeTab)
    const moreItems = await fetchFunction({
      customId: customId,
      takes: PAGINATION_CONFIG.PAGE_SIZE,
      start: PAGINATION_CONFIG.PAGE_SIZE * (pageIndex - 1),
    })

    if (moreItems.length) {
      return moreItems
    } else {
      setHasMoreData(false)
      return []
    }
  }
  return (
    <>
      {activeTab === 'pick' && (
        <p className="list-title bg-white px-5 pt-4 text-primary-700 md:bg-primary-700-dark md:p-10 md:px-[70px] md:pb-1 md:pt-9 lg:px-10">
          精選文章
        </p>
      )}
      <InfiniteScrollList
        key={activeTab}
        initialList={items as profile.PickList}
        pageSize={PAGINATION_CONFIG.PAGE_SIZE}
        amountOfElements={PAGINATION_CONFIG.MAX_ELEMENTS}
        fetchListInPage={fetchMoreItemsInProfile}
        isAutoFetch={true}
      >
        {(renderList) => {
          return (
            <div className="grow bg-multi-layer-light">
              <ul
                className={`max-w-[theme(width.maxMain)] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:p-10 md:px-[70px] md:pt-3 lg:h-full lg:grid-cols-3 lg:px-10 ${
                  isCollection
                    ? 'sm:grid sm:grid-cols-2 sm:items-center sm:gap-5 sm:p-5'
                    : ''
                }`}
              >
                {renderList.map((item, index) => {
                  const isLast = index === items.length - 1
                  if (!item) return null
                  if ('story' in item && !item.story) return null

                  if ('story' in item) {
                    return (
                      <li
                        key={
                          index +
                          (item.story?.id || 'id') +
                          (item.story?.title || 'story title') +
                          item.story?.createdAt
                        }
                        className="relative flex size-full grow bg-white md:h-full md:flex-col md:rounded-md md:drop-shadow"
                      >
                        <ArticleCard
                          storyData={
                            item.story as NonNullable<profile.PickListItem>
                          }
                          isLast={isLast}
                          memberId={memberId}
                          avatar={avatar}
                          name={name}
                          shouldShowComment={shouldShowComment}
                        />
                      </li>
                    )
                  }
                  return (
                    <li
                      key={
                        index +
                        (item as NonNullable<profile.BookmarkItem>).id +
                        (item as NonNullable<profile.BookmarkItem>).title +
                        (item as NonNullable<profile.BookmarkItem>).createdAt
                      }
                      className="relative flex size-full grow bg-white md:h-full md:flex-col md:rounded-md md:drop-shadow"
                    >
                      <ArticleCard
                        storyData={item as NonNullable<profile.BookmarkItem>}
                        isLast={isLast}
                        shouldShowComment={shouldShowComment}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }}
      </InfiniteScrollList>
    </>
  )
}

const fetchFunctionOption = (activeTab: ProfileTabKey) => {
  switch (activeTab) {
    case 'pick':
      return getMoreMemberPicks
    case 'bookmark':
      return getMoreMemberBookmarks
    case 'collection':
      return getMoreMemberCollections
    default:
      return getMoreMemberPicks
  }
}
