'use client'

import React from 'react'

import StoryCard from '@/app/media/_components/story-card'
import Spinner from '@/components/spinner'
import type { GetStoriesQuery } from '@/graphql/__generated__/graphql'

type Stories = NonNullable<GetStoriesQuery['stories']>

export default function RelatedStories({
  relatedStories = [],
}: {
  relatedStories: Stories
}) {
  return (
    <div className="mt-9 px-5 sm:mt-14 sm:px-0 ">
      <h2 className="list-title mb-3 text-primary-700 sm:mb-4 sm:border-b sm:pb-1">
        相關報導
      </h2>
      <div>
        {relatedStories.length ? (
          relatedStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              gtmTags={{
                story: 'GTM-article_click_related_article',
                pick: 'GTM-article_click_pick_related_article',
              }}
              className="last-of-type:border-b-0"
            />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}
