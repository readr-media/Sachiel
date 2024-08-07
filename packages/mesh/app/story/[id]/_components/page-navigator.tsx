'use client'

import { useRouter } from 'next/navigation'

import Icon from '@/components/icon'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'

type Story = NonNullable<GetStoryQuery>['story']

export default function PageNavigator({ story }: { story: Story }) {
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
    <div className="flex h-full grow items-center justify-between px-2 sm:px-0">
      <div className="flex">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          onClick={backToPreviousPage}
        >
          <Icon iconName="icon-chevron-left" size="m" />
        </button>
        <p className="title-1 hidden place-self-center text-primary-700 sm:block">
          新聞
        </p>
      </div>
      <div className="flex sm:hidden">
        {/* TODO: hide bookmark button if not login */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          onClick={addStoryAsBookmark}
        >
          <Icon iconName="icon-bookmark" size="l" />
        </button>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center"
          onClick={shareStory}
        >
          <Icon iconName="icon-share" size="l" />
        </button>
      </div>
      <div className="hidden gap-1 sm:flex">
        <PublisherDonateButton />
        <StoryPickButton storyId={story?.id ?? ''} />
        <button className="pl-2">
          <Icon iconName="icon-more-horiz" size="l" />
        </button>
      </div>
    </div>
  )
}
