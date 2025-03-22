import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import LayoutTemplate from '@/components/layout-template'
import { getSiteMedadata } from '@/utils/site-meta'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Others.meta')

  const title = t('site-title-login')
  const description = t('site-description-login')
  const urlPath = '/login'

  return getSiteMedadata(t, {
    title,
    description,
    urlPath,
  })
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutTemplate type="stateless">{children}</LayoutTemplate>
}
