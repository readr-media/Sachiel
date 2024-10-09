'use client'

import LayoutTemplate from '@/components/layout-template'
import { BottomActionBarType } from '@/components/layout-template/bottom-action-bar'
import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import GoBackButton from '@/components/navigation/go-back-button'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryMoreActionButton from '@/components/story-more-action-button'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'

import Loading from './loading'

type Story = NonNullable<GetStoryQuery>['story']

export default function ClientLayout({
  story,
  children,
}: {
  story: Story
  children: React.ReactNode
}) {
  const addStoryAsBookmark = () => {
    // TODO: pick story
  }
  const shareStory = () => {
    // TODO: share story
  }

  return (
    <LayoutTemplate
      type="article"
      mobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: '新聞',
        rightButtons: [
          <MobileNavigationButton
            key={0}
            type="icon"
            icon="icon-bookmark"
            onClick={addStoryAsBookmark}
          />,
          <MobileNavigationButton
            key={1}
            type="icon"
            icon="icon-share"
            onClick={shareStory}
          />,
        ],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: '新聞',
        rightButtons: [
          <PublisherDonateButton
            key={0}
            publisherId={story?.source?.id ?? ''}
          />,
          <StoryPickButton storyId={story?.id ?? ''} key={1} />,
          <StoryMoreActionButton
            storyId={story?.id ?? ''}
            publisherId={story?.source?.id ?? ''}
            key={2}
            className="pl-2"
          />,
        ],
      }}
      actionBar={{ type: BottomActionBarType.Article, story }}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
