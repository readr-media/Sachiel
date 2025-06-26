import 'swiper/css'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { PickCollections } from '@/types/profile'

import CollectionsCarouselElement from './collections-carousel-element'
type CollectionsCarouselProps = {
  pickCollections: PickCollections
}
import { FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'

import Icon from '@/components/icon'

const CollectionsCarousel = ({ pickCollections }: CollectionsCarouselProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [isPrevHovered, setIsPrevHovered] = useState(false)
  const [isNextHovered, setIsNextHovered] = useState(false)
  const getPrevIconName = () => {
    if (isBeginning) return 'icon-chevron-left-disable'
    return isPrevHovered ? 'icon-chevron-left-hover' : 'icon-chevron-left'
  }

  const getNextIconName = () => {
    if (isEnd) return 'icon-chevron-right-disable'
    return isNextHovered ? 'icon-chevron-right-hover' : 'icon-chevron-right'
  }
  const updateNavigationState = () => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning)
      setIsEnd(swiperInstance.isEnd)
    }
  }
  return (
    <>
      <section className="flex items-center justify-between bg-white md:bg-primary-700-dark md:p-10 md:px-[70px] md:pb-1 lg:px-10">
        <p className="list-title px-5 pt-4 text-primary-700 md:p-0">精選集錦</p>
        <div className="hidden items-center md:flex md:gap-1">
          <button
            onClick={() => swiperInstance?.slidePrev()}
            disabled={isBeginning}
            onMouseEnter={() => setIsPrevHovered(true)}
            onMouseLeave={() => setIsPrevHovered(false)}
            className="transition-opacity hover:opacity-80 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <Icon size="xl" iconName={getPrevIconName()} />
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            disabled={isEnd}
            onMouseEnter={() => setIsNextHovered(true)}
            onMouseLeave={() => setIsNextHovered(false)}
            className="transition-opacity hover:opacity-80 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <Icon size="xl" iconName={getNextIconName()} />
          </button>
        </div>
      </section>
      <div className="flex h-fit w-full flex-col justify-center bg-white pl-5 pt-3 sm:px-5 md:bg-primary-700-dark md:px-[70px] lg:px-10">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          className="flex w-full md:!pb-4"
          onSlideChange={() => updateNavigationState()}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper)
            updateNavigationState()
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          modules={[FreeMode]}
          breakpoints={{
            // Mobile and tablet
            0: {
              slidesPerView: 'auto',
              spaceBetween: 12,
              freeMode: true,
            },
            // Desktop
            960: {
              slidesPerView: 4,
              spaceBetween: 20,
              freeMode: false,
              slidesPerGroup: 4,
            },
          }}
        >
          {pickCollections?.map((data, index) => (
            <SwiperSlide
              key={index}
              className="!h-auto !w-auto md:!w-1/5 md:!max-w-[150px] md:drop-shadow lg:!w-1/5 lg:!max-w-[164px]" // This is important for proper sizing
            >
              <CollectionsCarouselElement data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default CollectionsCarousel
