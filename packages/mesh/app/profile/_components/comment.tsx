import Image from 'next/image'

import { type StoryList } from './article-card'

type CommentList = NonNullable<StoryList>['comment']
type CommentProps = {
  data?: NonNullable<CommentList>[number]
}

const Comment = ({ data }: CommentProps) => {
  if (!data) return <></>
  return (
    <section className="mt-4 w-full rounded-md border border-primary-200 bg-primary-100 p-3">
      <div className="flex items-center">
        <div className="mr-2 h-7 w-7 overflow-hidden rounded-full">
          <Image
            src={data.member?.avatar || ''}
            width={28}
            height={28}
            alt={data.member?.name || 'avatar'}
            className=" object-cover"
          />
        </div>
        <p>{data.createdAt}</p>
      </div>
      <p>{data.content}</p>
    </section>
  )
}

export default Comment
