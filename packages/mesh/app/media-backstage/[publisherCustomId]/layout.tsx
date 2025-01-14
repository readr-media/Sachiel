import { notFound, redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import LayoutTemplate from '@/components/layout-template'

import Loading from './point/_components/loading'

export default async function MediaBackstageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { publisherCustomId: string }
}) {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')

  const { publisherCustomId } = params

  if (
    !user.publishers.length ||
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
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
