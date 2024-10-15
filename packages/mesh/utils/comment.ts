import type { User } from '@/context/user'
import type { Comment } from '@/graphql/__generated__/graphql'

export const sortAuthorComments = (comments: Comment[], user: User) => {
  const authorComments = comments.filter(
    (comment) => comment.member?.customId === user.customId
  )
  const otherComments = comments.filter(
    (comment) => comment.member?.customId !== user.customId
  )

  const getLatestDate = (comment: Comment) => {
    const createdDate = comment.createdAt
      ? new Date(comment.createdAt).getTime()
      : 0
    const editedDate = comment.updatedAt
      ? new Date(comment.updatedAt).getTime()
      : 0
    return Math.max(createdDate, editedDate)
  }

  // 對 authorComments 按最新活動日期（createdAt 或 editedAt 中較晚的）從新到舊排序
  const sortedAuthorComments = authorComments.sort((a, b) => {
    return getLatestDate(b) - getLatestDate(a)
  })

  // 將排序後的 authorComments 和 otherComments 合併
  return [...sortedAuthorComments, ...otherComments]
}

export function sortAndFilterComments(comments: Comment[]): Comment[] {
  const validComments = comments.filter((comment) => !!comment.likeCount)

  // 如果沒有有效的 likeCount，返回空陣列
  if (validComments.length === 0) {
    return []
  }

  // 按 likeCount 從大到小排序
  const sortedComments = validComments.sort(
    (a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0)
  )

  // 只取前三個元素
  const topThreeComments = sortedComments.slice(0, 3)

  // 如果所有 likeCount 都是 0，返回空陣列
  if (topThreeComments.every((comment) => comment.likeCount === 0)) {
    return []
  }

  return topThreeComments
}
