import './_style/article.css'

import { notFound } from 'next/navigation'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  GetStoriesDocument,
  GetStoryDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulGet } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import { type ApiData } from './_components/api-data-renderer/renderer'
import SideIndex from './_components/api-data-renderer/side-index'
import Article from './_components/article'
import RelatedStories from './_components/related-stories'

export type RelatedStory = {
  title: string
  summary: string
  content: string
  source: string
  id: number
  og_image: string
  type: string
  lastUpdated: string
}

const picksTake = 5
const commentsTake = 3
export default async function page({ params }: { params: { id: string } }) {
  const storyId = params.id
  const globalLogFields = getLogTraceObjectFromHeaders()

  const storyData = await queryGraphQL(
    GetStoryDocument,
    { storyId, picksTake, commentsTake },
    globalLogFields
  )

  if (!storyData) {
    notFound()
  }

  const relatedRawStories =
    (
      await fetchRestfulGet<RelatedStory[]>(
        RESTFUL_ENDPOINTS.relatedStories + storyData.story?.title
      )
    )?.slice(0, 4) ?? []

  // TODO: use new api to get story pick list according to user.followingIds
  const relatedStories =
    (
      await queryGraphQL(
        GetStoriesDocument,
        {
          storyIds: relatedRawStories.map((story) => String(story.id)),
          picksTake,
          commentsTake,
        },
        globalLogFields
      )
    )?.stories ?? []

  const sourceCustomId = storyData.story?.source?.customId ?? ''

  return (
    <>
      <Article story={storyData.story} sourceCustomId={sourceCustomId} />
      <RelatedStories relatedStories={relatedStories} />
      <aside className="hidden lg:fixed lg:right-[calc(((100vw-theme(width.articleMain))/2-theme(width.articleAside.lg))/2)] lg:top-[theme(height.header.sm)] lg:flex lg:w-[theme(width.articleAside.lg)] xl:right-[calc((100vw-1440px)/2+((1440px-theme(width.articleMain))/2-theme(width.articleAside.xl))/2)] xl:w-[theme(width.articleAside.xl)]">
        <SideIndex
          apiData={storyData.story?.apiData as ApiData}
          sourceCustomId={sourceCustomId}
          isInArticle={false}
        />
      </aside>
    </>
  )
}
