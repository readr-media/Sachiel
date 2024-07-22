import { notFound } from 'next/navigation'

import {
  GetStoryDocument,
  GetStoryQuery,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import ApiDataRenderer from './_components/api-data-renderer/renderer'

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

  const getArtcileContent = (story: Story) => {
    const sourceCustomId = story?.source?.customId ?? ''
    const isApiData = inHousePublisherCustomIds.includes(sourceCustomId)
    if (isApiData) {
      return <ApiDataRenderer />
    } else {
      return <div dangerouslySetInnerHTML={{ __html: story?.content ?? '' }} />
    }
  }

  return (
    <main className="sm:flex sm:justify-center lg:gap-10 lg:px-10">
      <div className="max-w-[600px]">
        <div>Article meta...</div>
        {getArtcileContent(data.story)}
      </div>
      <aside className="hidden lg:block lg:grow lg:bg-primary-200">
        Related posts and sideindex
      </aside>
    </main>
  )
}
