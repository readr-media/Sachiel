'use client'

import type { ReactNode } from 'react'

import { CommentProvider } from '@/context/comment'
import { useStoryInteractions } from '@/context/story-interactions'
import { CommentObjective } from '@/types/objective'

import type { Story } from './client-layout'

export default function CommentWrapper({
  story,
  children,
}: {
  story: Story
  children: ReactNode
}) {
  const { interactions } = useStoryInteractions()

  return (
    <CommentProvider
      initialComments={interactions?.comments ?? []}
      initialCommentsCount={interactions?.commentsCount ?? 0}
      commentObjectiveData={story}
      commentObjective={CommentObjective.Story}
    >
      {children}
    </CommentProvider>
  )
}
