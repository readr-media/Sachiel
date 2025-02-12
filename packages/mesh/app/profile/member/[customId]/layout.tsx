import type { Metadata } from 'next'

import { getMemberForOG } from '@/app/actions/get-profile'
import { metadata as rootMetadata } from '@/app/layout'
import { SITE_OG_IMAGE, SITE_TITLE, SITE_URL } from '@/constants/config'

import ClientLayout from './_components/client-layout'

export async function generateMetadata({
  params,
}: {
  params: { customId: string }
}): Promise<Metadata> {
  const memberCustomId = params.customId

  const memberData = await getMemberForOG(memberCustomId)
  const memberName = memberData?.member?.name
  const memberAvatar =
    memberData?.member?.avatar ||
    memberData?.member?.avatar_image?.resized?.original ||
    SITE_OG_IMAGE

  const metaTitle = memberName ? `${memberName} | ${SITE_TITLE}` : SITE_TITLE
  const metaDescription = memberName
    ? `查看 ${memberName} 的個人檔案。追蹤他們精選的文章和製作的集錦。`
    : '查看用戶的個人檔案。追蹤他們精選的文章和製作的集錦。'

  return {
    ...rootMetadata,
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      ...rootMetadata.openGraph,
      url: SITE_URL + `/profile/member/${memberCustomId}`,
      title: metaTitle,
      description: metaDescription,
      images: {
        url: memberAvatar,
      },
    },
  }
}

export default function ProfileMemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
