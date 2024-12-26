import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import LayoutTemplate from '@/components/layout-template'

export default async function MediaBackstageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { publisherCustomId: string }
}) {
  const user = await getCurrentUser()
  const { publisherCustomId } = params

  if (
    !user?.publishers.length ||
    !user.publishers.find(
      (publisher) => publisher.customId === publisherCustomId
    )
  ) {
    notFound()
  }
  return (
    <LayoutTemplate
      type="media-backstage"
      publisherCustomId={publisherCustomId}
    >
      {children}
    </LayoutTemplate>
  )
}
