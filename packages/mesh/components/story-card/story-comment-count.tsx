export default function StoryCommentCount({
  commentsCount,
}: {
  commentsCount: number
}) {
  if (commentsCount < 10000) {
    return (
      <>
        <span className="pr-1 text-primary-700">{commentsCount}</span>
        <span>則留言</span>
      </>
    )
  } else {
    const convertedCommentsCount = (
      Math.floor(commentsCount / 1000) / 10
    ).toFixed(1)
    return (
      <>
        <span className="pr-1 text-primary-700">{convertedCommentsCount}</span>
        <span>萬則留言</span>
      </>
    )
  }
}
