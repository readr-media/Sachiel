import { fetchMostLikedComment } from '@/app/actions/get-homepage'

import MostLikedCommentCard from './card'

export default async function MostLikedCommentSection() {
  const data = await fetchMostLikedComment()
  if (!data) return null

  return (
    <section className="px-5 py-4 md:px-[70px] lg:px-10 lg:pb-10 lg:pt-8 xl:pt-[26px] xxl:pt-8">
      <h2 className="list-title lg:title-1 mb-3 text-primary-700 lg:mb-4 xl:mb-[22px] xxl:mb-4">
        獲得最多愛心的留言
      </h2>
      <div className="flex flex-col gap-y-5 lg:grid lg:grid-cols-2 lg:gap-x-5">
        {data.map((comment, index) => (
          <MostLikedCommentCard
            comment={comment}
            rank={index + 1}
            key={comment.id}
          />
        ))}
      </div>
    </section>
  )
}
