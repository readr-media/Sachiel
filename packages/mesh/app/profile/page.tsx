import { redirect } from 'next/navigation'

import { getCurrentUser } from '../actions/auth'

export default async function Page() {
  const user = await getCurrentUser()
  const customId = user?.customId

  if (customId) {
    redirect(`/profile/member/${customId}`)
  } else {
    redirect('/login')
  }
}
