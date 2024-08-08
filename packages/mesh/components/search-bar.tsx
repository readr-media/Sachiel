import { twMerge } from 'tailwind-merge'

import Icon from './icon'

export default function SearchBar({ className = '' }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'flex bg-multi-layer-light sm:h-10 sm:w-80 sm:gap-1 sm:rounded-md sm:p-2 sm:pr-3',
        className
      )}
    >
      <label htmlFor="search" className="shrink-0 cursor-pointer">
        <Icon size="l" iconName="icon-search-bar" />
      </label>
      <input
        id="search"
        className="button grow bg-transparent"
        placeholder="搜尋所有新聞..."
      />
    </div>
  )
}
