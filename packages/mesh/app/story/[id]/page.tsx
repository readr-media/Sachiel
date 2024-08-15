import './_style/article.css'

import { notFound } from 'next/navigation'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { GetStoryDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulGet } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import { type ApiData } from './_components/api-data-renderer/renderer'
import SideIndex from './_components/api-data-renderer/side-index'
import Article from './_components/article'
import PageNavigator from './_components/page-navigator'
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

  let relatedStories: RelatedStory[] = []
  if (storyData.story?.title) {
    relatedStories =
      (await fetchRestfulGet<RelatedStory[]>(
        RESTFUL_ENDPOINTS.relatedStories + storyData.story?.title
      )) ?? []
  }

  const sourceCustomId = storyData.story?.source?.customId ?? ''

  return (
    <>
      {/* a dummy div to make main tag horizontally aligned */}
      <div className="hidden lg:block lg:w-[260px]" />
      <main className="flex max-w-[600px] justify-center sm:pb-10">
        <div>
          {/* backdrop-filter: blur(5px); background: linear-gradient(to right, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.8) 3%, rgba(255, 255, 255, 0.8) 97%, rgb(255, 255, 255) 100%) */}
          <div className="sticky top-[68px] z-header hidden h-16 bg-white backdrop-blur-sm [background:linear-gradient(to_right,_rgb(255,255,255)_0%,_rgba(255,255,255,0.8)_3%,_rgba(255,255,255,0.8)_97%,_rgb(255,255,255)_100%)]  sm:block">
            <PageNavigator story={storyData.story} />
          </div>
          <Article story={storyData.story} sourceCustomId={sourceCustomId} />
          <div className="lg:hidden">
            <RelatedStories relatedStories={relatedStories} />
          </div>
        </div>
      </main>
      <aside className="hidden pt-16 lg:block lg:w-[260px]">
        <RelatedStories relatedStories={relatedStories} />
        <SideIndex
          apiData={storyData.story?.apiData as ApiData}
          sourceCustomId={sourceCustomId}
          isInArticle={false}
        />
      </aside>
    </>
  )
}
