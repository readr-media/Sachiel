import ArticleCard from '@/app/profile/_components/article-card'
import type {
  Bookmarks,
  PickList,
  PickListItem,
  StoryData,
  StoryDataItem,
} from '@/types/profile'

interface ArticleCardListProps {
  items: StoryData | PickList | Bookmarks
  emptyMessage: string
  memberId?: string
  avatar?: string
  name?: string
  shouldShowComment: boolean
}

function ArticleCardList({
  items,
  shouldShowComment,
  emptyMessage,
  memberId,
  avatar,
  name,
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
      <ul className="max-w-[theme(width.maxMain)] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:p-10 lg:grid-cols-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li
              key={index}
              className="relative w-full bg-white md:h-full md:rounded-md md:drop-shadow"
            >
              {'story' in item ? (
                <ArticleCard
                  storyData={item.story as NonNullable<PickListItem>}
                  isLast={isLast}
                  memberId={memberId}
                  avatar={avatar}
                  name={name}
                  shouldShowComment={shouldShowComment}
                />
              ) : (
                <ArticleCard
                  storyData={item as StoryDataItem}
                  isLast={isLast}
                  shouldShowComment={shouldShowComment}
                />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ArticleCardList
