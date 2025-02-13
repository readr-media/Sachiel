import './_style/article.css'

import { notFound } from 'next/navigation'

import {
  getPublisherPolicy,
  getRelatedStories,
  getStory,
} from '@/app/actions/story'
import { NEXT_PAGES_REVALIDATE } from '@/constants/config'

import { type ApiData } from './_components/api-data-renderer/renderer'
import SideIndex from './_components/api-data-renderer/side-index'
import Article from './_components/article'
import AsideAd from './_components/aside-ad'
import Comment from './_components/comment'
import RelatedStories from './_components/related-stories'
import StoryEndAd from './_components/story-end-ad'

export type PublisherPolicy = Awaited<ReturnType<typeof getPublisherPolicy>>

export const revalidate = NEXT_PAGES_REVALIDATE.story

export default async function Page({ params }: { params: { id: string } }) {
  const storyId = params.id
  const storyData = await getStory({ storyId })
  let policy: PublisherPolicy = []
  let hasPayed = false

  if (!storyData || !storyData.story || !storyData.story.title) {
    notFound()
  }
  const relatedStories = await getRelatedStories({
    storyTitle: storyData.story.title,
  })

  const sourceCustomId = storyData.story.source?.customId ?? ''
  const isMemberStory = storyData.story.isMember ?? false
  const renderData: ApiData =
    storyData.story.apiData ?? storyData.story.trimApiData

  if (isMemberStory && sourceCustomId) {
    policy = await getPublisherPolicy(sourceCustomId)
    hasPayed = !!storyData.story.apiData
  }

  return (
    <>
      <Article
        story={storyData.story}
        sourceCustomId={sourceCustomId}
        renderData={renderData}
        isMemberStory={isMemberStory}
        hasPayed={hasPayed}
        policy={policy}
      />
      <StoryEndAd />
      <RelatedStories
        sourceStoryId={storyData.story.id}
        relatedStories={relatedStories}
      />
      <Comment targetId={storyId} />
      <aside className="hidden lg:fixed lg:right-[calc(((100vw-theme(width.articleMain))/2-theme(width.articleAside.lg))/2)] lg:top-[theme(height.header.sm)] lg:flex lg:w-[theme(width.articleAside.lg)] lg:flex-col xl:right-[calc((100vw-1440px)/2+((1440px-theme(width.articleMain))/2-theme(width.articleAside.xl))/2)] xl:w-[theme(width.articleAside.xl)]">
        {!isMemberStory && (
          <SideIndex
            apiData={storyData.story?.apiData as ApiData}
            sourceCustomId={sourceCustomId}
            isInArticle={false}
          />
        )}
      </aside>
      <AsideAd />
    </>
  )
}
