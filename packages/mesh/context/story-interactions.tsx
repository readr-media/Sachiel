'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import { getStoryInteractions } from '@/app/actions/story'
import type { GetStoryInteractionsQuery } from '@/graphql/__generated__/graphql'

export type StoryInteractions = NonNullable<
  NonNullable<GetStoryInteractionsQuery>['story']
>

type StoryInteractionsContextType = {
  interactions: StoryInteractions
}

const StoryInteractionsContext = createContext<
  StoryInteractionsContextType | undefined
>(undefined)

export function StoryInteractionsProvider({
  storyId,
  children,
}: {
  storyId: string
  children: ReactNode
}) {
  const [interactions, setInteractions] = useState<StoryInteractions>({
    id: storyId,
  })

  useEffect(() => {
    const fetchStoryInteractionInfo = async (storyId: string) => {
      const interactionInfo = await getStoryInteractions(storyId)
      if (interactionInfo) setInteractions(interactionInfo)
    }

    if (storyId) {
      fetchStoryInteractionInfo(storyId)
    }
  }, [storyId])

  return (
    <StoryInteractionsContext.Provider value={{ interactions }}>
      {children}
    </StoryInteractionsContext.Provider>
  )
}

export function useStoryInteractions() {
  const context = useContext(StoryInteractionsContext)
  if (context === undefined) {
    throw new Error(
      'useStoryInteractions must be used within a StoryInteractionsProvider'
    )
  }
  return context
}
