import { notFound, redirect } from 'next/navigation'

import { GetMemberDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export { type Story } from '@/utils/get-latest-stories-in-categroy'

//TODO: cache setting
export const revalidate = 0

export default async function Page() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const memberId = '19'

  const data = await fetchGraphQL(
    GetMemberDocument,
    {
      memberId,
    },
    globalLogFields
  )

  if (!data) {
    notFound()
  }

  const firstCategory = data.member?.followingCategories?.[0]

  if (!firstCategory || !firstCategory.id || !firstCategory.slug) {
    // TODO: user has no category to render, show empty category UI
    notFound()
  }

  redirect(`media/${firstCategory.slug}`)
}
