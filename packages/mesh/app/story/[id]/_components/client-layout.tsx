'use client'

import LayoutTemplate from '@/components/layout-template'
import AddBookMarkButton from '@/components/navigation/add-bookmark-button'
import GoBackButton from '@/components/navigation/go-back-button'
import ShareButton from '@/components/navigation/share-button'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { useComment } from '@/context/comment'
import { useStoryInteractions } from '@/context/story-interactions'
import { useUser } from '@/context/user'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import { BookmarkObjective, PickObjective } from '@/types/objective'
import { getStoryUrl } from '@/utils/get-url'

import Loading from './loading'

export type Story = NonNullable<NonNullable<GetStoryQuery>['story']>

export default function ClientLayout({
  story,
  storyType,
  children,
}: {
  story: Story
  storyType: 'story' | 'podcast'
  children: React.ReactNode
}) {
  const { t } = useCustomTranslation()
  const { user } = useUser()
  const { interactions } = useStoryInteractions()
  const { displayPicks, displayPicksCount } = useDisplayPicks(interactions)
  const { state } = useComment()

  const isSinglePickByCurrentUser =
    displayPicks.length === 1 && displayPicks[0].member.id === user.memberId
  const navigationTitle =
    storyType === 'story'
      ? t('Pages.Story.ClientLayout-story-title', '新聞')
      : t('Pages.Story.ClientLayout-podcast-title', 'Podcast')
  return (
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
        commentsCount: state.commentsCount,
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
  )
}
