import CommentCount from '@/components/comment-count'
import Icon from '@/components/icon'
import { displayTimeFromNow } from '@/utils/story-display'

export default function CollectionMeta({
  collectionId,
  commentCount,
  updateAt,
}: {
  collectionId: string
  commentCount: number
  updateAt: string
}) {
  return (
    <div className="flex items-center text-primary-500">
      <Icon iconName="icon-chat-bubble" size="s" />
      <CommentCount
        objectiveId={collectionId}
        initialCommentCounts={commentCount}
      />
      <Icon iconName="icon-dot" size="s" />
      <div>
        <span>{updateAt ? displayTimeFromNow(updateAt) : null}</span>
      </div>
    </div>
  )
}
