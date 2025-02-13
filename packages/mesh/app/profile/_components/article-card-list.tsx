import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import type { MutableRefObject } from 'react'
import { useEffect } from 'react'

import {
  getMoreMemberBookmarks,
  getMoreMemberCollections,
  getMoreMemberPicks,
} from '@/app/actions/get-more-profile-data'
import ArticleCard from '@/app/profile/_components/article-card'
import * as profile from '@/types/profile'
import type { PublisherProfile } from '@/utils/data-schema'

interface ArticleCardListProps {
  tabCategory?: profile.TabCategoryType
  items:
    | profile.PickList
    | profile.Bookmarks
    | profile.Collections
    | PublisherProfile['stories']
  emptyMessage: string
  elementForEmpty?: React.ReactNode
  memberId?: string
  avatar?: string
  name?: string
  shouldShowComment: boolean
  customId?: string
  hasMoreData?: MutableRefObject<{
    PICKS: boolean
    BOOKMARKS: boolean
    COLLECTIONS: boolean
  }>
}

const FETCH_FUNCTIONS = {
  [profile.TabCategory.PICKS]: getMoreMemberPicks,
  [profile.TabCategory.BOOKMARKS]: getMoreMemberBookmarks,
  [profile.TabCategory.COLLECTIONS]: getMoreMemberCollections,
} as const

const PAGINATION_CONFIG = {
  PAGE_SIZE: 40,
  MAX_ELEMENTS: 200,
} as const

function ArticleCardList({
  items,
  shouldShowComment,
  emptyMessage,
  elementForEmpty,
  memberId,
  avatar,
  name,
  customId,
  tabCategory,
  hasMoreData,
}: ArticleCardListProps) {
  const updateHasMoreData = (hasMore: boolean) => {
    if (!hasMoreData) return
    if (!tabCategory) return
    // TODO: publisher do not have infinite scroll
    if (tabCategory === profile.TabCategory.PUBLISH) return
    hasMoreData.current[tabCategory] = hasMore
  }
  useEffect(() => {
    updateHasMoreData(true)
  }, [tabCategory, items])

  if (!items?.length) {
    return (
      <div className="flex grow flex-col">
        <section className="flex h-full max-w-[theme(width.maxMain)] grow flex-col items-center justify-center whitespace-pre bg-primary-700-dark text-center text-base text-primary-400 sm:min-h-full">
          <p className="mb-4 w-full">{emptyMessage}</p>
          {elementForEmpty}
        </section>
      </div>
    )
  }

  const isCollection = items.some((item) => item.__typename === 'Collection')

  const fetchMorePicksInProfile = async (pageIndex: number) => {
    if (!hasMoreData) return []
    if (!tabCategory) return []
    // TODO: publisher do not have infinite scroll
    if (tabCategory === profile.TabCategory.PUBLISH) return []
    if (!hasMoreData.current[tabCategory]) return []

    const fetchFunction =
      FETCH_FUNCTIONS[tabCategory as keyof typeof FETCH_FUNCTIONS] ??
      FETCH_FUNCTIONS[profile.TabCategory.PICKS]

    const moreItems = await fetchFunction({
      customId: customId ?? '',
      takes: PAGINATION_CONFIG.PAGE_SIZE * pageIndex,
      start: PAGINATION_CONFIG.PAGE_SIZE * (pageIndex - 1),
    })

    updateHasMoreData(moreItems.length === PAGINATION_CONFIG.PAGE_SIZE)
    return moreItems
  }
  return (
    <>
      {tabCategory === profile.TabCategory.PICKS && (
        <p className="list-title bg-white px-5 pt-4 text-primary-700 md:bg-primary-700-dark md:p-10 md:px-[70px] md:pb-1 md:pt-9 lg:px-10">
          精選文章
        </p>
      )}
      <InfiniteScrollList
        key={tabCategory}
        initialList={items as profile.PickList}
        pageSize={PAGINATION_CONFIG.PAGE_SIZE}
        amountOfElements={PAGINATION_CONFIG.MAX_ELEMENTS}
        fetchListInPage={fetchMorePicksInProfile}
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

export default ArticleCardList
