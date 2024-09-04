import { notFound } from 'next/navigation'

import Footer from '@/components/layout-template/footer'
import { GetStoryDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import StoryHeader from './_components/story-header'
import StoryNav from './_components/story-nav'

const picksTake = 5
const commentsTake = 3

export default async function MediaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
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

  return (
    <body>
      {/* fixed header */}
      <StoryHeader story={storyData.story} />
      {/* block for non-fixed content, set padding for fixed blocks */}
      <div className="primary-container-article">
        {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
        <div className="flex grow flex-col items-center bg-white">
          <div className="flex w-full grow justify-around xl:max-w-[theme(width.maxContent)]">
            {children}
          </div>
        </div>
        {/* footer after main content */}
        <Footer />
      </div>
      {/* fixed nav, mobile on the bottom, otherwise on the left side */}
      <StoryNav story={storyData.story} />
    </body>
  )
}
