import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { getMemberForOG } from '@/app/actions/get-profile'
import { getSiteMedadata } from '@/utils/site-meta'

import ClientLayout from './_components/client-layout'

export async function generateMetadata({
  params,
}: {
  params: { customId: string }
}): Promise<Metadata> {
  const t = await getTranslations('Others.meta')
  const memberCustomId = params.customId

  const memberData = await getMemberForOG(memberCustomId)
  const memberName = memberData?.member?.name
  const memberAvatar =
    memberData?.member?.avatar ||
    memberData?.member?.avatar_image?.resized?.original

  const title = memberName
    ? t('site-title-profile-member', { memberName })
    : undefined
  const description = memberName
    ? t('site-description-profile-member', { memberName })
    : t('site-description-profile-member-fallback')
  const images = memberAvatar ?? undefined
  const urlPath = `/profile/member/${memberCustomId}`
  return getSiteMedadata(t, {
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
