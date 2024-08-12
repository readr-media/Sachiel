'use client'
import { useParams } from 'next/navigation'

import useAuthState from '@/hooks/use-auth-state'
import useProfileState from '@/hooks/use-profile-state'

import MemberPage from './_components/member-page'
import VisitorPage from './_components/visitor-page'

export type PageProps = {
  params: {
    customId: string
  }
}

const Page = () => {
  const { currentUser } = useAuthState()
  const params: PageProps['params'] = useParams()
  const customId = params.customId
  const isVisitor = currentUser?.customId !== customId

  return (
    <main className="flex grow flex-col">
      {isVisitor ? <VisitorPage /> : <MemberPage />}
    </main>
  )
}

export default Page
