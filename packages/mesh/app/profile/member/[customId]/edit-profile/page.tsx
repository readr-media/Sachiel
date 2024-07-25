import { getCurrentUser } from '@/app/actions/auth'
import { GetMemberProfileEditDataDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import EditProfile from './_components/edit-profile'

export default async function Page() {
  const user = await getCurrentUser()
  const response = await fetchGraphQL(GetMemberProfileEditDataDocument, {
    customId: user?.customId || '',
  })
  const memberData = response?.member

  return (
    <EditProfile
      avatar={memberData?.avatar_image?.resized?.original}
      name={memberData?.name}
      intro={memberData?.intro}
      customId={memberData?.customId}
    />
  )
}
