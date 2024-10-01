import React, { useEffect, useRef, useState } from 'react'

import { addComment } from '@/app/actions/comment'
import Dots from '@/components/dots'
import Avatar from '@/components/story-card/avatar'
import { useComment } from '@/context/comment-context'
import { type User } from '@/context/user'
import { sleep } from '@/utils/sleep'

const StoryCommentFooter = ({
  user,
  storyId,
  comment,
}: {
  user?: User
  storyId?: string
  comment: string
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isAddingComment, setIsAddingComment] = useState(false)

  const { state, dispatch } = useComment()
  const latestCommentId =
    state.commentList.find(
      (comment) => comment.member?.customId === user?.customId
    )?.id || ''
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_COMMENT_TEXT', payload: e.target.value })
    adjustTextareaHeight()
  }

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '24px'
      const singleLineHeight = 24
      const maxHeight = singleLineHeight * 4
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = `${Math.min(
        Math.max(scrollHeight, singleLineHeight),
        maxHeight
      )}px`
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  })

  const handlePublish = async () => {
    if (!user?.memberId) throw new Error('no user id')
    if (!storyId) throw new Error('no story id')
    setIsAddingComment(true)
    const dateTime = new Date().toString()
    const sleepTime = 3000
    let addedCommentId
    try {
      addedCommentId = await addComment({
        content: comment,
        storyId,
        memberId: user?.memberId,
        latestCommentId,
      })
    } catch (error) {
      setIsAddingComment(false)
      console.error({ error })
    }
    if (!addedCommentId) {
      // TODO: error toast
      setIsAddingComment(false)
      return
    }
    await sleep(sleepTime)
    dispatch({ type: 'UPDATE_HIGHLIGHTED_COMMENT', payload: addedCommentId })
    dispatch({
      type: 'INSERT_COMMENT',
      payload: {
        id: addedCommentId,
        content: comment,
        createdAt: dateTime,
        member: {
          id: user.memberId,
          customId: user.customId,
          name: user.name,
          avatar: user.avatar,
        },
      },
    })
    dispatch({ type: 'UPDATE_COMMENT_TEXT', payload: '' })
    adjustTextareaHeight()
    setIsAddingComment(false)
  }

  return (
    <footer className="absolute bottom-0 left-0 w-screen border-t border-gray-100 bg-white px-5 py-3">
      <div className="grid grid-cols-[auto_1fr_auto] items-center">
        <Avatar src={user?.avatar || ''} size="l" />
        <textarea
          ref={textareaRef}
          className="body-2 grow resize-none pl-2 pr-3 text-primary-700 focus:outline-none"
          rows={4}
          placeholder="在這裡輸入留言..."
          value={comment}
          onChange={handleTextChange}
          style={{
            maxHeight: '6rem',
            overflowY: 'auto',
          }}
        />
        <div className="flex h-11 items-center self-end">
          <button
            className="body-2 text-custom-blue transition-colors hover:bg-blue-600"
            onClick={handlePublish}
          >
            {isAddingComment ? <Dots /> : '發布'}
          </button>
        </div>
      </div>
    </footer>
  )
}

export default StoryCommentFooter
