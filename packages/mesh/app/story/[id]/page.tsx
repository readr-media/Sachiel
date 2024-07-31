import './_style/article.css'

import { notFound } from 'next/navigation'

import {
  GetStoryDocument,
  GetStoryQuery,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import ApiDataRenderer, {
  type ApiData,
} from './_components/api-data-renderer/renderer'
import SideIndex from './_components/api-data-renderer/side-index'

type Story = NonNullable<GetStoryQuery>['story']

const inHousePublisherCustomIds = ['鏡週刊', 'readr']

export default async function page({ params }: { params: { id: string } }) {
  const storyId = params.id
  const globalLogFields = getLogTraceObjectFromHeaders()

  const data = await fetchGraphQL(
    GetStoryDocument,
    { storyId },
    globalLogFields
  )

  if (!data) {
    notFound()
  }

  const sourceCustomId = data.story?.source?.customId ?? ''
  const useApiData = inHousePublisherCustomIds.includes(sourceCustomId)

  const getArtcileContent = (story: Story) => {
    if (useApiData) {
      return (
        <>
          <div className="mt-8 flex justify-center lg:hidden">
            <SideIndex
              apiData={data.story?.apiData as ApiData}
              sourceCustomId={sourceCustomId}
            />
          </div>
          <ApiDataRenderer
            apiData={story?.apiData as ApiData}
            sourceCustomId={sourceCustomId}
          />
        </>
      )
    } else {
      return <div dangerouslySetInnerHTML={{ __html: story?.content ?? '' }} />
    }
  }

  return (
    <>
      {/* a dummy div to make main tag horizontally aligned */}
      <div className="hidden lg:block lg:w-[260px]" />
      <main className="flex max-w-[600px] justify-center">
        <div className="">
          <div>Article meta...</div>
          {getArtcileContent(data.story)}
        </div>
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
