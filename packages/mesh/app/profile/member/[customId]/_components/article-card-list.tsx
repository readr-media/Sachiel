import ArticleCard from '@/app/profile/_components/article-card'
import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'
import { type TabCategory } from '@/types/tab'

type picksData = NonNullable<GetMemberProfileQuery['member']>['picks']
type bookmarkData = NonNullable<GetMemberProfileQuery['member']>['books']
type ArticleCardListProps = {
  picksOrBookmarks: picksData | bookmarkData
  memeberId: string
  avatar: string
  userType: string
  category: TabCategory
  name?: string
}
const ArticleCardList = ({
  picksOrBookmarks,
  memeberId,
  avatar,
  userType,
  category,
  name,
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

  if (!picksOrBookmarks?.length)
    return (
      <div className="flex grow flex-col">
        <section className="flex h-full grow items-center justify-center whitespace-pre bg-primary-700-dark  text-center text-base text-primary-400 sm:min-h-full">
          <p className="my-10 w-full">{getMessage(userType, category)}</p>
        </section>
      </div>
    )
  return (
    <>
      {/* TODO: comment to remind adding infinite-scroll in the future */}
      <ul className="max-w-[1120px] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:p-10 lg:grid-cols-3">
        {picksOrBookmarks.map((pick, idx) => {
          if (!pick.story) return
          return (
            <li
              key={pick?.story?.id}
              className="relative w-full bg-white md:h-full md:rounded-md md:drop-shadow"
            >
              <ArticleCard
                data={pick.story}
                isLast={idx === picksOrBookmarks.length - 1}
                memberId={memeberId}
                avatar={avatar}
                category={category}
                name={name}
                userType={userType}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ArticleCardList
