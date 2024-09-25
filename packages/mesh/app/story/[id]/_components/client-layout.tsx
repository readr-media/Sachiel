'use client'

import { useRouter } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import { BottomActionBarType } from '@/components/layout-template/bottom-action-bar'
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
      navigation={{
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
      actionBar={{ type: BottomActionBarType.Article, story }}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
