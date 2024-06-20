/* eslint-disable no-console */
import {
  //   type GetMemberProfileQuery,
  GetMemberProfileDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

const page = async ({ params }: { params: { id: string } }) => {
  const userId = params.id

  const data = await fetchGraphQL(GetMemberProfileDocument, {
    memberId: userId,
  })
  console.log(data)

  return <div></div>
}

export default page
