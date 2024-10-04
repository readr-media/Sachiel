import Image from 'next/image'
import Link from 'next/link'

import Comment from '@/app/profile/_components/comment'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import StoryMoreActionButton from '@/components/story-more-action-button'
import {
  type CommentType,
  type PickListItem,
  type StoryDataItem,
} from '@/types/profile'

type ArticleCardProps = {
  storyData: NonNullable<PickListItem> | StoryDataItem
  isLast: boolean
  memberId?: string
  avatar?: string
  name?: string
  shouldShowComment: boolean
}
function hasComment(
  storyData: NonNullable<PickListItem> | StoryDataItem
): storyData is NonNullable<PickListItem> {
  if (!storyData) return false
  return 'comment' in storyData
}

const ArticleCard = ({
  storyData,
  isLast,
  memberId,
  avatar = '',
  name,
  shouldShowComment,
}: ArticleCardProps) => {
  /**
   * 此處的gql方法主要有三個：
   * GetMemberProfile 只會取用最新並且是作者的留言（一個）
   * GetVisitorProfile 只會取用最新並且是作者的留言（一個）
   * GetPublisherProfile 不會取用留言，因為Publisher不會顯示留言
   */
  const commentList = (hasComment(storyData) && storyData.comment) || []
  const authorComment =
    commentList.length !== 0
      ? commentList[0]
      : {
          __typename: 'Comment',
          id: '',
          content: '',
          createdAt: '',
          likeCount: 0,
          member: {
            __typename: 'Member',
            id: memberId,
            name,
            avatar,
          },
        }
  return (
    <Link href={`/story/${storyData?.id}`}>
      <section className="hidden md:block md:aspect-[2/1] md:w-full md:overflow-hidden md:rounded-t-md">
        <Image
          src={storyData?.og_image || '/images/default-story-image.webP'}
          alt={`${storyData?.title}'s story cover image`}
          width={96}
          height={48}
          className="size-full object-cover"
        />
      </section>
      <div
        className={`flex flex-col p-5 after:absolute after:bottom-1 after:h-px after:w-[calc(100%-40px)] after:bg-primary-200 md:line-clamp-3 md:pt-[12px] md:after:hidden ${
          isLast && 'after:hidden'
        }`}
      >
        <section className="mb-1 flex items-center justify-between">
          <p className="caption-1 text-primary-500">
            {(storyData?.source && storyData?.source.title) ?? '預設媒體'}
          </p>
          <StoryMoreActionButton storyId={storyData.id} />
        </section>
        <section className="mb-2 flex items-start justify-between sm:gap-10">
          <div className="flex h-full flex-col justify-between">
            <p className="body-2 mb-2 w-full sm:mb-1 sm:line-clamp-2 lg:line-clamp-3 lg:min-h-[72px]">
              {storyData?.title || '預設標題'}
            </p>
            <span className=" *:caption-1 *:text-primary-500">
              <StoryMeta
                commentCount={storyData?.commentCount || 0}
                publishDate={storyData?.published_date || ''}
                paywall={storyData?.paywall || false}
                fullScreenAd={storyData?.full_screen_ad || ''}
              />
            </span>
          </div>
          <div className="relative ml-3 aspect-[2/1] min-w-24 overflow-hidden rounded border-[0.5px] border-primary-200 sm:w-40 sm:min-w-40 md:hidden">
            <Image
              src={storyData?.og_image || '/images/default-story-image.webP'}
              alt={`${storyData?.title}'s story cover image`}
              fill
              className="object-cover"
            />
          </div>
        </section>
        <section className="mt-4 flex justify-between">
          <StoryPickInfo
            displayPicks={storyData?.pick}
            pickCount={storyData?.pickCount || 0}
            maxCount={4}
          />
          <StoryPickButton storyId={storyData?.id} />
        </section>
        {shouldShowComment && (
          <Comment
            data={authorComment as CommentType}
            avatar={avatar}
            clampLineCount={3}
            canToggle={false}
          />
        )}
      </div>
    </Link>
  )
}

export default ArticleCard
