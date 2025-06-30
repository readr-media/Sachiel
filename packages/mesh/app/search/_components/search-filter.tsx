'use client'

import type { SetStateAction } from 'react'
import type { Dispatch } from 'react'

import { type FilterType, MISO_SEARCH_FILTERS } from '@/constants/miso'

export default function SearchFilter({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: FilterType['id']
  setActiveFilter: Dispatch<SetStateAction<FilterType['id']>>
}) {
  return (
    <>
      <div className="flex justify-between border-b-[0.5px] border-primary-400 sm:justify-start sm:gap-2">
        {MISO_SEARCH_FILTERS.map((filter) => (
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
