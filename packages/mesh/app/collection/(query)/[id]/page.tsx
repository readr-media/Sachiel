import { notFound } from 'next/navigation'

import { getCollection, getCollectionStories } from '@/app/actions/collection'
import MisoPageView from '@/components/miso-page-view'

import CollectionCard from './_components/collection-card'
import NotExist from './_components/not-exist'
import CollectionArticleList from './collection-article-list'

export default async function CollectionPage({
  params: { id: collectionId },
}: {
  params: { id: string }
}) {
  const collectionData = await getCollection({ collectionId })
  const collection = collectionData?.collections?.[0]

  if (!collection) notFound()

  if (collection.status === 'delete') return <NotExist />

  const collectionStoriesData = await getCollectionStories({
    collectionId,
    creatorCustomId: collection.creator?.customId ?? '',
  })

  const collectionPicks =
    collectionStoriesData?.collections?.[0].collectionpicks ?? []

  return (
    <main className="flex grow flex-col">
      <MisoPageView productIds={`profile_collection_${collectionId}`} />
      <CollectionCard collection={collection} />
      <CollectionArticleList
        items={collectionPicks ?? []}
        avatar={collection.creator?.avatar ?? ''}
      />
    </main>
  )
}
