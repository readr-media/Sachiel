import Link from 'next/link'
import React from 'react'

import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import type { UserActionStoryFragment } from '@/graphql/__generated__/graphql'
type Picks = UserActionStoryFragment['pick']
const MobileStoryCommentMeta = ({
  title,
  publisher,
  displayPicks,
  pickCount,
}: {
  title: string
  publisher: string
  displayPicks: Picks
  pickCount: number
}) => {
  return (
    <section className="px-5 pb-4 shadow-[0_0.5px_0px_0px_rgba(0,0,0,0.1)]">
      <h2 className={`subtitle-1 mb-2 text-primary-700 sm:hidden`}>{title}</h2>
      <Link href={`/profile/publisher/${'' ?? ''}`}>
        <h4 className="caption-1 mb-4 line-clamp-1 text-primary-500">
          {publisher}
        </h4>
      </Link>
      <div className="mt-4 flex h-8 flex-row justify-between">
        <StoryPickInfo displayPicks={displayPicks} pickCount={pickCount} />
        <StoryPickButton storyId={'0'} />
      </div>
    </section>
  )
}
export default MobileStoryCommentMeta
