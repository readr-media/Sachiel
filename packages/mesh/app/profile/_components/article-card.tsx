import Image from 'next/image'

import Icon from '@/components/icon'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'

import Comment from './comment'
import { TabCategory } from './tab'

type Member = GetMemberProfileQuery['member']
type PickList = NonNullable<Member>['picks']
export type StoryItem = NonNullable<PickList>[number]['story']
type ArticleCardProps = {
  data: NonNullable<StoryItem>
  isLast: boolean
  id: string
  avatar?: string
  category?: TabCategory
  userType?: string
}
const ArticleCard = ({
  data,
  isLast,
  id,
  avatar = '',
  category,
  userType,
}: ArticleCardProps) => {
  const commentList = data.comment || []
  const authorComment = commentList.find(
    (comment) => comment?.member?.id === id
  )
  const isCommentShow =
    userType !== 'publisher' && category !== TabCategory.bookmarks
  return (
    <>
      <section className="hidden md:block md:aspect-[2/1] md:w-full md:overflow-hidden md:rounded-t-md">
        <Image
          src={data.og_image || '/images/default-story-image.webP'}
          alt="alt"
          width={96}
          height={48}
          className="h-full w-full object-cover"
        />
      </section>
      <div
        className={`flex flex-col p-5 after:absolute after:bottom-1 after:h-[1px] after:w-[calc(100%-40px)] after:bg-[rgba(0,0,0,0.1)] md:line-clamp-3 md:pt-[12px] md:after:hidden ${
          isLast && 'after:hidden'
        }`}
      >
        <section className="mb-1 flex items-center justify-between">
          <p className=" text-xs font-normal leading-[18px] text-primary-500">
            {(data.source && data.source.title) ?? ''}
          </p>
          <Icon iconName="icon-more-horiz" size="l" />
        </section>
        <section className="mb-2 flex items-start justify-between sm:gap-10">
          <div className="flex h-full flex-col justify-between">
            <p className="mb-2 w-full text-base font-normal leading-6 sm:mb-1 sm:line-clamp-2 lg:line-clamp-3 lg:min-h-[72px]">
              {data.title}
            </p>
            <span className=" *:text-xs *:font-normal *:leading-[18px] *:text-primary-500">
              <StoryMeta
                commentCount={data.commentCount || 0}
                publishDate={data.published_date}
                paywall={data.paywall || false}
                fullScreenAd={data.full_screen_ad || ''}
              />
            </span>
          </div>
          <div className="relative ml-3 aspect-[2/1] min-w-24 overflow-hidden rounded border-[0.5px] border-primary-200 sm:w-40 sm:min-w-40 md:hidden">
            <Image
              src={data.og_image || '/images/default-story-image.webP'}
              alt="alt"
              fill
              className="object-cover"
            />
          </div>
        </section>
        <section className="mt-4 grid grid-cols-3">
          <div className="col-span-2">
            <StoryPickInfo
              displayPicks={data.pick}
              pickCount={data.pickCount || 0}
              maxCount={4}
            />
          </div>
          <div className="place-self-end">
            <StoryPickButton isStoryPicked={false} />
          </div>
        </section>
        {isCommentShow && <Comment data={authorComment} avatar={avatar} />}
      </div>
    </>
  )
}

export default ArticleCard
