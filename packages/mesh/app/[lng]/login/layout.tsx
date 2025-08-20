import type { Metadata } from 'next'

import { getT } from '@/app/i18n'
import LayoutTemplate from '@/components/layout-template'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutTemplate type="stateless">{children}</LayoutTemplate>
}

export async function generateMetadata({
  params,
}: {
  params: { lng: string }
}): Promise<Metadata> {
  const { lng } = params
  const { t } = await getT('pages/login')

  const title = `${t('title', '登入')} | ${SITE_TITLE}`
  const description = t(
    'description',
    '登入您的讀選帳號，開始精選你感興趣的新聞文章。'
  )

  return {
    title,
    description,
    openGraph: {
      url: `${SITE_URL}/${lng}/login`,
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}
