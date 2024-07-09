import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'
import { type TabCategory } from '@/types/tab'

import ArticleCard from './article-card'

type picksData = NonNullable<GetMemberProfileQuery['member']>['picks']
type bookmarkData = NonNullable<GetMemberProfileQuery['member']>['books']
type ArticleCardListProps = {
  showData: picksData | bookmarkData
  id?: string
  avatar: string
  userType: string
  category: TabCategory
}
const ArticleCardList = ({
  showData,
  id,
  avatar,
  userType,
  category,
}: ArticleCardListProps) => {
  const messages: { [key: string]: string } = {
    member_PICKS: '這裡還空空的\n趕緊將喜愛的新聞加入精選吧',
    member_BOOKMARKS: '沒有已儲存的書籤',
    visitor_PICKS: '這個人還沒有精選新聞',
    publisher_PUBLISH: '這個媒體還沒有發佈任何新聞',
  }

  const getMessage = (userType: string, category: TabCategory): string => {
    const key = `${userType}_${category}`
    return messages[key] || ''
  }

  if (!showData?.length)
    return (
      <div className="flex grow flex-col">
        <section className="flex h-full grow items-center justify-center whitespace-pre bg-primary-700-dark  text-center text-base text-primary-400 sm:min-h-full">
          <p className="my-10 w-full">{getMessage(userType, category)}</p>
        </section>
      </div>
    )
  return (
    <>
      <ul className="max-w-[1120px] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:p-10 lg:grid-cols-3">
        {showData.map((pick, idx) => {
          if (!pick.story) return
          return (
            <li
              key={pick?.story?.id}
              className="relative w-full bg-white md:h-full md:rounded-md md:shadow-[0_2px_2px_0px_rgba(0,9,40,0.1)]"
            >
              <ArticleCard
                data={pick.story}
                isLast={idx === showData.length - 1}
                id={id}
                avatar={avatar}
                category={category}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ArticleCardList
