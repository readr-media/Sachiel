import NextLink from 'next/link'
import { Fragment, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'

import useSearchSuggestion from '@/hooks/use-search-suggestion'

import Icon from './icon'
import Avatar from './story-card/avatar'

export default function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    searchText,
    searchSuggestion,
    recentSearch,
    handleSearchTextChange,
    handleRemoveRecentSearch,
    handleClickSearch,
  } = useSearchSuggestion(inputRef)
  const activeRender = useMemo(() => {
    if (searchSuggestion) return 'suggestion'
    if (recentSearch.length > 0) return 'recent'
    return null
  }, [recentSearch.length, searchSuggestion])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-modal sm:hidden">
      <div
        className="size-full bg-multi-layer-light"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center border-b-[0.5px] bg-white px-5 py-[10px]">
          <button className="shrink-0" onClick={onClose}>
            <Icon size="m" iconName="icon-chevron-left-hover" />
          </button>
          <div className="ml-5 flex w-full flex-row items-center rounded bg-multi-layer-light">
            <div className="p-2">
              <Icon size="l" iconName="icon-search-bar" />
            </div>
            <input
              aria-label="search"
              type="text"
              inputMode="text"
              value={searchText}
              onChange={handleSearchTextChange}
              className="grow bg-transparent p-2"
              ref={inputRef}
              autoFocus
            />
          </div>
        </div>
        {activeRender === 'recent' && (
          <div className="h-[calc(100vh-60px)] bg-white">
            <p className="list-title px-5 pb-1 pt-4">搜尋歷史</p>
            <ul className="h-[calc(100vh-112px)] overflow-y-auto">
              {recentSearch.map((record, index) => (
                <Fragment key={index}>
                  <li
                    className="flex flex-row p-5"
                    onClick={() => handleClickSearch(record)}
                  >
                    <p className="subtitle-1 mr-auto">{record}</p>
                    <button
                      onClick={(e) => handleRemoveRecentSearch(e, record)}
                    >
                      <Icon iconName="icon-remove" size="m" />
                    </button>
                  </li>
                  <div className="mx-5 border-b-[0.5px]"></div>
                </Fragment>
              ))}
            </ul>
          </div>
        )}
        {activeRender === 'suggestion' && (
          <ul className="h-[calc(100vh-60px)] bg-white">
            <li
              className="flex flex-row items-center px-5 py-[10px]"
              onClick={() => handleClickSearch()}
            >
              <div className="flex size-11 items-center justify-center">
                <Icon size="l" iconName="icon-search-bar" />
              </div>
              <p className="subtitle-1 pl-3">{searchText}</p>
            </li>
            <div className="mx-5 border-b-[0.5px]"></div>
            {searchSuggestion?.map((m, index) => (
              <Fragment key={index}>
                <li
                  className={`px-5 py-[10px] hover:bg-primary-100 ${
                    index === searchSuggestion.length - 1 ? 'rounded-b-md' : '`'
                  }`}
                >
                  <NextLink
                    href={`/profile/member/${m.customId}`}
                    className="flex flex-row items-center"
                  >
                    <Avatar src={m.avatar ?? ''} size="l" />
                    <p className="subtitle-1 pl-3">{m.name}</p>
                  </NextLink>
                </li>
                <div className="mx-5 border-b-[0.5px]"></div>
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>,
    document.body
  )
}
