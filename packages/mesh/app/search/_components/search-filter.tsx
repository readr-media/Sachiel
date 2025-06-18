'use client'

import { useState } from 'react'

import { type SearchResults } from '@/utils/data-schema'

import MemberAndPublisher from './member-and-publisher'
import StoryAndCollection from './story-and-collection'

type filterType = {
  id: 'story' | 'collection' | 'member-publisher'
  name: string
}
const filters: filterType[] = [
  {
    id: 'story',
    name: '新聞',
  },
  {
    id: 'collection',
    name: '集錦',
  },
  {
    id: 'member-publisher',
    name: '個人檔案',
  },
]

export default function SearchFilter({
  query,
  results,
}: {
  query: string
  results: SearchResults
}) {
  const [activeFilter, setActiveFilter] = useState<filterType['id']>(
    filters[0].id
  )

  return (
    <>
      <div className="flex justify-between border-b-[0.5px] border-primary-400 sm:justify-start sm:gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className="flex flex-1 justify-center sm:flex-none"
            onClick={() => setActiveFilter(filter.id)}
          >
            <span
              className={`flex h-12 items-center justify-center border-b px-[14px] sm:px-8 ${
                activeFilter === filter.id
                  ? 'border-primary-700 text-primary-700'
                  : 'border-transparent text-primary-400'
              }`}
            >
              {filter.name}
            </span>
          </button>
        ))}
      </div>
      <section className="px-5 xl:px-10">
        {activeFilter === 'story' ? (
          <StoryAndCollection
            query={query}
            storyResult={results.story}
            collectionResult={results.collection}
          />
        ) : (
          <MemberAndPublisher
            query={query}
            memberResult={results.member}
            publisherResult={results.publisher}
          />
        )}
      </section>
    </>
  )
}
