import { redirect } from 'next/navigation'

import { getCurrentUser } from '../actions/auth'

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId

  if (memberId) {
    redirect(`/social/${memberId}`)
  } else {
    redirect('/login')
  }
}
