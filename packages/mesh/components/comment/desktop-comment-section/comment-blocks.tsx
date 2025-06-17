import { useMemo } from 'react'

import Button from '@/components/button'
import Dots from '@/components/dots'
import Avatar from '@/components/story-card/avatar'
import { EditDrawerBlockType, useComment } from '@/context/comment'
import { useUser } from '@/context/user'
import { sortAndFilterComments, sortAuthorComments } from '@/utils/comment'

import CommentBlock from '../comment-block'
import CommentModal from '../comment-modal'

export default function CommentBlocks({ targetId }: { targetId: string }) {
  const { user } = useUser()
  const {
    state,
    handleDeleteCommentModalOnCancel,
    handleDeleteCommentModalOnConfirm,
    handleCommentPublish,
    handleTextChange,
    handleReportOnClose,
  } = useComment()

  const {
    commentList,
    comment,
    isConfirmDeleteCommentModalOpen,
    isAddingComment,
    isConfirmReportingModalOpen,
  } = state

  const popularComments = useMemo(
    () => sortAndFilterComments(commentList),
    [commentList]
  )
  const sortedAuthorComments = useMemo(
    () => sortAuthorComments(commentList, user),
    [commentList, user]
  )
  return (
    <>
      <div className="flex grow flex-col gap-3 rounded-md bg-multi-layer-light p-5">
        <div className="flex grow gap-2">
          <Avatar src={user.avatar} size="l" />
          <textarea
            name="comment"
            id="comment"
            rows={4}
            placeholder="有什麼要補充的嗎..."
            onChange={handleTextChange}
            value={comment}
            className="grow rounded-md border border-primary-200 p-3 focus-visible:outline-none"
          />
        </div>
        <div className="h-8 w-[52px] place-self-end *:size-full *:p-0">
          {isAddingComment ? (
            <div className="flex h-8 w-[52px] items-center justify-center rounded-md bg-primary-700">
              <Dots />
            </div>
          ) : (
            <Button
              onClick={() => handleCommentPublish({ user, targetId })}
              size="md"
              color="primary"
              text="發布"
              disabled={comment.trim() === ''}
            />
          )}
        </div>
      </div>
      {!!popularComments.length && (
        <CommentBlock
          title="熱門留言"
          type={EditDrawerBlockType.Popular}
          comments={popularComments}
        />
      )}
      <CommentBlock
        title="所有留言"
        type={EditDrawerBlockType.All}
        comments={sortedAuthorComments}
      />
      <CommentModal
        onConfirmText="刪除留言"
        onCloseText="取消"
        isOpen={isConfirmDeleteCommentModalOpen}
        onConfirm={() => handleDeleteCommentModalOnConfirm(user)}
        onClose={handleDeleteCommentModalOnCancel}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">確認要刪除留言？</p>
          <p className="body-3">系統仍會保留您的精選記錄</p>
        </section>
      </CommentModal>
      <CommentModal
        onConfirmText=""
        onCloseText="返回留言"
        isOpen={isConfirmReportingModalOpen}
        onClose={handleReportOnClose}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">檢舉成功</p>
          <p className="body-3">我們已收到您的檢舉，感謝提供資訊</p>
        </section>
      </CommentModal>
    </>
  )
}
