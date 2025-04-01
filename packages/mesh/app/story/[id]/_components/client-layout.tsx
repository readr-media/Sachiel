'use client'

import LayoutTemplate from '@/components/layout-template'
import AddBookMarkButton from '@/components/navigation/add-bookmark-button'
import GoBackButton from '@/components/navigation/go-back-button'
import ShareButton from '@/components/navigation/share-button'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { CommentProvider } from '@/context/comment'
import { useStoryInteractions } from '@/context/story-interactions'
import { useUser } from '@/context/user'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import {
  BookmarkObjective,
  CommentObjective,
  PickObjective,
} from '@/types/objective'
import { getStoryUrl } from '@/utils/get-url'

import Loading from './loading'

type Story = NonNullable<NonNullable<GetStoryQuery>['story']>

export default function ClientLayout({
  story,
  storyType,
  children,
}: {
  story: Story
  storyType: 'story' | 'podcast'
  children: React.ReactNode
}) {
  const { user } = useUser()
  const { interactions } = useStoryInteractions()
  const { displayPicks, displayPicksCount } = useDisplayPicks(interactions)
  const isSinglePickByCurrentUser =
    displayPicks.length === 1 && displayPicks[0].member.id === user.memberId
  const navigationTitle = storyType === 'story' ? '新聞' : 'Podcast'

  return (
    <CommentProvider
      initialComments={interactions?.comments ?? []}
      initialCommentsCount={interactions?.commentsCount ?? 0}
      commentObjectiveData={story}
      commentObjective={CommentObjective.Story}
    >
      <LayoutTemplate
        type="article"
        mobileNavigation={{
          leftButtons: [<GoBackButton key={0} />],
          title: navigationTitle,
          rightButtons: [
            <AddBookMarkButton
              key={0}
              bookmarkObjective={BookmarkObjective.Story}
              targetId={story?.id ?? ''}
            />,
            <ShareButton key={1} url={getStoryUrl(story?.id ?? '')} />,
          ],
        }}
        nonMobileNavigation={{
          leftButtons: [<GoBackButton key={0} />],
          title: navigationTitle,
          rightButtons: [
            <PublisherDonateButton
              key={0}
              publisherId={story?.source?.id ?? ''}
            />,
            <StoryPickButton
              storyId={story?.id ?? ''}
              storyTitle={story?.title ?? ''}
              key={1}
              gtmClassName="GTM-article_click_pick_article"
            />,
            story ? (
              <StoryMoreActionButton
                story={story}
                publisherId={story?.source?.id ?? ''}
                key={2}
                className="pl-2"
              />
            ) : undefined,
          ],
        }}
        mobileActionBar={{
          pickObjective: PickObjective.Story,
          objectiveId: story?.id ?? '',
          commentsCount: interactions?.commentsCount ?? 0,
          picksCount: displayPicksCount,
          displayPicks: displayPicks,
          actions: [
            <PublisherDonateButton
              key={0}
              publisherId={story?.source?.id ?? ''}
            />,
            <StoryPickButton
              key={1}
              storyId={story?.id ?? ''}
              storyTitle={story?.title ?? ''}
            />,
          ],
          isSinglePickByCurrentUser,
        }}
        suspenseFallback={<Loading />}
      >
        {children}
      </LayoutTemplate>
    </CommentProvider>
  )
}
