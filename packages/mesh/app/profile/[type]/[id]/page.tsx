import MemberProfile from '../../_components/member-profile'
import PublisherProfile from '../../_components/publisher-profile'

type PageProps = {
  params: {
    id: string
    type: string
  }
  searchParams: {
    user: string
  }
}
const page = async ({ params, searchParams }: PageProps) => {
  const visitID = params.id
  const isVisitor = searchParams.user !== visitID
  const userType =
    params.type === 'publisher' ? 'publisher' : isVisitor ? 'visitor' : 'member'
  const userId = searchParams.user

  switch (userType) {
    case 'publisher':
      return <PublisherProfile visitID={visitID} userType={userType} />
    case 'member':
    default:
      return (
        <MemberProfile userID={userId} visitID={visitID} userType={userType} />
      )
  }
}

export default page
