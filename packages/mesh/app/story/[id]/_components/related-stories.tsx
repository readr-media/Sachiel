'use client'

import React, { useEffect, useState } from 'react'

import { getRelatedStories } from '@/app/actions/story'
import StoryCard from '@/app/media/_components/story-card'
import Spinner from '@/components/spinner'
import type { GetStoriesQuery } from '@/graphql/__generated__/graphql'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

type Story = NonNullable<GetStoriesQuery['stories']>[number]

export default function RelatedStories({
  relatedKeyword,
  sourceStoryId,
}: {
  relatedKeyword: string
  sourceStoryId: string
}) {
  const { t } = useCustomTranslation()
  const [stories, setStories] = useState<Story[]>([])
  useEffect(() => {
    const fetchRelatedStories = async () => {
      const relatedStories = await getRelatedStories({
        storyTitle: relatedKeyword,
      })
      setStories(relatedStories)
    }

    fetchRelatedStories()
  }, [relatedKeyword])

  return (
    <div className="mt-9 px-5 sm:mt-14 sm:px-0 ">
      <h2 className="list-title mb-3 text-primary-700 sm:mb-4 sm:border-b sm:pb-1">
        {t('Pages.Story.RelatedStories-title', '相關報導')}
      </h2>
      <div>
        {stories.length ? (
          stories.map((story) => (
            <StoryCard
              key={story.id}
              sourceStoryId={sourceStoryId}
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
