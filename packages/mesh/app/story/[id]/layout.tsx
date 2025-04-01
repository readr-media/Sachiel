import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { getStory } from '@/app/actions/story'
import { metadata as rootMetadata } from '@/app/layout'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/constants/config'
import { StoryInteractionsProvider } from '@/context/story-interactions'

import ClientLayout from './_components/client-layout'

export async function generateMetadata(
  {
    params,
  }: {
    params: { id: string }
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const storyId = params.id

  const storyData = await getStory({
    storyId,
  })

  if (!storyData) notFound()

  const previousImages = (await parent).openGraph?.images || []
  const storyTitle = storyData.title
  const storyDescription = storyData.summary
  const storyImage = storyData.og_image ?? ''
  const storyCategory = storyData.category?.title ?? ''
  const storyPublishTime = storyData.published_date ?? ''

  const metaTitle = storyTitle ? `${storyTitle} | ${SITE_TITLE}` : SITE_TITLE
  const metaDescription = storyDescription || SITE_DESCRIPTION
  const metaImages = [storyImage, ...previousImages]

  return {
    ...rootMetadata,
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      ...rootMetadata.openGraph,
      url: SITE_URL + `/story/${storyId}`,
      title: metaTitle,
      description: metaDescription,
      images: metaImages,
    },
    other: {
      'dable:item_id': storyId,
      'article:section': storyCategory,
      'article:published_time': storyPublishTime,
    },
  }
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
    <StoryInteractionsProvider storyId={storyId}>
      <ClientLayout story={storyData} storyType={storyType}>
        {children}
      </ClientLayout>
    </StoryInteractionsProvider>
  )
}
