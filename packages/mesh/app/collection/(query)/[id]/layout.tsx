import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import { getCollection } from '@/app/actions/collection'
import { metadata as rootMetadata } from '@/app/layout'
import { SITE_DESCRIPTION, SITE_URL } from '@/constants/config'
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
  const collectionId = params.id

  const collectionData = await getCollection({
    collectionId,
  })

  const previousImages = (await parent).openGraph?.images || []

  const collection = collectionData?.collections?.[0]
  const collectionTitle = collection?.title
  const collectionDescription = collection?.summary
  const collectionImageInfo = {
    url: collection?.heroImage?.resized?.original ?? '',
    width: collection?.heroImage?.file?.width,
    height: collection?.heroImage?.file?.height,
  }

  const metaTitle = collectionTitle ? `集錦 | ${collectionTitle}` : '集錦'
  const metaDescription = collectionDescription || SITE_DESCRIPTION
  const metaImages = [collectionImageInfo, ...previousImages]
  return {
    ...rootMetadata,
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      ...rootMetadata.openGraph,
      url: SITE_URL + `/collection/${collectionId}`,
      title: metaTitle,
      description: metaDescription,
      images: metaImages,
    },
  }
}

export default async function CollectionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const collectionId = params.id

  const collectionData = await getCollection({
    collectionId,
  })

  if (!collectionData || !collectionData?.collections?.[0]) notFound()

  const collection = collectionData.collections[0]

  return (
    <CommentProvider
      initialComments={collection.comments ?? []}
      initialCommentsCount={collection.commentsCount ?? 0}
      commentObjectiveData={collection}
      commentObjective={CommentObjective.Collection}
    >
      <ClientLayout collection={collection}>{children}</ClientLayout>
    </CommentProvider>
  )
}
