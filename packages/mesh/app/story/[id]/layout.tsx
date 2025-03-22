import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getStory } from '@/app/actions/story'
import { getSiteMedadata } from '@/utils/site-meta'

import ClientLayout from './_components/client-layout'
import CommentWrapper from './_components/comment-wrapper'
import StoryInteractionsWrapper from './_components/story-interactions-wrapper'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const t = await getTranslations('Others.meta')
  const storyId = params.id
  const storyData = await getStory({
    storyId,
  })

  if (!storyData) notFound()

  const storyTitle = storyData?.title
  const storyDescription = storyData?.summary
  const storyImage = storyData?.og_image
  const storyCategory = storyData?.category?.title ?? ''
  const storyPublishTime = storyData?.published_date ?? ''

  const title = storyTitle ? t('site-title-story', { storyTitle }) : undefined
  const description = storyDescription ? storyDescription : undefined
  const images = storyImage ?? undefined
  const urlPath = `/story/${storyId}`
  const other = {
    'dable:item_id': storyId,
    'article:section': storyCategory,
    'article:published_time': storyPublishTime,
  }

  return getSiteMedadata(t, {
    title,
    description,
    images,
    urlPath,
    other,
  })
}

export default async function StoryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const storyId = params.id
  const storyData = await getStory({ storyId })
  if (!storyData) notFound()

  const storyType = storyData.story_type === 'story' ? 'story' : 'podcast'
  return (
    <StoryInteractionsWrapper storyId={storyId}>
      <CommentWrapper story={storyData}>
        <ClientLayout story={storyData} storyType={storyType}>
          {children}
        </ClientLayout>
      </CommentWrapper>
    </StoryInteractionsWrapper>
  )
}
