import { useTranslations } from 'next-intl'

import { type SearchResults } from '@/utils/data-schema'

import CarouselWrapper from './carousel-wrapper'
import CollectionCard from './collection-card'
import StoryCard from './story-card'

export default function StoryAndCollection({
  query,
  storyResult,
  collectionResult,
}: {
  query: string
  storyResult: SearchResults['story']
  collectionResult: SearchResults['collection']
}) {
  const t = useTranslations('Pages.Search')
  const isNoResult = !storyResult.length && !collectionResult.length

  return (
    <>
      {collectionResult.length ? (
        <>
          <div className="xl:hidden">
            <div className="flex flex-row items-center justify-between">
              <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">
                {t('StoryAndCollection-all-collections')}
              </h2>
            </div>
            <div className="flex w-full flex-row gap-3 overflow-auto">
              {collectionResult.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
          <div className="hidden xl:block">
            <CarouselWrapper collections={collectionResult} />
          </div>
        </>
      ) : null}
      {storyResult.length ? (
        <>
          <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">
            {t('StoryAndCollection-all-stories')}
          </h2>
          {storyResult.map((story, idx) => (
            <StoryCard
              key={story.id}
              story={story}
              extra={idx === 0 ? 'pt-0 pb-5' : 'py-5'}
            />
          ))}
        </>
      ) : null}
      {isNoResult ? (
        <p className="pt-3 text-primary-500 sm:pt-5">
          {t('StoryAndCollection-cant-find-keyword-1')}
          <span className="text-primary-700">{query}</span>
          {t('StoryAndCollection-cant-find-keyword-2')}
        </p>
      ) : null}
    </>
  )
}
