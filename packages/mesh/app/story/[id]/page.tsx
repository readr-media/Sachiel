import './_style/article.css'

import { notFound } from 'next/navigation'

import {
  getPublisherPolicy,
  getRelatedStories,
  getStory,
} from '@/app/actions/story'

import { type ApiData } from './_components/api-data-renderer/renderer'
import SideIndex from './_components/api-data-renderer/side-index'
import Article from './_components/article'
import Comment from './_components/comment'
import RelatedStories from './_components/related-stories'

export type PublisherPolicy = Awaited<ReturnType<typeof getPublisherPolicy>>

const picksTake = 5
const commentsTake = 3

export default async function Page({ params }: { params: { id: string } }) {
  const storyId = params.id
  const storyData = await getStory({ storyId, picksTake, commentsTake })
  let policy: PublisherPolicy = []
  let hasPayed = false

  if (!storyData || !storyData.story || !storyData.story.title) {
    notFound()
  }
  const relatedStories = await getRelatedStories({
    storyTitle: storyData.story.title,
    picksTake,
    commentsTake,
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
      <RelatedStories relatedStories={relatedStories} />
      <Comment storyId={storyId} />
      <aside className="hidden lg:fixed lg:right-[calc(((100vw-theme(width.articleMain))/2-theme(width.articleAside.lg))/2)] lg:top-[theme(height.header.sm)] lg:flex lg:w-[theme(width.articleAside.lg)] xl:right-[calc((100vw-1440px)/2+((1440px-theme(width.articleMain))/2-theme(width.articleAside.xl))/2)] xl:w-[theme(width.articleAside.xl)]">
        {!isMemberStory && (
          <SideIndex
            apiData={storyData.story?.apiData as ApiData}
            sourceCustomId={sourceCustomId}
            isInArticle={false}
          />
        )}
      </aside>
    </>
  )
}
