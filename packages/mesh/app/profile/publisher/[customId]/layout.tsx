import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { getPublisherForOG } from '@/app/actions/get-profile'
import { getSiteMedadata } from '@/utils/site-meta'

import ClientLayout from './_component/client-layout'

export async function generateMetadata({
  params,
}: {
  params: { customId: string }
}): Promise<Metadata> {
  const t = await getTranslations('Others.meta')
  const publisherCustomId = params.customId

  const publisherData = await getPublisherForOG(publisherCustomId)
  const publisherName = publisherData?.publishers?.[0].title
  const publisherLogo = publisherData?.publishers?.[0]?.logo

  const title = publisherName
    ? t('site-title-profile-publisher', { publisherName })
    : undefined
  const description = publisherName
    ? t('site-description-profile-publisher', { publisherName })
    : t('site-description-profile-publisher-fallback')
  const images = publisherLogo ?? undefined
  const urlPath = `/profile/publisher/${publisherCustomId}`

  return getSiteMedadata(t, {
    title,
    description,
    images,
    urlPath,
  })
}

export default function ProfilePublisherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
