import FollowButton from '@/app/social/_components/follow-button'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import type { Comment } from '@/types/homepage'
import { displayTimeFromNow } from '@/utils/story-display'

type Props = {
  comment: Comment
  rank: number
}

export default function MostLikedCommentCard({ comment, rank }: Props) {
  return (
    <div className="flex items-start gap-x-3">
      <span
        className={`rounded-md ${
          rank === 1 ? 'bg-brand' : 'bg-[#DADCE3]'
        } px-2 py-[3px]`}
      >
        {rank}
      </span>
      <section className="grow overflow-hidden rounded-md border-[0.5px] border-primary-200 bg-primary-100 p-4">
        <div className="mb-3 flex justify-between">
          <div className="flex gap-x-4">
            <div className="relative size-11 shrink-0">
              <Avatar src={comment.member.avatar} size="l" />
            </div>

            <div>
              <p className="subtitle-2 mb-[2px] line-clamp-1 text-primary-700">
                {comment.member.name}
              </p>
              <p className="footnote text-primary-500">
                留言獲得{' '}
                <span className="text-primary-800">{comment.likeCount}</span>{' '}
                個愛心
              </p>
            </div>
          </div>
          {/* TODO: modify styles and migrate */}
          <FollowButton followingId={String(comment.member.id)} />
        </div>

        <article className="body-3 line-clamp-4 h-[84px] text-primary-600">
          {comment.content}
        </article>

        <hr className="bg-rgba(0,9,40,0.1)] my-3 h-[0.5px]" />
        {comment.story && (
          <div>
            <h2 className="subtitle-2 mb-2 text-primary-700">
              {comment.story.title}
            </h2>

            <div className="flex items-center">
              <p className="caption-1 text-primary-500">
                {comment.story.source.title}
              </p>
              <Icon iconName="icon-dot" size="s" />
              <p className="caption-1 text-primary-500">
                {displayTimeFromNow(comment.story.published_date)}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
