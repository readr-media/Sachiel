import { fetchMostLikedComment } from '@/app/actions/get-homepage'

import MostLikedCommentCard from './card'

export default async function MostLikedCommentSection() {
  const data = await fetchMostLikedComment()
  if (!data) return null

  return (
    <section className="px-5 pb-5 pt-8 md:px-[70px] lg:p-10">
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
