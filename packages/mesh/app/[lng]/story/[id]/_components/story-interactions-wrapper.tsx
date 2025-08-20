import type { ReactNode } from 'react'

import { StoryInteractionsProvider } from '@/context/story-interactions'

export default function StoryInteractionsWrapper({
  storyId,
  children,
}: {
  storyId: string
  children: ReactNode
}) {
  return (
    <StoryInteractionsProvider storyId={storyId}>
      {children}
    </StoryInteractionsProvider>
  )
}
