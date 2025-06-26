import Icon from '@/components/icon'
import type { MISO_SEARCH_SORT_OPTIONS } from '@/constants/miso'

type ResultTotalProps = {
  query: string
  resultCount: number
  currentSortLabel: string
  toggleDrawer: () => void
  isDrawerOpen: boolean
  sortOptions: typeof MISO_SEARCH_SORT_OPTIONS
  handleSortChange: (
    sort: typeof MISO_SEARCH_SORT_OPTIONS[number]['value']
  ) => void
}

export default function ResultTotal({
  query,
  resultCount,
  currentSortLabel,
  isDrawerOpen,
  sortOptions,
  toggleDrawer,
  handleSortChange,
}: ResultTotalProps) {
  return (
    <div className="list-title text-primary-500">
      <p>
        <span className="text-primary-700">{query}</span>
        的搜尋結果：
      </p>
      <div className="flex items-center justify-between">
        <span className="body-3">
          {/* change to tab filter */}
          共有 {resultCount} 個結果
        </span>
        <div className="flex items-center gap-1">
          <span className="button text-primary-500">排序依</span>
          <div className="relative">
            {/* drawer觸發按鈕 */}
            <button
              onClick={toggleDrawer}
              className="button flex items-center gap-1 text-primary-500 transition-colors hover:text-primary-700"
            >
              <span className="button text-primary-700">
                {currentSortLabel}
              </span>
              <Icon
                iconName="icon-down-arrow"
                size="s"
                className={`text-primary-700 transition-transform duration-200 ${
                  isDrawerOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isDrawerOpen && (
              <ul className="absolute -right-2 top-8 hidden h-fit w-[180px] border bg-white py-2 sm:flex sm:flex-col">
                {sortOptions.map((option) => (
                  <li
                    className="button-large px-5 py-2 text-primary-700 transition-colors hover:bg-primary-200"
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
