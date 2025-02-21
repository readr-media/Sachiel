import type { Metadata } from 'next'

import { getPublisherForOG } from '@/app/actions/get-profile'
import { metadata as rootMetadata } from '@/app/layout'
import { SITE_OG_IMAGE, SITE_TITLE, SITE_URL } from '@/constants/config'

import ClientLayout from './_component/client-layout'

export async function generateMetadata({
  params,
}: {
  params: { customId: string }
}): Promise<Metadata> {
  const publisherCustomId = params.customId

  const publisherData = await getPublisherForOG(publisherCustomId)
  const publisherName = publisherData?.publishers?.[0].title
  const publisherLogo = publisherData?.publishers?.[0]?.logo || SITE_OG_IMAGE

  const metaTitle = publisherName
    ? `${publisherName} | ${SITE_TITLE}`
    : SITE_TITLE
  const metaDescription = publisherName
    ? `查看 ${publisherName} 的媒體檔案。追蹤他們的媒體報導。`
    : '查看媒體檔案。追蹤他們的媒體報導'

  return {
    ...rootMetadata,
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      ...rootMetadata.openGraph,
      url: SITE_URL + `/profile/publisher/${publisherCustomId}`,
      title: metaTitle,
      description: metaDescription,
      images: {
        url: publisherLogo,
      },
    },
  }
}

export default function ProfilePublisherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
