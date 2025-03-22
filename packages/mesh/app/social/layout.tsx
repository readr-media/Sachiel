import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import LayoutTemplate from '@/components/layout-template'
import { getSiteMedadata } from '@/utils/site-meta'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Others.meta')

  const title = t('site-title-social')
  const description = t('site-description-social')
  const urlPath = '/social'

  return getSiteMedadata(t, {
    title,
    description,
    urlPath,
  })
}

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
