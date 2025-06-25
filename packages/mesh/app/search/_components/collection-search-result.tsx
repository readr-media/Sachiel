import { type SearchResults } from '@/utils/data-schema'

import CollectionCard from './collection-card'

export default function CollectionSearchResult({
  query,
  collectionResult,
}: {
  query: string
  collectionResult: SearchResults['collection']
}) {
  const isNoResult = !collectionResult.length

  return (
    <>
      {collectionResult.length ? (
        <>
          <div className="grid grid-cols-2 gap-3 border-t-[0.5px] border-primary-100 pt-4 sm:grid-cols-4 xl:grid-cols-5 [&>*]:w-full">
            {collectionResult.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </>
      ) : null}
      {isNoResult ? (
        <p className="pt-3 text-primary-500 sm:pt-5">
          找不到包含「
          <span className="text-primary-700">{query}</span>
          」的集錦，請換個關鍵字，再試一次。
        </p>
      ) : null}
    </>
  )
}
