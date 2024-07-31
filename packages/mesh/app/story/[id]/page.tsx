import './_style/article.css'

import { notFound } from 'next/navigation'

import { GetStoryDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import { type ApiData } from './_components/api-data-renderer/renderer'
import SideIndex from './_components/api-data-renderer/side-index'
import Article from './_components/article'

const picksTake = 5
const commentsTake = 3
export default async function page({ params }: { params: { id: string } }) {
  const storyId = params.id
  const globalLogFields = getLogTraceObjectFromHeaders()

  const data = await fetchGraphQL(
    GetStoryDocument,
    { storyId, picksTake, commentsTake },
    globalLogFields
  )

  if (!data) {
    notFound()
  }

  const sourceCustomId = data.story?.source?.customId ?? ''

  return (
    <>
      {/* a dummy div to make main tag horizontally aligned */}
      <div className="hidden lg:block lg:w-[260px]" />
      <main className="flex max-w-[600px] justify-center">
        <Article story={data.story} sourceCustomId={sourceCustomId} />
      </main>
      <aside className="hidden lg:block lg:w-[260px]">
        <div>Related posts</div>
        <SideIndex
          apiData={data.story?.apiData as ApiData}
          sourceCustomId={sourceCustomId}
          isInArticle={false}
        />
      </aside>
    </>
  )
}
