import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCollection } from '@/app/actions/collection'
import { CommentProvider } from '@/context/comment'
import { CommentObjective } from '@/types/objective'
import { getSiteMedadata } from '@/utils/site-meta'

import ClientLayout from './_components/client-layout'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const collectionId = params.id
  const collectionData = await getCollection({
    collectionId,
  })

  const collection = collectionData?.collections?.[0]
  const collectionTitle = collection?.title
  const collectionDescription = collection?.summary
  const collectionImageInfo = {
    url: collection?.heroImage?.resized?.original ?? '',
    width: collection?.heroImage?.file?.width,
    height: collection?.heroImage?.file?.height,
  }

  const title = collectionTitle ? `集錦 | ${collectionTitle}` : '集錦'
  const description = collectionDescription ?? undefined
  const images = collectionImageInfo
  const urlPath = `/collection/${collectionId}`

  return getSiteMedadata({
    title,
    description,
    images,
    urlPath,
  })
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
