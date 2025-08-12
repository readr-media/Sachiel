import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getMeshPointBalance } from '@/app/actions/mesh-point'
import { getT } from '@/app/i18n'
import { LogInCard } from '@/components/alchemy/login-card'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

import { getCurrentUser } from '../../actions/auth'
import MeshPoint from './_components/mesh-point'

export default async function Page({ params }: { params: { lng: string } }) {
  const { lng } = params
  const { t } = await getT('pages/point')

  const user = await getCurrentUser()
  const memberId = user?.memberId
  let balance = undefined

  if (!memberId) redirect(`/${lng}/login`) // Use localized login URL

  const hasAlchemyAccount = !!user.wallet

  if (hasAlchemyAccount) {
    const response = await getMeshPointBalance(user.wallet)
    balance = response?.balance
  }

  return (
    <main className="flex grow flex-col sm:p-5 md:px-[70px] md:py-10 lg:p-10">
      {hasAlchemyAccount ? (
        <MeshPoint balance={balance} />
      ) : (
        <LogInCard
          formDescription={t(
            'wallet.description',
            '您尚未新增/連結錢包。點擊下方按鈕，我們會將錢包的啟用連結寄送至您的 Email。'
          )}
          isHelperText={true}
        />
      )}
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { lng: string }
}): Promise<Metadata> {
  const { lng } = params
  const { t } = await getT('pages/point')

  const title = `${t('title', '點數')} | ${SITE_TITLE}`
  const description = t(
    'description',
    '管理您的點數餘額、查看交易紀錄、贊助媒體和訂閱內容'
  )

  return {
    title,
    description,
    openGraph: {
      url: `${SITE_URL}/${lng}/point`,
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}
