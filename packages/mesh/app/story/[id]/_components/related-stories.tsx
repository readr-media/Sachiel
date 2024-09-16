import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Icon from '@/components/icon'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'

import { type RelatedStory } from '../page'

const MobileStoryCard = ({ story }: { story: RelatedStory }) => {
  return (
    <div className="border-b pb-4 pt-5 last-of-type:border-b-0 sm:hidden">
      <Link href={`/story/${story.id}`}>
        <div className="flex justify-between gap-3">
          <div className="subtitle-1 text-primary-700">{story.title}</div>
          <div className="relative h-12 w-24 shrink-0 overflow-hidden rounded">
            <Image
              src={story.og_image || '/images/default-story-image.webP'}
              alt={story.title}
              fill
            />
          </div>
        </div>
      </Link>
      <div className="caption-1 mt-2 text-primary-500">
        {/* wait for search api to add fields */}
        <StoryMeta
          commentCount={Math.floor(Math.random() * 30)}
          publishDate={story.lastUpdated}
          paywall={false}
          fullScreenAd="none"
        />
      </div>
      <div className="flex justify-between">
        {/* TODO wait for api to give pickCount and pick data */}
        <StoryPickInfo displayPicks={[]} pickCount={0} />
        <StoryPickButton storyId={story?.id ? story.id.toString() : ''} />
      </div>
    </div>
  )
}

const NonMobileStoryCard = ({ story }: { story: RelatedStory }) => {
  return (
    <div className="hidden border-b py-4 last-of-type:border-b-0 sm:block">
      <div className="flex items-center justify-between">
        <div className="caption-1 text-primary-500">{story.source}</div>
        <button>
          <Icon iconName="icon-more-horiz" size="l" />
        </button>
      </div>
      <Link href={`/story/${story.id}`}>
        <div className="subtitle-2 mt-1 text-primary-700">{story.title}</div>
      </Link>
      <div className="caption-1 mt-2 text-primary-500">
        {/* wait for search api to add fields */}
        <StoryMeta
          commentCount={Math.floor(Math.random() * 30)}
          publishDate={story.lastUpdated}
          paywall={false}
          fullScreenAd="none"
        />
      </div>
    </div>
  )
}

export default function RelatedStories({
  relatedStories,
}: {
  relatedStories: RelatedStory[]
}) {
  if (!relatedStories || !relatedStories.length) return null
  return (
    <div className="mt-9 px-5 sm:mt-10 lg:mt-0">
      <h2 className="list-title sm:title-1 text-primary-700">相關報導</h2>
      <div>
        {relatedStories.map((relatedStory) => (
          <React.Fragment key={relatedStory.id}>
            <MobileStoryCard story={relatedStory} />
          </React.Fragment>
        ))}
      </div>
      <div>
        {relatedStories.map((relatedStory) => (
          <React.Fragment key={relatedStory.id}>
            <NonMobileStoryCard story={relatedStory} />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
