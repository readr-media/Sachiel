import { useTranslations } from 'next-intl'
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
  const t = useTranslations('Components.CommentBlocks')
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
            placeholder={t('comment-placeholder')}
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
              text={t('comment-publish')}
              disabled={comment.trim() === ''}
            />
          )}
        </div>
      </div>
      {!!popularComments.length && (
        <CommentBlock
          title={t('comment-poular-comment')}
          type={EditDrawerBlockType.Popular}
          comments={popularComments}
        />
      )}
      <CommentBlock
        title={t('comment-all-comments')}
        type={EditDrawerBlockType.All}
        comments={sortedAuthorComments}
      />
      <CommentModal
        onConfirmText={t('comment-delete-comment')}
        onCloseText={t('comment-cancel')}
        isOpen={isConfirmDeleteCommentModalOpen}
        onConfirm={() => handleDeleteCommentModalOnConfirm(user)}
        onClose={handleDeleteCommentModalOnCancel}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">{t('comment-confirm-delete')}</p>
          <p className="body-3">{t('comment-pick-will-stay')}</p>
        </section>
      </CommentModal>
      <CommentModal
        onConfirmText=""
        onCloseText={t('comment-return-to-comment')}
        isOpen={isConfirmReportingModalOpen}
        onClose={handleReportOnClose}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">{t('comment-report-success')}</p>
          <p className="body-3">{t('comment-report-success-detail')}</p>
        </section>
      </CommentModal>
    </>
  )
}
