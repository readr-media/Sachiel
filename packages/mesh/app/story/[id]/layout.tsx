import { notFound } from 'next/navigation'

import MobileCommentModalWrapper from '@/components/comment/comment-wrapper'
import { GetStoryDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import ClientLayout from './_components/client-layout'

const picksTake = 5
const commentsTake = 10

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
      <MobileCommentModalWrapper storyData={storyData.story}>
        <ClientLayout story={storyData.story}>{children}</ClientLayout>
      </MobileCommentModalWrapper>
    </body>
  )
}
