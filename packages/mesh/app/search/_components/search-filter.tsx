'use client'

import type { SetStateAction } from 'react'
import type { Dispatch } from 'react'

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
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: filterType['id']
  setActiveFilter: Dispatch<SetStateAction<filterType['id']>>
}) {
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
    </>
  )
}
