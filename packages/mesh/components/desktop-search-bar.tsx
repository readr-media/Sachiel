'use client'

import NextLink from 'next/link'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import useSearchSuggestion from '@/hooks/use-search-suggestion'

import Icon from './icon'
import Avatar from './story-card/avatar'

export default function DesktopSearchBar({
  className = '',
}: {
  className?: string
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
  const [isFocused, setIsFocused] = useState(false)
  const preventBlurRef = useRef(false)
  const activeDropdown = useMemo(() => {
    if (!isFocused) return null
    if (searchSuggestion) return 'suggestion'
    if (recentSearch.length > 0) return 'recent'
    return null
  }, [isFocused, recentSearch.length, searchSuggestion])

  useEffect(() => {
    if (isFocused) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isFocused])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!inputRef.current) return

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()

        if (document.activeElement === inputRef.current) {
          inputRef.current.blur()
        } else {
          inputRef.current.focus()
        }
      }

      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current.blur()
      }
      if (e.key === 'Enter' && document.activeElement === inputRef.current) {
        e.preventDefault()
        handleClickSearch()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleClickSearch])

  return (
    <div
      className={twMerge(
        'relative flex bg-multi-layer-light sm:h-10 sm:w-80 sm:gap-1 sm:rounded-md sm:p-2 sm:pr-3',
        className
      )}
    >
      <label htmlFor="search" className="shrink-0 cursor-pointer">
        <Icon size="l" iconName="icon-search-bar" />
      </label>
      <input
        id="search"
        aria-label="search"
        type="text"
        className="button grow bg-transparent"
        value={searchText}
        onChange={handleSearchTextChange}
        onFocus={() => {
          if (!preventBlurRef.current) setIsFocused(true)
        }}
        onBlur={() => {
          if (!preventBlurRef.current) {
            setTimeout(() => setIsFocused(false), 200)
          }
        }}
        ref={inputRef}
        autoComplete="off"
      />
      {activeDropdown === 'recent' && (
        <div className="absolute left-0 top-full z-modal mt-1 w-full rounded-md bg-white shadow-md">
          <p className="list-title px-5 pb-3 pt-4">搜尋歷史</p>
          <ul className="max-h-[520px] overflow-y-auto">
            {recentSearch.map((record, index) => (
              <Fragment key={index}>
                <li
                  className={`flex cursor-pointer flex-row p-5 hover:bg-primary-100 ${
                    index === recentSearch.length - 1 ? 'rounded-b-md' : '`'
                  }`}
                  onMouseDown={() => {
                    preventBlurRef.current = true
                  }}
                  onMouseUp={() => {
                    preventBlurRef.current = false
                  }}
                  onClick={() => handleClickSearch(record)}
                >
                  <p className="subtitle-1 mr-auto">{record}</p>
                  <button onClick={(e) => handleRemoveRecentSearch(e, record)}>
                    <Icon iconName="icon-remove" size="m" />
                  </button>
                </li>
                <div className="mx-5 border-b-[0.5px]"></div>
              </Fragment>
            ))}
          </ul>
        </div>
      )}
      {activeDropdown === 'suggestion' && (
        <ul className="absolute left-0 top-full z-modal mt-1 w-full rounded-md bg-white shadow-md">
          <li
            className="flex cursor-pointer flex-row items-center rounded-t-md px-5 py-[10px] hover:bg-primary-100"
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
  )
}
