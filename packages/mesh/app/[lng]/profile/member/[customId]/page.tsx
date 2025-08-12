import { getCurrentUser } from '@/app/actions/auth'
import MisoPageView from '@/components/miso-page-view'

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
      <MisoPageView productIds={`profile_member_${customId}`} />
      <ProfilePage userType={userType} profileCustomId={customId} />
    </div>
  )
}

export default Page
