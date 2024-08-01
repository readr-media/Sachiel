import './_style/article.css'

import { notFound } from 'next/navigation'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { GetStoryDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import fetchRestful, { RestfulMethod } from '@/utils/fetch-restful'
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

  const storyData = await fetchGraphQL(
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
      (await fetchRestful(
        {
          url: RESTFUL_ENDPOINTS.relatedStories + storyData.story?.title,
          method: RestfulMethod.Get,
        },
        { traceObject: globalLogFields }
      )) ?? []
  }

  const sourceCustomId = storyData.story?.source?.customId ?? ''

  return (
    <>
      {/* a dummy div to make main tag horizontally aligned */}
      <div className="hidden lg:block lg:w-[260px]" />
      <main className="flex max-w-[600px] justify-center sm:pb-10">
        <div>
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
