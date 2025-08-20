import { useState } from 'react'

import Icon from '@/components/icon'
import { type SearchResults } from '@/utils/data-schema'

import CollectionCard from './collection-card'

export default function CarouselWrapper({
  collections,
}: {
  collections: SearchResults['collection']
}) {
  const [hoveredButton, setHoveredButton] = useState<'prev' | 'next' | null>(
    null
  )
  const [startIndex, setStartIndex] = useState(0)
  const items = collections || []
  const itemsPerPage = 5
  const isNextDisabled = startIndex + itemsPerPage >= items.length
  const isPrevDisabled = startIndex === 0

  const handlePrev = () => {
    if (!isPrevDisabled) {
      setStartIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  const handleNext = () => {
    if (!isNextDisabled) {
      setStartIndex((prev) => Math.min(prev + 1, items.length - itemsPerPage))
    }
  }

  const handleMouseEnter = (button: 'prev' | 'next') => {
    setHoveredButton(button)
  }

  const handleMouseLeave = () => {
    setHoveredButton(null)
  }

  return (
    <>
      {collections?.length ? (
        <>
          <div className="flex max-w-[1040px] flex-row items-center justify-between">
            <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">所有集錦</h2>
            <div className="inline-flex items-center">
              <button
                disabled={isPrevDisabled}
                aria-disabled={isPrevDisabled}
                aria-label="previous"
                onClick={handlePrev}
                onMouseEnter={() => handleMouseEnter('prev')}
                onMouseLeave={handleMouseLeave}
              >
                <Icon
                  size="xl"
                  iconName={
                    isPrevDisabled
                      ? 'icon-chevron-left-disable'
                      : hoveredButton === 'prev'
                      ? 'icon-chevron-left-hover'
                      : 'icon-chevron-left'
                  }
                />
              </button>
              <button
                disabled={isNextDisabled}
                aria-label="next"
                aria-disabled={isNextDisabled}
                onClick={handleNext}
                onMouseEnter={() => handleMouseEnter('next')}
                onMouseLeave={handleMouseLeave}
              >
                <Icon
                  size="xl"
                  iconName={
                    isNextDisabled
                      ? 'icon-chevron-right-disable'
                      : hoveredButton === 'next'
                      ? 'icon-chevron-right-hover'
                      : 'icon-chevron-right'
                  }
                />
              </button>
            </div>
          </div>
          <div className="max-w-[1040px] overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * 212}px)`,
              }}
            >
              {items.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
