import { redirect } from 'next/navigation'

import getCurrentUserMemberId from '../actions/auth'

export default async function Page() {
  const memberId = await getCurrentUserMemberId()

  if (memberId) {
    redirect(`/social/${memberId}`)
  } else {
    redirect('/login')
  }
}
