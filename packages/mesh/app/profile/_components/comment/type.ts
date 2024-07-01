import { type StoryItem } from '../article-card'

export type CommentList = NonNullable<StoryItem>['comment']
export type CommentProps = {
  data?: NonNullable<CommentList>[number]
  clampLineCount?: number
  avatar: string
  canToggle?: boolean
  children?: React.ReactNode
}
export type Member = {
  avatar: string
  name: string
}
export type CommentData = CommentProps['data']
