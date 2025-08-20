import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getLoginUrl } from '@/utils/get-url'

import MobileAccountActions from './_components/mobile-account-actions'
import NonMobileAccountActions from './_components/non-mobile-account-actions'

export default async function Page({ params }: { params: { lng: string } }) {
  const user = await getCurrentUser()
  if (!user) redirect(getLoginUrl(params.lng)) // Language-aware redirect

  return (
    <main className="sm:flex sm:justify-center sm:px-5 sm:pb-[167px] sm:pt-5 xl:pb-[43px]">
      <MobileAccountActions />
      <NonMobileAccountActions />
    </main>
  )
}

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}
