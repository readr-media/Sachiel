import { getCurrentUser } from '@/app/actions/auth'
import { GetMemberProfileEditDataDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'

import EditProfile from './_components/edit-profile'

export default async function Page() {
  const user = await getCurrentUser()
  const response = await queryGraphQL(GetMemberProfileEditDataDocument, {
    customId: user?.customId || '',
  })
  const memberData = response?.member

  return <EditProfile avatar_image={memberData?.avatar_image} />
}
