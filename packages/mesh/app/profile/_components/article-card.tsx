import Image from 'next/image'

import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'

import Comment from './comment'

type Member = GetMemberProfileQuery['member']
type PickList = NonNullable<Member>['picks']
export type StoryList = NonNullable<PickList>[number]['story']
type ArticleCardProps = {
  data: NonNullable<StoryList>
  isLast: boolean
  id: string
}
const ArticleCard = ({ data, isLast, id }: ArticleCardProps) => {
  const commentList = data.comment || []
  const authorComment = commentList.find(
    (comment) => comment?.member?.id === id
  )
  return (
    <div
      className={`flex flex-col p-5 after:absolute after:bottom-1 after:h-[1px] after:w-[calc(100%-40px)] after:bg-[rgba(0,0,0,0.1)] ${
        isLast && 'after:hidden'
      }`}
    >
      <section className="mb-1 flex items-center justify-between">
        <p className=" text-xs font-normal leading-[18px] text-primary-500">
          {(data.source && data.source.title) ?? ''}
        </p>
        <button>...</button>
      </section>
      <section className="mb-2 flex items-center">
        <p className="w-full text-base font-normal leading-6">{data.title}</p>
        <Image
          src={data.og_image ?? ''}
          alt="alt"
          width={96}
          height={48}
          className="ml-3 rounded border-[0.5px] border-primary-200"
        />
      </section>
      <StoryMeta
        commentCount={data.commentCount || 0}
        publishDate={data.published_date}
        paywall={data.paywall || false}
        fullScreenAd={data.full_screen_ad || ''}
      />
      <section className="mt-4 flex justify-between">
        <StoryPickInfo
          displayPicks={data.pick}
          pickCount={data.pickCount || 0}
          maxCount={4}
        />
        <StoryPickButton isStoryPicked={false} />
      </section>
      <Comment data={authorComment} />
    </div>
  )
}

export default ArticleCard
