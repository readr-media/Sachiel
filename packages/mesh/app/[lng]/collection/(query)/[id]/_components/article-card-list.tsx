import type { CollectionPick } from '../../_types/collection'
import ArticleCard from './article-card'

interface ArticleCardListProps {
  items: CollectionPick[]
  emptyMessage: string
  avatar?: string
}

function ArticleCardList({
  items,
  emptyMessage,
  avatar,
}: ArticleCardListProps) {
  if (!items?.length) {
    return (
      <div className="flex grow flex-col">
        <section className="flex h-full max-w-[theme(width.maxMain)] grow items-center justify-center whitespace-pre bg-primary-700-dark text-center text-base text-primary-400 sm:min-h-full">
          <p className="my-10 w-full">{emptyMessage}</p>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-multi-layer-light">
      <ul className="max-w-[theme(width.maxMain)] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:px-[70px] md:py-10 lg:grid-cols-3 lg:px-10 xxl:pt-[70px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          if (!item.story) return null
          return (
            <li
              key={index}
              className="relative w-full bg-white md:h-full md:rounded-md md:drop-shadow"
            >
              <ArticleCard story={item.story} isLast={isLast} avatar={avatar} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ArticleCardList
