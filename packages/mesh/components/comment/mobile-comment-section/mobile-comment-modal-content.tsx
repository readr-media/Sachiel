'use client'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { EditDrawerBlockType, useComment } from '@/context/comment'
import { useUser } from '@/context/user'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import type { CommentObjectiveData } from '@/types/comment'
import { sortAndFilterComments, sortAuthorComments } from '@/utils/comment'

import CommentBlock from '../comment-block'
import CommentModal from '../comment-modal'
import MobileCommentEditDrawer from './mobile-comment-edit-drawer'
import MobileCommentEditor from './mobile-comment-editor'
import MobileCommentFooter from './mobile-comment-footer'
import MobileCommentHeader from './mobile-comment-header'
import MobileCommentMeta from './mobile-comment-meta'

export function MobileCommentModalContent({
  data,
}: {
  data: CommentObjectiveData
}) {
  const t = useTranslations('Components.MobileCommentModalContent')
  const {
    state,
    dispatch,
    handleDeleteCommentModalOnConfirm,
    handleDeleteCommentModalOnCancel,
    handleReportOnClose,
  } = useComment()
  const {
    comment,
    commentList,
    isConfirmLeavingModalOpen,
    isConfirmReportingModalOpen,
    isConfirmDeleteCommentModalOpen,
  } = state
  const { user } = useUser()
  const { displayPicks, displayPicksCount } = useDisplayPicks(data)
  const handleAddCommentModalOnLeave = () => {
    dispatch({ type: 'TOGGLE_CONFIRM_MODAL', payload: { isVisible: false } })
    dispatch({
      type: 'TOGGLE_MOBILE_COMMENT_MODAL',
      payload: { isOpen: false },
    })
    document.body.classList.remove('overflow-hidden')
  }

  const handleAddCommentModalOnClose = () => {
    dispatch({ type: 'TOGGLE_CONFIRM_MODAL', payload: { isVisible: false } })
  }
  const popularComments = useMemo(
    () => sortAndFilterComments(commentList),
    [commentList]
  )
  const sortedAuthorComments = useMemo(
    () => sortAuthorComments(commentList, user),
    [commentList, user]
  )

  return (
    <div className="fixed left-0 top-0 z-30 size-full bg-white">
      <MobileCommentHeader />
      <div className="commentEditor max-h-[calc(100dvh_-_60px)] overflow-y-auto py-4 pb-[69px]">
        <MobileCommentMeta
          objectiveId={data.id}
          title={data.title || ''}
          source={{
            id: data.source?.customId ?? data.creator?.customId ?? '',
            name: data.source?.title ?? data.creator?.customId ?? '',
          }}
          displayPicks={displayPicks}
          pickCount={displayPicksCount}
        />
        {!!popularComments.length && (
          <CommentBlock
            title={t('poupular-comments')}
            type={EditDrawerBlockType.Popular}
            comments={popularComments}
          />
        )}
        <CommentBlock
          title={t('all-comments')}
          type={EditDrawerBlockType.All}
          comments={sortedAuthorComments}
        />
      </div>
      <MobileCommentFooter targetId={data?.id} comment={comment} />
      <CommentModal
        isOpen={isConfirmLeavingModalOpen}
        onConfirmText={t('leave')}
        onCloseText={t('stay')}
        onConfirm={handleAddCommentModalOnLeave}
        onClose={handleAddCommentModalOnClose}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">{t('leave-question')}</p>
          <p className="body-3">{t('leave-detail')}</p>
        </section>
      </CommentModal>
      <CommentModal
        onConfirmText={t('delete')}
        onCloseText={t('cancel')}
        isOpen={isConfirmDeleteCommentModalOpen}
        onConfirm={() => handleDeleteCommentModalOnConfirm(user)}
        onClose={handleDeleteCommentModalOnCancel}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">{t('delete-question')}</p>
          <p className="body-3">{t('delete-detail')}</p>
        </section>
      </CommentModal>
      <CommentModal
        onConfirmText=""
        onCloseText={t('close')}
        isOpen={isConfirmReportingModalOpen}
        onClose={handleReportOnClose}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">{t('report-success')}</p>
          <p className="body-3">{t('report-success-detail')}</p>
        </section>
      </CommentModal>
      <MobileCommentEditDrawer />
      <MobileCommentEditor />
    </div>
  )
}
