import { useTranslations } from 'next-intl'
import { useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'

import type { UseCollection } from '../_types/collection'
import Checkbox from './checkbox'

export default function StoryFilter({
  useCollection,
}: {
  useCollection: UseCollection
}) {
  const t = useTranslations('Pages.Collection')
  const [showFilter, setShowFilter] = useState(false)

  const { pickCandidates, bookmarkCandidates } = useCollection()

  const closeFilter = () => {
    setShowFilter(false)
  }

  const filterTitle = (() => {
    if (pickCandidates.usedAsFilter && bookmarkCandidates.usedAsFilter) {
      return t('StoryFilter-pick-and-bookmark')
    } else if (pickCandidates.usedAsFilter) {
      return t('StoryFilter-pick')
    } else if (bookmarkCandidates.usedAsFilter) {
      return t('StoryFilter-bookmark')
    } else {
      return ''
    }
  })()

  return (
    <>
      <div className="list-title sm:title-1 pb-3 pt-4 text-primary-700 sm:pt-5">
        <button
          className="flex items-center gap-1"
          onClick={() => {
            setShowFilter(!showFilter)
          }}
        >
          <span>{filterTitle}</span>
          <Icon
            iconName="icon-expand"
            size="l"
            className={showFilter ? 'hidden' : ''}
          />
          <Icon
            iconName="icon-fold"
            size="l"
            className={showFilter ? '' : 'hidden'}
          />
        </button>
      </div>
      {showFilter && (
        <Filter onClose={closeFilter} useCollection={useCollection} />
      )}
    </>
  )
}

const Filter = ({
  onClose,
  useCollection,
}: {
  onClose: () => void
  useCollection: UseCollection
}) => {
  return (
    <>
      <DestktopFilter useCollection={useCollection} />
      <MobileFilter onClose={onClose} useCollection={useCollection} />
    </>
  )
}

const DestktopFilter = ({
  useCollection,
}: {
  useCollection: UseCollection
}) => {
  const t = useTranslations('Pages.Collection')
  const [showError, setShowError] = useState(false)

  const {
    pickCandidates,
    bookmarkCandidates,
    setPickCandidates,
    setBookmarkCandidates,
  } = useCollection()
  const isPickSelected = pickCandidates.usedAsFilter
  const isBookmarkSelected = bookmarkCandidates.usedAsFilter

  return (
    <div className="mb-3 hidden sm:block">
      <div className="flex gap-5 border-t border-[rgba(0,9,40,0.1)] pt-2">
        <button
          className="flex"
          onClick={() => {
            if (isPickSelected && !isBookmarkSelected) {
              setShowError(true)
              return
            }
            setPickCandidates((oldVal) => ({
              ...oldVal,
              usedAsFilter: !isPickSelected,
            }))
            setShowError(false)
          }}
        >
          <Checkbox isChecked={isPickSelected} />
          <span className="body-2 text-primary-500">
            {t('StoryFilter-check-pick')}
          </span>
        </button>
        <button
          className="flex"
          onClick={() => {
            if (isBookmarkSelected && !isPickSelected) {
              setShowError(true)
              return
            }
            setBookmarkCandidates((oldVal) => ({
              ...oldVal,
              usedAsFilter: !isBookmarkSelected,
            }))
            setShowError(false)
          }}
        >
          <Checkbox isChecked={isBookmarkSelected} />
          <span className="body-2 text-primary-500">
            {t('StoryFilter-check-bookmark')}
          </span>
        </button>
      </div>
      {showError && (
        <div className="body-3 mt-2 text-custom-red">
          {t('StoryFilter-pick-one')}
        </div>
      )}
    </div>
  )
}

const MobileFilter = ({
  onClose,
  useCollection,
}: {
  onClose: () => void
  useCollection: UseCollection
}) => {
  const t = useTranslations('Pages.Collection')
  const {
    pickCandidates,
    bookmarkCandidates,
    setPickCandidates,
    setBookmarkCandidates,
  } = useCollection()

  const [isPickSelected, setIsPickSelected] = useState(
    pickCandidates.usedAsFilter
  )
  const [isBookmarkSelected, setIsBookmarkSelected] = useState(
    bookmarkCandidates.usedAsFilter
  )

  const disableFilter = !isPickSelected && !isBookmarkSelected

  const onFilter = () => {
    setPickCandidates({
      ...pickCandidates,
      usedAsFilter: isPickSelected,
    })
    setBookmarkCandidates({
      ...bookmarkCandidates,
      usedAsFilter: isBookmarkSelected,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-modal bg-black/30 sm:hidden"
      onClick={onClose}
    >
      <div
        className="absolute inset-x-0 bottom-0 bg-white"
        onClick={(evt) => {
          evt.stopPropagation()
        }}
      >
        <div className="list-title flex items-center justify-center border-b border-[rgba(0,9,40,0.1)] py-[14px] text-primary-800">
          {t('StoryFilter-filter')}
        </div>
        <div className="flex flex-col gap-6 border-b border-[rgba(0,9,40,0.1)] px-5 py-4">
          <div className="footnote text-primary-500">
            {t('StoryFilter-story-source')}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="flex gap-1"
              onClick={() => {
                setIsPickSelected(!isPickSelected)
              }}
            >
              <Checkbox isChecked={isPickSelected} />
              <span className="body-2 text-primary-500">
                {t('StoryFilter-check-pick')}
              </span>
            </button>
            <button
              className="flex gap-1"
              onClick={() => {
                setIsBookmarkSelected(!isBookmarkSelected)
              }}
            >
              <Checkbox isChecked={isBookmarkSelected} />
              <span className="body-2 text-primary-500">
                {t('StoryFilter-check-bookmark')}
              </span>
            </button>
          </div>
        </div>
        <div className="px-5 py-3">
          <Button
            onClick={onFilter}
            size="lg"
            color="primary"
            text={
              disableFilter
                ? t('StoryFilter-pick-one')
                : t('StoryFilter-filter')
            }
            disabled={disableFilter}
          />
        </div>
      </div>
    </div>
  )
}
