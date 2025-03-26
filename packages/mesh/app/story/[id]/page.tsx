import './_style/article.css'

import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { getPublisherPolicy, getStory } from '@/app/actions/story'
import { NEXT_PAGES_REVALIDATE } from '@/constants/config'

import { type ApiData } from './_components/api-data-renderer/renderer'
import SideIndex from './_components/api-data-renderer/side-index'
import Article from './_components/article'
import AsideAd from './_components/aside-ad'
import Comment from './_components/comment'
import StoryEndAd from './_components/story-end-ad'
const RelatedStories = dynamic(() => import('./_components/related-stories'))
const AudioPlayer = dynamic(() => import('./_components/audio-player'), {
  ssr: false,
})

export type PublisherPolicy = Awaited<ReturnType<typeof getPublisherPolicy>>

export const revalidate = NEXT_PAGES_REVALIDATE.story

export default async function Page({ params }: { params: { id: string } }) {
  const storyId = params.id
  const storyData = await getStory({ storyId })
  let policy: PublisherPolicy = []
  let hasPayed = false

  if (!storyData || !storyData.title) {
    notFound()
  }
  const {
    title,
    story_type,
    source,
    isMember,
    apiData,
    trimApiData,
    podcast,
    og_image,
  } = storyData

  const storyType = story_type === 'story' ? 'story' : 'podcast'
  const sourceCustomId = source?.customId ?? ''
  const isMemberStory = isMember ?? false
  const renderData: ApiData = apiData ?? trimApiData

  if (isMemberStory && sourceCustomId) {
    policy = await getPublisherPolicy(sourceCustomId)
    hasPayed = !!apiData
  }

  return (
    <>
      <Article
        story={storyData}
        sourceCustomId={sourceCustomId}
        renderData={renderData}
        isMemberStory={isMemberStory}
        hasPayed={hasPayed}
        policy={policy}
      />
      <StoryEndAd />
      <RelatedStories relatedKeyword={title} sourceStoryId={storyId} />
      <Comment targetId={storyId} />
      <aside className="hidden lg:fixed lg:right-[calc(((100vw-theme(width.articleMain))/2-theme(width.articleAside.lg))/2)] lg:top-[theme(height.header.sm)] lg:flex lg:w-[theme(width.articleAside.lg)] lg:flex-col xl:right-[calc((100vw-1440px)/2+((1440px-theme(width.articleMain))/2-theme(width.articleAside.xl))/2)] xl:w-[theme(width.articleAside.xl)]">
        {!isMemberStory && storyType === 'story' && (
          <SideIndex
            apiData={apiData as ApiData}
            sourceCustomId={sourceCustomId}
            isInArticle={false}
          />
        )}
      </aside>
      <AsideAd />
      {storyType === 'podcast' && (
        <AudioPlayer
          audioSrc={podcast?.url || ''}
          audioLogoSrc={og_image || ''}
          audioTitle={title}
        />
      )}
    </>
  )
}
