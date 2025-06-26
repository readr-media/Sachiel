'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Drawer from '@/app/_components/drawer'
import Icon from '@/components/icon'
import type {
  GetCollectionsQuery,
  GetPublishersQuery,
  GetStoriesCommentCountsQuery,
} from '@/graphql/__generated__/graphql'
import type { AnswerResponse } from '@/types/miso'
import {
  convertMisoToCollection,
  convertMisoToMemberAndPublisher,
  convertMisoToStory,
} from '@/utils/miso-response-mapper'
import { displayTimeFromNow } from '@/utils/story-display'

import type { SearchResult, SearchType } from '../[query]/page'
import CollectionSearchResult from './collection-search-result'
import MemberAndPublisher from './member-and-publisher'
import ResultTotal from './result-total'
import { type filterType } from './search-result'
import StorySearchResult from './story-search-result'

type HybridSearchProps = {
  hybridSearchResults: Record<SearchType, SearchResult>
  misoAskResult: null | AnswerResponse
  query: string
  activeFilter: filterType['id']
  collectionsGQLData?: GetCollectionsQuery['collections']
  publisherGQLData?: GetPublishersQuery['publishers']
  storiesGQLData?: GetStoriesCommentCountsQuery['stories']
  currentSort: 'relevance' | 'published_at'
}

export const sortOptions = [
  { value: 'relevance', label: '相關度' },
  { value: 'published_at', label: '最新發布' },
] as const

export default function HybridSearch({
  hybridSearchResults,
  misoAskResult,
  query,
  activeFilter,
  collectionsGQLData,
  publisherGQLData,
  storiesGQLData,
  currentSort,
}: HybridSearchProps) {
  const router = useRouter()
  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const closeDrawer = () => setIsDrawerOpen(false)

  // 處理排序選擇
  const handleSortChange = (sortValue: 'relevance' | 'published_at') => {
    closeDrawer()
    // Update URL with new sort parameter
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.set('sort', sortValue)
    router.push(currentUrl.pathname + currentUrl.search)
  }

  const getCurrentSortLabel = () => {
    return (
      sortOptions.find((option) => option.value === currentSort)?.label ||
      '相關度'
    )
  }

  // need to pass tab filter
  if (hybridSearchResults[activeFilter].error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">搜尋發生錯誤</p>
          <p className="text-sm text-gray-500">
            {hybridSearchResults[activeFilter].error?.message}
          </p>
        </div>
      </div>
    )
  }

  // user and publisher profile search results
  if (activeFilter === 'member-publisher') {
    const { memberResult, publisherResult } = convertMisoToMemberAndPublisher(
      hybridSearchResults['member-publisher'].data,
      publisherGQLData
    )

    return (
      <div className="space-y-6 p-4 px-5 md:pt-5 xl:pl-10">
        <MemberAndPublisher
          query={query}
          memberResult={memberResult}
          publisherResult={publisherResult}
        />
      </div>
    )
  }

  // collection search results
  if (activeFilter === 'collection') {
    const { collectionResult } = convertMisoToCollection(
      hybridSearchResults['collection'].data,
      collectionsGQLData
    )

    return (
      <div className="space-y-6 p-4 px-5 md:pt-5 xl:pl-10">
        <ResultTotal
          query={query}
          resultCount={hybridSearchResults[activeFilter].data?.data.total || 0}
          currentSortLabel={getCurrentSortLabel()}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={() => {
            setIsDrawerOpen((prev) => !prev)
          }}
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />
        <CollectionSearchResult
          query={query}
          collectionResult={collectionResult}
        />
      </div>
    )
  }
  // story search results
  return (
    <div className="space-y-6 p-4 px-5 md:pt-5 xl:pl-10">
      {/* AI 答案區塊 */}
      {misoAskResult?.data.answer && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between sm:max-w-[600px] xl:max-w-screen-sm">
            <p className="list-title flex items-center text-primary-700">
              <Icon iconName="icon-mesh-ai" size="xl" />由 READr Mesh AI 生成
            </p>
            <span className="body-3 text-primary-500">瞭解更多</span>
          </div>

          {misoAskResult?.data.answer && (
            <div className="space-y-4">
              {/* 答案內容 */}
              <div className="prose prose-sm text-gray-800">
                <div
                  className="body-1 sm:max-w-[600px] xl:max-w-screen-sm"
                  dangerouslySetInnerHTML={{
                    __html: misoAskResult?.data.answer,
                  }}
                />
              </div>

              {/* 回答資料來源 */}
              {misoAskResult?.data.sources.length > 0 && (
                <div>
                  <h4 className="caption-1 mb-2 text-primary-500">
                    回答資料來源
                  </h4>
                  <div className="flex gap-2 overflow-x-auto">
                    {misoAskResult?.data.sources
                      //TODO: magic number
                      .slice(0, 3)
                      .map((source, index) => (
                        <a
                          key={source.product_id}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-[114px] w-[280px] min-w-[280px] flex-col gap-3 rounded-md border-primary-200 bg-primary-100 px-4 py-3"
                        >
                          <div className="flex min-w-0 flex-1 flex-col gap-y-2">
                            <p className="caption-1 flex size-5 flex-wrap items-center justify-center rounded-full bg-primary-200 text-primary-700">
                              {index + 1}
                            </p>
                            <p className="subtitle-2 line-clamp-2 text-primary-700">
                              {source.title}
                            </p>
                            <p className="caption-1 flex items-center text-primary-500">
                              {source.custom_attributes?.['og:site_name'] ??
                                '資料來源'}
                              <span className="mx-1 inline-block size-[2px] rounded-full bg-primary-500 text-center"></span>
                              <span>
                                {displayTimeFromNow(source.published_at ?? '')}
                              </span>
                            </p>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 搜尋結果統計 */}
      <div className="flex flex-col sm:gap-y-[9.5px] xl:max-w-[720px]">
        <ResultTotal
          query={query}
          resultCount={hybridSearchResults[activeFilter].data?.data.total || 0}
          currentSortLabel={getCurrentSortLabel()}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={() => {
            setIsDrawerOpen((prev) => !prev)
          }}
          sortOptions={sortOptions}
          handleSortChange={handleSortChange}
        />

        {/* 搜尋結果列表 */}
        <StorySearchResult
          query={query}
          initialStories={convertMisoToStory(
            hybridSearchResults['story'].data,
            storiesGQLData
          )}
          totalCount={hybridSearchResults['story'].data?.data.total || 0}
          currentSort={currentSort}
          storiesGQLData={storiesGQLData}
        />
      </div>
      <Drawer
        className="sm:hidden"
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        position={'bottom'}
        size={'fit'}
      >
        <div className="flex flex-col gap-y-6 px-5 py-4">
          <span className="button text-primary-500">排序依</span>
          <ul className="flex flex-col gap-4">
            {sortOptions.map(({ value, label }) => (
              <li
                key={value}
                className="cursor-pointer"
                onClick={() => handleSortChange(value)}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </div>
  )
}
