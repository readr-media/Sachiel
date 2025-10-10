import { notFound } from 'next/navigation'

import { getCollection, getCollectionStories } from '@/app/actions/collection'
import MisoPageView from '@/components/miso-page-view'

export const dynamic = 'force-dynamic'

import ArticleCardList from './_components/article-card-list'
import CollectionCard from './_components/collection-card'
import NotExist from './_components/not-exist'

export function generateStaticParams() {
  return [{ lng: 'zh-TW' }, { lng: 'en-US' }]
}

export default async function CollectionPage({
  params: { id: collectionId },
}: {
  params: { id: string; lng: string }
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
      <ArticleCardList
        items={collectionPicks ?? []}
        emptyMessage={'從精選新聞或書籤中\n將數篇新聞打包成集錦'}
        avatar={collection.creator?.avatar ?? ''}
      />
    </main>
  )
}
