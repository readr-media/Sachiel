import { GetMemberProfileEditDataDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import EditProfile from './_components/edit-profile'

export default async function Page() {
  const response = await fetchGraphQL(GetMemberProfileEditDataDocument)
  return <EditProfile />
}
