import Link from 'next/link'
import React, { useMemo } from 'react'

import ObjectivePickInfo from '@/components/general-objective/objective-pick-info'
import StoryPickButton from '@/components/story-card/story-pick-button'
import { useComment } from '@/context/comment'
import { type DisplayPicks } from '@/hooks/use-display-picks'
import { CommentObjective } from '@/types/objective'

const MobileCommentMeta = ({
  objectiveId,
  title,
  source,
  displayPicks,
  pickCount,
}: {
  objectiveId: string
  title: string
  source: {
    id: string
    name: string
  }
  displayPicks: DisplayPicks
  pickCount: number
}) => {
  const { state } = useComment()
  const { commentObjective } = state

  const authorJsx = useMemo(() => {
    switch (commentObjective) {
      case CommentObjective.Story:
        return (
          <Link href={`/profile/publisher/${source.id}`}>
            <h4 className="caption-1 mb-4 line-clamp-1 text-primary-500">
              {source.name}
            </h4>
          </Link>
        )

      case CommentObjective.Collection:
        return (
          <Link href={`/profile/member/${source.id}`}>
            <h4 className="caption-1 mb-4 line-clamp-1 text-primary-500">
              {`@${source.name}`}
            </h4>
          </Link>
        )

      default:
        return null
    }
  }, [commentObjective, source.id, source.name])

  return (
    <section className="px-5 pb-4 shadow-[0_0.5px_0px_0px_rgba(0,0,0,0.1)]">
      <h2 className={`subtitle-1 mb-2 text-primary-700 sm:hidden`}>{title}</h2>
      {authorJsx}
      {/* <Link href={`/profile/publisher/${'' ?? ''}`}>
        <h4 className="caption-1 mb-4 line-clamp-1 text-primary-500">
          {authorName}
        </h4>
      </Link> */}
      <div className="mt-4 flex h-8 flex-row justify-between">
        <ObjectivePickInfo
          displayPicks={displayPicks}
          pickCount={pickCount}
          objectiveId={objectiveId}
        />
        <StoryPickButton storyId={objectiveId} storyTitle={title} />
      </div>
    </section>
  )
}
export default MobileCommentMeta
