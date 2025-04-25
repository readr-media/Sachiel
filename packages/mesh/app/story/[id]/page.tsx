import './_style/article.css'

import dynamicImport from 'next/dynamic'
import { notFound } from 'next/navigation'

import { getPublisherPolicy } from '@/app/actions/story'
import { getStory } from '@/app/actions/story'
import MisoPageView from '@/components/miso-page-view'

import { type ApiData } from './_components/api-data-renderer/renderer'
import SideIndex from './_components/api-data-renderer/side-index'
import Article from './_components/article'
import AsideAd from './_components/aside-ad'
import Comment from './_components/comment'
import StoryEndAd from './_components/story-end-ad'
const RelatedStories = dynamicImport(
  () => import('./_components/related-stories'),
  {
    ssr: false,
  }
)
const AudioPlayer = dynamicImport(() => import('./_components/audio-player'), {
  ssr: false,
})

export type PublisherPolicy = Awaited<ReturnType<typeof getPublisherPolicy>>

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page({ params }: { params: { id: string } }) {
  const storyId = params.id
  const storyData = await getStory({ storyId })

  if (!storyData || !storyData.title) {
    notFound()
  }
  const { title, story_type, source, isMember, apiData, podcast, og_image } =
    storyData

  const storyType = story_type === 'story' ? 'story' : 'podcast'
  const sourceCustomId = source?.customId ?? ''
  const isMemberStory = isMember ?? false

  let policy: PublisherPolicy = []
  if (isMemberStory && sourceCustomId) {
    policy = await getPublisherPolicy(sourceCustomId)
  }

  return (
    <>
      <MisoPageView productIds={`story_${storyId}`} />
      <Article
        story={storyData}
        sourceCustomId={sourceCustomId}
        isMemberStory={isMemberStory}
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
