import { useParams, useRouter } from 'next/navigation'
import {
  type ChangeEvent,
  type MouseEvent,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { search } from '@/app/actions/search'
import { type SearchResults } from '@/utils/data-schema'
import { getSearchUrl } from '@/utils/get-url'
import { debounce } from '@/utils/performance'

const recentSearchMax = 20
const searchSuggestionMax = 7

export default function useSearchSuggestion(
  inputRef: RefObject<HTMLInputElement>
) {
  const router = useRouter()
  const params = useParams()
  const lng = (params.lng as string) || 'zh-TW'
  const [searchText, setSearchText] = useState('')
  const [searchSuggestion, setSearchSuggestion] = useState<
    SearchResults['member'] | null
  >(null)
  const [recentSearch, setRecentSearch] = useState<string[]>(getRecentSearch)

  useEffect(() => {
    if (!searchText.trim()) {
      setSearchSuggestion(null)
    }
  }, [searchText])

  const fetchSuggestions = useCallback(
    async (query: string, searchSuggestionMax: number) => {
      if (!query) return null
      const data = await search(query, ['member'])
      if (data && data.member) {
        return data.member.slice(0, searchSuggestionMax)
      }
      return null
    },
    []
  )

  const debouncedFetch = useMemo(
    () =>
      debounce(async (query: string) => {
        const suggestions = await fetchSuggestions(query, searchSuggestionMax)
        if (suggestions) {
          setSearchSuggestion(suggestions)
        }
      }, 500),
    [fetchSuggestions]
  )

  const handleSearchTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const trimmedValue = value.trim()
      setSearchText(value)
      debouncedFetch(trimmedValue)
    },
    [debouncedFetch]
  )

  const handleClickSearch = useCallback(
    (recentSearchText?: string) => {
      if (recentSearchText) {
        router.push(getSearchUrl(recentSearchText, lng))
      } else {
        if (!searchText) return
        setRecentSearch((prev) =>
          updateRecentSearch('add', recentSearchMax, searchText, prev)
        )
        router.push(getSearchUrl(searchText, lng))
      }
    },
    [router, searchText, lng]
  )

  const handleRemoveRecentSearch = useCallback(
    (e: MouseEvent, selectedItem: string) => {
      e.stopPropagation()
      setRecentSearch((prev) =>
        updateRecentSearch('remove', recentSearchMax, selectedItem, prev)
      )
      inputRef.current?.focus()
    },
    [inputRef]
  )

  return {
    searchText,
    searchSuggestion,
    recentSearch,
    handleSearchTextChange,
    handleRemoveRecentSearch,
    handleClickSearch,
  }
}

const getRecentSearch = () => {
  const storedSearches = localStorage.getItem('recent-search')
  try {
    return storedSearches ? JSON.parse(storedSearches) : []
  } catch (error) {
    console.error('Failed to parse recent searches from localStorage:', error)
    localStorage.removeItem('recent-search')
    return []
  }
}

const updateRecentSearch = (
  action: 'add' | 'remove',
  recentSearchMax: number,
  query: string,
  prev: string[]
) => {
  let updated = [...prev]
  if (action === 'remove') {
    updated = updated.filter((item) => item !== query)
  } else if (action === 'add' && query) {
    updated = [query, ...updated.filter((item) => item !== query)]
  }
  updated = updated.slice(0, recentSearchMax)
  localStorage.setItem('recent-search', JSON.stringify(updated))
  return updated
}
