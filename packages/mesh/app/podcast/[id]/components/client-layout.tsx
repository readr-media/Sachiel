'use client'

import { type ReactNode } from 'react'

import { type PodcastData } from '@/app/actions/story'
import LayoutTemplate from '@/components/layout-template'
import AddBookMarkButton from '@/components/navigation/add-bookmark-button'
import GoBackButton from '@/components/navigation/go-back-button'
import ShareButton from '@/components/navigation/share-button'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { useComment } from '@/context/comment'
import { useUser } from '@/context/user'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import { BookmarkObjective, PickObjective } from '@/types/objective'
import { getStoryUrl } from '@/utils/get-url'

export default function ClientLayout({
  story,
  children,
}: {
  story: NonNullable<PodcastData>
  children: ReactNode
}) {
  const { id, title, source } = story
  const { user } = useUser()
  const { displayPicks, displayPicksCount } = useDisplayPicks(story)
  const isSinglePickByCurrentUser =
    displayPicks.length === 1 && displayPicks[0].member.id === user.memberId
  const { state: comment } = useComment()

  return (
    <LayoutTemplate
      type="podcast"
      mobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: 'Podcast',
        rightButtons: [
          <AddBookMarkButton
            key={0}
            bookmarkObjective={BookmarkObjective.Story}
            targetId={id}
          />,
          <ShareButton key={1} url={getStoryUrl(id)} />,
        ],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: 'Podcast',
        rightButtons: [
          <PublisherDonateButton key={0} publisherId={source?.id || ''} />,
          <StoryPickButton key={1} storyId={id} storyTitle={title || ''} />,
          <StoryMoreActionButton
            key={2}
            story={story}
            publisherId={source?.id || ''}
            className="pl-2"
          />,
        ],
      }}
      mobileActionBar={{
        pickObjective: PickObjective.Story,
        objectiveId: id,
        commentsCount: comment.commentsCount,
        picksCount: displayPicksCount,
        displayPicks: displayPicks,
        actions: [
          <PublisherDonateButton key={0} publisherId={source?.id || ''} />,
          <StoryPickButton key={1} storyId={id} storyTitle={title || ''} />,
        ],
        isSinglePickByCurrentUser,
      }}
    >
      {children}
    </LayoutTemplate>
  )
}
