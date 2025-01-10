import { displayTimeFromNow } from '@/utils/story-display'

import CommentCount from '../comment-count'
import Icon from '../icon'

export default function StoryMeta({
  storyId,
  commentCount,
  publishDate,
  paywall,
  fullScreenAd,
}: {
  storyId: string
  commentCount: number
  publishDate: string
  paywall: boolean
  fullScreenAd: string
}) {
  return (
    <div className="flex items-center text-primary-500">
      <Icon iconName="icon-chat-bubble" size="s" />
      <CommentCount objectiveId={storyId} initialCommentCounts={commentCount} />
      <Icon iconName="icon-dot" size="s" />
      <div>
        <span>{publishDate ? displayTimeFromNow(publishDate) : null}</span>
      </div>
      {paywall && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          付費文章
        </div>
      )}
      {fullScreenAd && fullScreenAd !== 'none' && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          蓋板廣告
        </div>
      )}
    </div>
  )
}
