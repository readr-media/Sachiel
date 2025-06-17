import type { Metadata } from 'next'

import { getPublisherForOG } from '@/app/actions/get-profile'
import { getSiteMedadata } from '@/utils/site-meta'

import ClientLayout from './_component/client-layout'

export async function generateMetadata({
  params,
}: {
  params: { customId: string }
}): Promise<Metadata> {
  const publisherCustomId = params.customId

  const publisherData = await getPublisherForOG(publisherCustomId)
  const publisherName = publisherData?.publishers?.[0].title
  const publisherLogo = publisherData?.publishers?.[0]?.logo

  const title = publisherName ? `${publisherName} | READr Mesh 讀選` : undefined
  const description = publisherName
    ? `查看 ${publisherName} 的媒體檔案。追蹤他們的媒體報導。`
    : '查看媒體檔案。追蹤他們的媒體報導。'
  const images = publisherLogo ?? undefined
  const urlPath = `/profile/publisher/${publisherCustomId}`

  return getSiteMedadata({
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
