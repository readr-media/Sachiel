import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { getStory } from '@/app/actions/story'
import { metadata as rootMetadata } from '@/app/layout'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/constants/config'
import { CommentProvider } from '@/context/comment'
import { CommentObjective } from '@/types/objective'

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

  const previousImages = (await parent).openGraph?.images || []

  const story = storyData?.story
  const storyTitle = story?.title
  const storyDescription = story?.summary
  const storyImage = story?.og_image ?? ''
  const storyCategory = story?.category?.title ?? ''
  const storyPublishTime = story?.published_date ?? ''

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
      item_id: storyId,
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

  if (!storyData || !storyData?.story) {
    notFound()
  }

  return (
    <CommentProvider
      initialComments={storyData.story?.comments || []}
      commentsCount={storyData.story.commentsCount ?? 0}
      commentObjectiveData={storyData.story}
      commentObjective={CommentObjective.Story}
    >
      <ClientLayout story={storyData.story}>{children}</ClientLayout>
    </CommentProvider>
  )
}
