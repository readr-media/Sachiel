'use client'

import { useRouter } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import { BottomActionBarType } from '@/components/layout-template/bottom-action-bar'
import GoBackButton from '@/components/navigation/go-back-button'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import MoreButton from '@/components/story-card/more-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
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
  const router = useRouter()

  const backToPreviousPage = () => {
    router.back()
  }
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
        leftButtons: [
          {
            type: 'icon',
            icon: 'icon-chevron-left',
            onClick: backToPreviousPage,
          },
        ],
        title: '新聞',
        rightButtons: [
          {
            type: 'icon',
            icon: 'icon-bookmark',
            onClick: addStoryAsBookmark,
          },
          {
            type: 'icon',
            icon: 'icon-share',
            onClick: shareStory,
          },
        ],
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: '新聞',
        rightButtons: [
          <PublisherDonateButton key={0} />,
          <StoryPickButton storyId={story?.id ?? ''} key={1} />,
          <MoreButton key={2} />,
        ],
      }}
      actionBar={{ type: BottomActionBarType.Article, story }}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
