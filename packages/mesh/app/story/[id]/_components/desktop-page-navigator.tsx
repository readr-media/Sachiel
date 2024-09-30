'use client'

import { useRouter } from 'next/navigation'

import Icon from '@/components/icon'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryPickButton from '@/components/story-card/story-pick-button'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'

type Story = NonNullable<GetStoryQuery>['story']

export default function DesktopPageNavigator({ story }: { story: Story }) {
  const router = useRouter()
  const backToPreviousPage = () => {
    router.back()
  }

  return (
    <div className="flex h-full grow items-center justify-between px-0">
      <div className="flex">
        <button
          type="button"
          className="flex size-11 items-center justify-center"
          onClick={backToPreviousPage}
        >
          <Icon iconName="icon-chevron-left" size="m" />
        </button>
        <p className="title-1  block place-self-center text-primary-700">
          新聞
        </p>
      </div>
      <div className="flex gap-1">
        <PublisherDonateButton publisherId={story?.source?.id ?? ''} />
        <StoryPickButton storyId={story?.id ?? ''} />
        <button className="pl-2">
          <Icon iconName="icon-more-horiz" size="l" />
        </button>
      </div>
    </div>
  )
}
