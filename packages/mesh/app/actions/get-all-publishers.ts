'use server'

import { PublishersDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

type AllPublisherData = Awaited<ReturnType<typeof getAllPublishers>>
export type PublisherData = AllPublisherData extends Array<infer U> ? U : never

export default async function getAllPublishers() {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    PublishersDocument,
    undefined,
    globalLogFields,
    'Failed to get all publishers'
  )
  return data?.publishers ?? []
}
