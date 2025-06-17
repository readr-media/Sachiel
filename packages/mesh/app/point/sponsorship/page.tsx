import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getMemberSponsorRecord } from '@/app/actions/sponsorship'

import ClientPage from './_components/client-page'

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')
  const response = await getMemberSponsorRecord(memberId)
  const sponsorRecords = response.filter((data) => data.sponsoredCount !== 0)

  return <ClientPage sponsorRecords={sponsorRecords} />
}
