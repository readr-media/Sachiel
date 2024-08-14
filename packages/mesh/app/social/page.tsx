'use client'

import { redirect } from 'next/navigation'

import { useUser } from '@/context/user'

export default function Page() {
  const { user } = useUser()
  const memberId = user.memberId

  if (memberId) {
    redirect(`/social/${memberId}`)
  } else {
    redirect('/login')
  }
}
