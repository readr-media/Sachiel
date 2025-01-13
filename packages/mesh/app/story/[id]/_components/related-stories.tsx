import React from 'react'

import StoryCard from '@/app/media/_components/story-card'
import type { GetStoriesQuery } from '@/graphql/__generated__/graphql'

type Story = NonNullable<GetStoriesQuery['stories']>[number]

export default function RelatedStories({
  relatedStories,
}: {
  relatedStories: Story[]
}) {
  if (!relatedStories.length) return null
  return (
    <div className="mt-9 px-5 sm:mt-14 sm:px-0 ">
      <h2 className="list-title mb-3 text-primary-700 sm:mb-4 sm:border-b sm:pb-1">
        相關報導
      </h2>
      <div>
        {relatedStories.map((relatedStory) => (
          <StoryCard
            key={relatedStory.id}
            story={relatedStory}
            className="GTM-article_click_related_article last-of-type:border-b-0"
            storyPickGtmClassName="GTM-article_click_pick_related_article"
          />
        ))}
      </div>
    </div>
  )
}
