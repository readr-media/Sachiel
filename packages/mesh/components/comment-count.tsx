import { useDisplayCommentCount } from '@/hooks/use-display-commentcount'

export default function CommentCount({
  objectiveId,
  initialCommentCounts,
}: {
  objectiveId: string
  initialCommentCounts: number
}) {
  const { displayCommentCount } = useDisplayCommentCount({
    objectiveId,
    initialCount: initialCommentCounts,
  })

  return <div className="pl-0.5">{displayCommentCount}</div>
}
