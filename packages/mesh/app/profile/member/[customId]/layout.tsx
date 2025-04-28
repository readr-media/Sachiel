import type { Metadata } from 'next'

import { getMemberForOG } from '@/app/actions/get-profile'
import { getSiteMedadata } from '@/utils/site-meta'

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
    memberData?.member?.avatar_image?.resized?.original

  const title = memberName ? `${memberName} | READr Mesh 讀選` : undefined
  const description = memberName
    ? `查看 ${memberName} 的個人檔案。追蹤他們精選的文章和製作的集錦。`
    : '查看用戶的個人檔案。追蹤他們精選的文章和製作的集錦。'
  const images = memberAvatar ?? undefined
  const urlPath = `/profile/member/${memberCustomId}`
  return getSiteMedadata({
    title,
    description,
    images,
    urlPath,
  })
}

export default function ProfileMemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
