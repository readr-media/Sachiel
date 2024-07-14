import { type TabCategory } from '@/types/tab'

interface GenericCardListProps<CardItemType> {
  items: CardItemType[]
  renderItem: (
    item: CardItemType,
    index: number,
    isLast: boolean
  ) => React.ReactNode
  userType: string
  category?: TabCategory
  emptyMessage: string
}

function ArticleCardList<CardItemType>({
  items,
  renderItem,
  emptyMessage,
}: GenericCardListProps<CardItemType>) {
  if (!items?.length) {
    return (
      <div className="flex grow flex-col">
        <section className="flex h-full grow items-center justify-center whitespace-pre bg-primary-700-dark text-center text-base text-primary-400 sm:min-h-full">
          <p className="my-10 w-full">{emptyMessage}</p>
        </section>
      </div>
    )
  }

  return (
    <ul className="max-w-[1120px] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:p-10 lg:grid-cols-3">
      {items.map((item, index) => (
        <li
          key={index}
          className="relative w-full bg-white md:h-full md:rounded-md md:drop-shadow"
        >
          {renderItem(item, index, index === items.length - 1)}
        </li>
      ))}
    </ul>
  )
}

export default ArticleCardList
