import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getCollection, getCollectionStories } from '@/app/actions/collection'

import ArticleCardList from './_components/article-card-list'
import CollectionCard from './_components/collection-card'
import NotExist from './_components/not-exist'

export default async function CollectionPage({
  params: { id: collectionId },
}: {
  params: { id: string }
}) {
  const t = await getTranslations('Pages.Collection')
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
      <CollectionCard collection={collection} />
      <ArticleCardList
        items={collectionPicks ?? []}
        emptyMessage={t('ArticleCardList-empty-message')}
        avatar={collection.creator?.avatar ?? ''}
      />
    </main>
  )
}
