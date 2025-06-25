'use client'
import { useState } from 'react'

import Drawer from '@/app/_components/drawer'
import Icon from '@/components/icon'
import type { AnswerResponse } from '@/types/miso'
import type { SearchResults } from '@/utils/data-schema'
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
}

const sortOptions = [
  { value: 'relevance', label: '相關度' },
  { value: 'published_at', label: '最新發布' },
]

export default function HybridSearch({
  hybridSearchResults,
  misoAskResult,
  query,
  activeFilter,
}: HybridSearchProps) {
  // 排序下拉選單狀態
  const [selectedSort, setSelectedSort] = useState<
    'relevance' | 'published_at'
  >('published_at')
  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const closeDrawer = () => setIsDrawerOpen(false)
  // 處理排序選擇
  const handleSortChange = (sortValue: 'relevance' | 'published_at') => {
    setSelectedSort(sortValue)
    closeDrawer()
    // TODO: 重新執行搜尋with新的排序參數
  }

  const getCurrentSortLabel = () => {
    return (
      sortOptions.find((option) => option.value === selectedSort)?.label ||
      '相關度'
    )
  }

  const convertMisoToMemberAndPublisher = (
    misoData: SearchResult['data']
  ): {
    memberResult: SearchResults['member']
    publisherResult: SearchResults['publisher']
  } => {
    if (!misoData?.data?.products) {
      return { memberResult: [], publisherResult: [] }
    }

    const memberResult: SearchResults['member'] = []
    const publisherResult: SearchResults['publisher'] = []

    misoData.data.products.forEach((product) => {
      const productId = product.product_id

      if (productId.startsWith('mesh_profile_member_')) {
        // 這是會員資料
        memberResult.push({
          id:
            //TODO: simplify logic
            product.custom_attributes?.['og:url']?.split('/').at(-1) ||
            productId.replace('mesh_profile_member_', ''),
          //TODO: need to get
          customId: productId.replace('mesh_profile_member_', ''),
          name: product.title,
          nickname: product.title,
          avatar: product.cover_image || '',
          is_active: true,
        })
      } else if (productId.startsWith('mesh_publisher_')) {
        // 這是發布者資料
        publisherResult.push({
          id: productId.replace('mesh_publisher_', ''),
          title: product.title,
          customId: productId.replace('mesh_publisher_', ''),
          logo: product.cover_image || '',
          //TODO:  need to get
          followerCount: parseInt('0'),
        })
      }
    })

    return { memberResult, publisherResult }
  }

  // 轉換 Miso API 回應為 CollectionSearchResult 組件期望的格式
  const convertMisoToCollection = (
    misoData: SearchResult['data']
  ): { collectionResult: SearchResults['collection'] } => {
    if (!misoData?.data?.products) {
      return { collectionResult: [] }
    }

    const collectionResult: SearchResults['collection'] = []

    misoData.data.products.forEach((product) => {
      const productId = product.product_id

      if (productId.startsWith('mesh_profile_collection_')) {
        // 這是集錦資料
        collectionResult.push({
          id: productId.replace('mesh_profile_collection_', ''),
          title: product.title.replace('集錦 | ', ''),
          status: 'published', // 假設發布狀態
          // TODO: need api to get the real data
          creator: {
            id: product.product_id.replace('mesh_profile_collection_', ''),
            name: product.title.replace('集錦 | ', ''),
            customId: productId.replace('mesh_profile_collection_', ''),
            nickname:
              product.custom_attributes?.['og:site_name'] || 'Unknown Creator',
          },
          heroImage: {
            resized: {
              original: product.cover_image || '',
            },
            urlOriginal: product.cover_image || '',
          },
          readsCount: parseInt('0'),
        })
      }
    })

    return { collectionResult }
  }

  // 轉換 Miso API 回應為 StorySearchResult 組件期望的格式
  const convertMisoToStory = (
    misoData: SearchResult['data']
  ): SearchResults['story'] => {
    if (!misoData?.data?.products) {
      return []
    }

    const storyResult: SearchResults['story'] = []

    misoData.data.products.forEach((product) => {
      const productId = product.product_id

      if (productId.startsWith('mirrordaily_')) {
        // 從 product_id 推斷來源資訊
        const getSourceFromProductId = (id: string) => {
          const splitResult = id.split('_').at(0)
          switch (splitResult) {
            case 'mirrormedia':
              return {
                id: 'mirrormedia',
                customId: 'mirrormedia',
                title: '鏡週刊 Mirror Media',
                is_active: true,
              }
            case 'mnews':
              return {
                id: 'mnews',
                customId: 'mnews',
                title: '鏡新聞',
                is_active: true,
              }
            case 'mirrordaily':
              return {
                id: 'mirrordaily',
                customId: 'mirrordaily',
                title: '鏡報',
                is_active: true,
              }
            default:
              return {
                id: 'readr',
                customId: 'readr',
                title: 'READr Mesh 讀選',
                is_active: true,
              }
          }
        }

        storyResult.push({
          id: productId.replace('mirrordaily_', ''),
          title: product._title_with_markups || product.title,
          og_image: product.cover_image || '',
          og_description: product.custom_attributes?.['og:description'] || '',
          published_date: product.published_at || '',
          full_screen_ad:
            (product.custom_attributes?.['full_screen_ad'] as
              | 'mobile'
              | 'desktop'
              | 'all'
              | 'none') || 'none',
          isMember: Boolean(product.custom_attributes?.['member_only']),
          source: getSourceFromProductId(productId),
        })
      }
    })

    return storyResult
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

  if (!hybridSearchResults[activeFilter].data?.data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">找不到的相關結果</p>
        </div>
      </div>
    )
  }

  // user and publisher profile search results
  if (activeFilter === 'member-publisher') {
    const { memberResult, publisherResult } = convertMisoToMemberAndPublisher(
      hybridSearchResults['member-publisher'].data
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
      hybridSearchResults['collection'].data
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
      {/* 這個要抽成component會在collection重復使用 */}
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
        />

        {/* 搜尋結果列表 */}
        <StorySearchResult
          query={query}
          storyResult={convertMisoToStory(hybridSearchResults['story'].data)}
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
            <li
              className="button-large text-primary-700"
              onClick={() => handleSortChange('relevance')}
            >
              相關度
            </li>
            <li
              className="button-large text-primary-700"
              onClick={() => handleSortChange('published_at')}
            >
              最新發布
            </li>
          </ul>
        </div>
      </Drawer>
    </div>
  )
}
