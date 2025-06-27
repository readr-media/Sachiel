import { type SearchResultType } from '@/constants/miso'
import type {
  GetCollectionsQuery,
  GetPublishersQuery,
  GetStoriesCommentCountsQuery,
} from '@/graphql/__generated__/graphql'

import type { SearchResults } from './data-schema'
import { extractIdFromProductId, isValidProductId } from './miso-id-parser'

const convertMisoToMemberAndPublisher = (
  misoData: SearchResultType['data'],
  publisherGQLData?: GetPublishersQuery['publishers']
): {
  memberResult: SearchResults['member']
  publisherResult: SearchResults['publisher']
} => {
  if (!misoData?.data?.products) {
    return { memberResult: [], publisherResult: [] }
  }

  // Create lookup map for publisher GraphQL data
  const publisherGQLMap = new Map()
  if (publisherGQLData) {
    publisherGQLData.forEach((publisher) => {
      if (publisher?.customId) {
        publisherGQLMap.set(publisher.customId, publisher)
      }
    })
  }

  const memberResult: SearchResults['member'] = []
  const publisherResult: SearchResults['publisher'] = []

  misoData.data.products.forEach((product) => {
    const productId = product.product_id

    if (isValidProductId(productId, 'MEMBER')) {
      const memberId = extractIdFromProductId(productId, 'MEMBER')
      if (memberId) {
        // 這是會員資料
        memberResult.push({
          id:
            //TODO: simplify logic
            product.custom_attributes?.['og:url']?.split('/').at(-1) ||
            memberId,
          //TODO: need to get
          customId: memberId,
          name: product.title,
          nickname: product.title,
          avatar: product.cover_image || '',
          is_active: true,
        })
      }
    } else if (isValidProductId(productId, 'PUBLISHER')) {
      const publisherId = extractIdFromProductId(productId, 'PUBLISHER')
      if (publisherId) {
        const gqlData = publisherGQLMap.get(publisherId)

        // 這是publisher資料，只使用 GraphQL 的 followerCount
        publisherResult.push({
          id: publisherId,
          title: product.title,
          customId: publisherId,
          logo: product.cover_image || '',
          followerCount: gqlData?.followerCount || 0,
        })
      }
    }
  })

  return { memberResult, publisherResult }
}

// 轉換 Miso API 回應為 CollectionSearchResult 組件期望的格式
const convertMisoToCollection = (
  misoData: SearchResultType['data'],
  collectionsGQLData?: GetCollectionsQuery['collections']
): { collectionResult: SearchResults['collection'] } => {
  if (!misoData?.data?.products) {
    return { collectionResult: [] }
  }

  // Create lookup map for GraphQL data
  const gqlDataMap = new Map()
  if (collectionsGQLData) {
    collectionsGQLData.forEach((collection) => {
      if (collection?.id) {
        gqlDataMap.set(collection.id, collection)
      }
    })
  }

  const collectionResult: SearchResults['collection'] = []

  misoData.data.products.forEach((product) => {
    const productId = product.product_id

    if (isValidProductId(productId, 'COLLECTION')) {
      const collectionId = extractIdFromProductId(productId, 'COLLECTION')
      if (collectionId) {
        const gqlData = gqlDataMap.get(collectionId)

        // 這是集錦資料，使用 GraphQL 資料增強
        collectionResult.push({
          id: collectionId,
          title: product.title.replace('集錦 | ', ''),
          status: gqlData?.status || 'published',
          creator: {
            id: gqlData?.creator?.id || collectionId,
            name:
              gqlData?.creator?.nickname ||
              product.title.replace('集錦 | ', ''),
            customId: gqlData?.creator?.customId || collectionId,
            nickname:
              gqlData?.creator?.nickname ||
              product.custom_attributes?.['og:site_name'] ||
              'Unknown Creator',
          },
          heroImage: {
            resized: {
              original: product.cover_image || '',
            },
            urlOriginal: product.cover_image || '',
          },
          readsCount: gqlData?.picksCount || 0,
        })
      }
    }
  })

  return { collectionResult }
}

// 轉換 Miso API 回應為 StorySearchResult 組件期望的格式
const convertMisoToStory = (
  misoData: SearchResultType['data'],
  storiesGQLData?: GetStoriesCommentCountsQuery['stories']
): SearchResults['story'] => {
  if (!misoData?.data?.products) {
    return []
  }

  // Create lookup map for GraphQL data
  const storiesGQLMap = new Map()
  if (storiesGQLData) {
    storiesGQLData.forEach((story) => {
      if (story?.id) {
        storiesGQLMap.set(story.id, story)
      }
    })
  }

  const storyResult: SearchResults['story'] = []

  misoData.data.products.forEach((product) => {
    const productId = product.product_id

    if (isValidProductId(productId, 'STORY')) {
      const storyId = extractIdFromProductId(productId, 'STORY')
      if (storyId) {
        const gqlData = storiesGQLMap.get(storyId)

        // 從 product_id 推斷來源資訊
        // 目前只取mesh
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
          id: storyId,
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
          commentsCount: gqlData?.commentsCount || 0,
          source: getSourceFromProductId(productId),
        })
      }
    }
  })

  return storyResult
}

export {
  convertMisoToCollection,
  convertMisoToMemberAndPublisher,
  convertMisoToStory,
}
