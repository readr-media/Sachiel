import Drawer from '@/app/_components/drawer'
import { MISO_SEARCH_SORT_OPTIONS } from '@/constants/miso'

type SortDrawerProps = {
  isOpen: boolean
  onClose: () => void
  onSortChange: (sortValue: 'relevance' | 'published_at') => void
}

export default function SortDrawer({
  isOpen,
  onClose,
  onSortChange,
}: SortDrawerProps) {
  return (
    <Drawer
      className="sm:hidden"
      isOpen={isOpen}
      onClose={onClose}
      position={'bottom'}
      size={'fit'}
    >
      <div className="z-10 flex flex-col gap-y-6 px-5 py-4">
        <span className="button text-primary-500">排序依</span>
        <ul className="flex flex-col gap-4">
          {MISO_SEARCH_SORT_OPTIONS.map(({ value, label }) => (
            <li
              key={value}
              className="cursor-pointer"
              onClick={() => onSortChange(value)}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  )
}
