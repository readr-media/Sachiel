import { notFound } from 'next/navigation'
import { type ReactNode } from 'react'

import { getPodcastComments } from '@/app/actions/story'
import { CommentProvider } from '@/context/comment'
import { CommentObjective } from '@/types/objective'

import ClientLayout from './components/client-layout'

export default async function PodcastLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { id: string }
}) {
  const podcastData = await getPodcastComments(params.id)
  if (!podcastData) notFound()

  const { comments, commentsCount } = podcastData

  return (
    <CommentProvider
      initialComments={comments || []}
      commentsCount={commentsCount || 0}
      commentObjective={CommentObjective.Story}
      commentObjectiveData={podcastData}
    >
      <ClientLayout story={podcastData}>{children}</ClientLayout>
    </CommentProvider>
  )
}
