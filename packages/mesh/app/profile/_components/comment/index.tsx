'use client'
import { type StoryItem } from '../article-card'
import Comment from './comment'

export type CommentType = NonNullable<CommentList>[number]

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

type CommentContainerProps = {
  data: CommentType
  clampLineCount?: number
  avatar: string
  canToggle?: boolean
}

const CommentContainer: React.FC<CommentContainerProps> = (props) => {
  return <Comment {...props} />
}

export default CommentContainer
