import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

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
  const t = await getTranslations('Others.meta')
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

  const title = collectionTitle
    ? t('site-title-collection', { collectionTitle })
    : t('site-title-collection-fallback')
  const description = collectionDescription ?? undefined
  const images = collectionImageInfo
  const urlPath = `/collection/${collectionId}`

  return getSiteMedadata(t, {
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
