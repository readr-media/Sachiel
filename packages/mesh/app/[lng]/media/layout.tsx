import type { Metadata } from 'next'

import { getT } from '@/app/i18n'
import LayoutTemplate from '@/components/layout-template'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

import Loading from './_components/loading'

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate type="default" suspenseFallback={<Loading />}>
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
  const { t } = await getT('pages/media')

  const title = t('title', '最新') + ` | ${SITE_TITLE}`
  const description = t(
    'description',
    '追蹤你感興趣的媒體，查看他們最新發布的各類文章。'
  )

  return {
    title,
    description,
    openGraph: {
      url: `${SITE_URL}/${lng}/media`,
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}
