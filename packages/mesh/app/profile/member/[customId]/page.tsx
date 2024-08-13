import MemberPage from './_components/member-page'
import VisitorPage from './_components/visitor-page'
import { getCurrentUser } from '@/app/actions/auth'

export type PageProps = {
  params: {
    customId: string
  }
}

const Page = async (props: PageProps) => {
  const currentUser = await getCurrentUser()
  const params = props.params
  const customId = params.customId
  const isVisitor = currentUser?.customId !== customId

  return (
    <main className="flex grow flex-col">
      {isVisitor ? <VisitorPage /> : <MemberPage />}
    </main>
  )
}

export default Page
