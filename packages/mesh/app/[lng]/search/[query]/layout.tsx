import type { Metadata } from 'next'

import Loading from '@/app/[lng]/_components/loading'
import { getT } from '@/app/i18n'
import LayoutTemplate from '@/components/layout-template'
import { SITE_URL } from '@/constants/config'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="default"
      suspenseFallback={<Loading />}
      customStyle={{ background: 'bg-white' }}
    >
      {children}
    </LayoutTemplate>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { query: string; lng: string }
}): Promise<Metadata> {
  const { query, lng } = params
  const { t } = await getT('pages/search')
  const decodedQuery = decodeURIComponent(query)

  return {
    title: t('titleWithQuery', `搜尋結果: ${decodedQuery}`, {
      query: decodedQuery,
    }),
    description: t(
      'description',
      `在 Sachiel 搜尋「${decodedQuery}」的相關內容`,
      { query: decodedQuery }
    ),
    alternates: {
      canonical: `${SITE_URL}/${lng}/search/${query}`,
    },
  }
}

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}
