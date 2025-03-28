import { getCurrentUser } from '@/app/actions/auth'

import ProfilePage from './_components/profile-page'

export type PageProps = {
  params: {
    customId: string
  }
}

const Page = async (props: PageProps) => {
  const currentUser = await getCurrentUser()
  const params = props.params
  const customId = params.customId
  const isCurrentUser = currentUser?.customId === customId
  const userType = isCurrentUser ? 'member' : 'visitor'

  return (
    <div className="flex grow flex-col">
      <ProfilePage userType={userType} profileCustomId={customId} />
    </div>
  )
}

export default Page
