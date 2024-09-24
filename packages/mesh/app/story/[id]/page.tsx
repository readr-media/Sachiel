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
import DesktopPageNavigator from './_components/desktop-page-navigator'
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
      <div className="hidden flex-1 lg:block"></div>
      <main className="flex max-w-[600px] justify-center sm:pb-10">
        <div>
          {/* backdrop-filter: blur(5px); background: linear-gradient(to right, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0.8) 3%, rgba(255, 255, 255, 0.8) 97%, rgb(255, 255, 255) 100%) */}
          <div className="sticky top-[68px] z-layout hidden h-16 bg-white backdrop-blur-sm [background:linear-gradient(to_right,_rgb(255,255,255)_0%,_rgba(255,255,255,0.8)_3%,_rgba(255,255,255,0.8)_97%,_rgb(255,255,255)_100%)]  sm:block">
            <DesktopPageNavigator story={storyData.story} />
          </div>
          <Article story={storyData.story} sourceCustomId={sourceCustomId} />
          <RelatedStories relatedStories={relatedStories} />
        </div>
      </main>
      <div className="hidden flex-1 lg:flex lg:justify-center">
        <aside className="lg:w-[220px] xl:w-[340px]">
          <SideIndex
            apiData={storyData.story?.apiData as ApiData}
            sourceCustomId={sourceCustomId}
            isInArticle={false}
          />
        </aside>
      </div>
    </>
  )
}
