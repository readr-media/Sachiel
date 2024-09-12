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
  const isMember = currentUser?.customId === customId

  return (
    <main className="flex grow flex-col">
      <ProfilePage isMember={isMember} />
    </main>
  )
}

export default Page
