import type { Metadata } from 'next'

import { getT } from '@/app/i18n'
import LayoutTemplate from '@/components/layout-template'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="default"
      customStyle={{ background: 'bg-multi-layer-light' }}
    >
      {children}
    </LayoutTemplate>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { lng: string }
}): Promise<Metadata> {
  const { lng } = params
  const { t } = await getT('pages/social')

  const title = `${t('title', '社群')} | ${SITE_TITLE}`
  const description = t(
    'description',
    '追蹤你感興趣的用戶，瀏覽他們精選的文章和集錦。'
  )

  return {
    title,
    description,
    openGraph: {
      url: `${SITE_URL}/${lng}/social`,
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}
