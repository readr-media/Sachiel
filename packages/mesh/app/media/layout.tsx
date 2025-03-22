import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import LayoutTemplate from '@/components/layout-template'
import { getSiteMedadata } from '@/utils/site-meta'

import Loading from './_components/loading'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Others.meta')

  const title = t('site-title-media')
  const description = t('site-description-media')
  const urlPath = '/media'

  return getSiteMedadata(t, {
    title,
    description,
    urlPath,
  })
}

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
