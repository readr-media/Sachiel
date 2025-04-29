import { fetchMostLikedComment } from '@/app/actions/get-homepage'

import MostLikedCommentCard from './card'
import Title from './title'

export default async function MostLikedCommentSection() {
  const data = await fetchMostLikedComment()
  if (!data) return null

  return (
    <section className="px-5 pb-5 pt-8 md:px-[70px] lg:p-10">
      <Title />
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
