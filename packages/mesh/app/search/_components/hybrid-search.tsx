'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Icon from '@/components/icon'
import {
  type SearchResultType,
  type SearchType,
  getSortLabel,
  MISO_SEARCH_SORT_OPTIONS,
  MISO_SEARCH_UI,
} from '@/constants/miso'
import type {
  GetCollectionsQuery,
  GetPublishersQuery,
  GetStoriesCommentCountsQuery,
} from '@/graphql/__generated__/graphql'
import useAiAnswer from '@/hooks/use-ai-answer'
import {
  convertMisoToCollection,
  convertMisoToMemberAndPublisher,
  convertMisoToStory,
} from '@/utils/miso-response-mapper'
import { displayTimeFromNow } from '@/utils/story-display'

import CollectionSearchResult from './collection-search-result'
import MemberAndPublisher from './member-and-publisher'
import ResultTotal from './result-total'
import { type filterType } from './search-result'
import SortDrawer from './sort-drawer'
import StorySearchResult from './story-search-result'

type HybridSearchProps = {
  hybridSearchResults: Record<SearchType, SearchResultType>
  questionId: string
  query: string
  activeFilter: filterType['id']
  collectionsGQLData?: GetCollectionsQuery['collections']
  publisherGQLData?: GetPublishersQuery['publishers']
  storiesGQLData?: GetStoriesCommentCountsQuery['stories']
  currentStorySort: 'relevance' | 'published_at'
  currentCollectionSort: 'relevance' | 'published_at'
}

export default function HybridSearch({
  hybridSearchResults,
  questionId,
  query,
  activeFilter,
  collectionsGQLData,
  publisherGQLData,
  storiesGQLData,
  currentStorySort,
  currentCollectionSort,
}: HybridSearchProps) {
  const router = useRouter()

  // AI answer is loaded asynchronously
  const { data: misoAskResult, loading: aiLoading } = useAiAnswer(questionId)

  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const closeDrawer = () => setIsDrawerOpen(false)

  // Loading States
  const [isCollectionLoading, setIsCollectionLoading] = useState(false)
  const [isStoryLoading, setIsStoryLoading] = useState(false)

  // Reset loading states when search results change
  useEffect(() => {
    setIsCollectionLoading(false)
    setIsStoryLoading(false)
  }, [hybridSearchResults])

  // Shared function to update sort parameters
  const updateSortParams = (
    sortType: 'story_sort' | 'collection_sort',
    sortValue: 'relevance' | 'published_at'
  ) => {
    const currentUrl = new URL(window.location.href)
    // Remove old generic sort parameter
    currentUrl.searchParams.delete('sort')

    // Set the specified sort parameter
    currentUrl.searchParams.set(sortType, sortValue)

    // Ensure both sort parameters exist
    if (
      sortType === 'story_sort' &&
      !currentUrl.searchParams.has('collection_sort')
    ) {
      currentUrl.searchParams.set('collection_sort', currentCollectionSort)
    } else if (
      sortType === 'collection_sort' &&
      !currentUrl.searchParams.has('story_sort')
    ) {
      currentUrl.searchParams.set('story_sort', currentStorySort)
    }

    router.push(currentUrl.pathname + currentUrl.search, { scroll: false })
  }

  // Handle story sort selection
  const handleStorySortChange = (sortValue: 'relevance' | 'published_at') => {
    closeDrawer()
    setIsStoryLoading(true)
    updateSortParams('story_sort', sortValue)
  }

  // Handle collection sort selection
  const handleCollectionSortChange = (
    sortValue: 'relevance' | 'published_at'
  ) => {
    closeDrawer()
    setIsCollectionLoading(true)
    updateSortParams('collection_sort', sortValue)
  }

  const getCurrentStorySortLabel = () => {
    return getSortLabel(currentStorySort)
  }

  const getCurrentCollectionSortLabel = () => {
    return getSortLabel(currentCollectionSort)
  }

  // Need to pass tab filter
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

  // User and publisher profile search results
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

  // Collection search results
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
          currentSortLabel={getCurrentCollectionSortLabel()}
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={() => {
            setIsDrawerOpen((prev) => !prev)
          }}
          sortOptions={MISO_SEARCH_SORT_OPTIONS}
          handleSortChange={handleCollectionSortChange}
        />
        <CollectionSearchResult
          query={query}
          initialCollections={collectionResult}
          totalCount={hybridSearchResults['collection'].data?.data.total || 0}
          currentSort={currentCollectionSort}
          collectionsGQLData={collectionsGQLData}
          isLoading={isCollectionLoading}
        />
        <SortDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          onSortChange={handleCollectionSortChange}
        />
      </div>
    )
  }
  // Story search results
  return (
    <div className="space-y-6 p-4 px-5 md:pt-5 xl:pl-10">
      {/* AI answer section */}
      {(aiLoading || misoAskResult?.data.answer) && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between sm:max-w-[600px] xl:max-w-screen-sm">
            <p className="list-title flex items-center text-primary-700">
              <Icon iconName="icon-mesh-ai" size="xl" />由 READr Mesh AI 生成
            </p>
            <span className="body-3 text-primary-500">瞭解更多</span>
          </div>

          {aiLoading && !misoAskResult && (
            <div className="space-y-4">
              {/* AI answer loading skeleton */}
              <div className="animate-pulse">
                <div className="h-4 w-full rounded bg-loading" />
                <div className="mt-2 h-4 w-3/4 rounded bg-loading" />
                <div className="mt-2 h-4 w-1/2 rounded bg-loading" />
              </div>
            </div>
          )}

          {misoAskResult?.data.answer && (
            <div className="space-y-4">
              {/* Answer content */}
              <div className="prose prose-sm text-gray-800">
                <div
                  className="body-1 sm:max-w-[600px] xl:max-w-screen-sm"
                  dangerouslySetInnerHTML={{
                    __html: misoAskResult?.data.answer,
                  }}
                />
              </div>

              {/* Answer sources */}
              {misoAskResult?.data.sources.length > 0 && (
                <div>
                  <h4 className="caption-1 mb-2 text-primary-500">
                    回答資料來源
                  </h4>
                  <div className="flex gap-2 overflow-x-auto">
                    {misoAskResult?.data.sources
                      .slice(0, MISO_SEARCH_UI.MAX_SOURCES_DISPLAY)
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

      {/* Search result statistics */}
      <div className="flex flex-col sm:gap-y-[9.5px] xl:max-w-[720px]">
        <div className="sm:max-w-[640px]">
          <ResultTotal
            query={query}
            resultCount={
              hybridSearchResults[activeFilter].data?.data.total || 0
            }
            currentSortLabel={getCurrentStorySortLabel()}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={() => {
              setIsDrawerOpen((prev) => !prev)
            }}
            sortOptions={MISO_SEARCH_SORT_OPTIONS}
            handleSortChange={handleStorySortChange}
          />
        </div>

        {/* Search result list */}
        <StorySearchResult
          query={query}
          initialStories={convertMisoToStory(
            hybridSearchResults['story'].data,
            storiesGQLData
          )}
          totalCount={hybridSearchResults['story'].data?.data.total || 0}
          currentSort={currentStorySort}
          storiesGQLData={storiesGQLData}
          isLoading={isStoryLoading}
        />
      </div>
      <SortDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onSortChange={handleStorySortChange}
      />
    </div>
  )
}
