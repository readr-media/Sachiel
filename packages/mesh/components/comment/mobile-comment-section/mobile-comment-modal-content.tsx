'use client'
import { useMemo } from 'react'

import { EditDrawerBlockType, useComment } from '@/context/comment'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
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
  const { t } = useCustomTranslation()
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
            title={t(
              'Components.MobileCommentModalContent.poupular-comments',
              '熱門留言'
            )}
            type={EditDrawerBlockType.Popular}
            comments={popularComments}
          />
        )}
        <CommentBlock
          title={t(
            'Components.MobileCommentModalContent.all-comments',
            '所有留言'
          )}
          type={EditDrawerBlockType.All}
          comments={sortedAuthorComments}
        />
      </div>
      <MobileCommentFooter targetId={data?.id} comment={comment} />
      <CommentModal
        isOpen={isConfirmLeavingModalOpen}
        onConfirmText={t('Components.MobileCommentModalContent.leave', '離開')}
        onCloseText={t('Components.MobileCommentModalContent.stay', '繼續輸入')}
        onConfirm={handleAddCommentModalOnLeave}
        onClose={handleAddCommentModalOnClose}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">
            {t(
              'Components.MobileCommentModalContent.leave-question',
              '離開留言區？'
            )}
          </p>
          <p className="body-3">
            {t(
              'Components.MobileCommentModalContent.leave-detail',
              '系統將不會儲存您剛剛輸入的內容'
            )}
          </p>
        </section>
      </CommentModal>
      <CommentModal
        onConfirmText={t(
          'Components.MobileCommentModalContent.delete',
          '刪除留言'
        )}
        onCloseText={t('Components.MobileCommentModalContent.cancel', '取消')}
        isOpen={isConfirmDeleteCommentModalOpen}
        onConfirm={() => handleDeleteCommentModalOnConfirm(user)}
        onClose={handleDeleteCommentModalOnCancel}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">
            {t(
              'Components.MobileCommentModalContent.delete-question',
              '確認要刪除留言？'
            )}
          </p>
          <p className="body-3">
            {t(
              'Components.MobileCommentModalContent.delete-detail',
              '系統仍會保留您的精選記錄'
            )}
          </p>
        </section>
      </CommentModal>
      <CommentModal
        onConfirmText=""
        onCloseText={t(
          'Components.MobileCommentModalContent.close',
          '返回留言'
        )}
        isOpen={isConfirmReportingModalOpen}
        onClose={handleReportOnClose}
      >
        <section className="flex flex-col justify-start">
          <p className="title-2">
            {t(
              'Components.MobileCommentModalContent.report-success',
              '檢舉成功'
            )}
          </p>
          <p className="body-3">
            {t(
              'Components.MobileCommentModalContent.report-success-detail',
              '我們已收到您的檢舉，感謝提供資訊'
            )}
          </p>
        </section>
      </CommentModal>
      <MobileCommentEditDrawer />
      <MobileCommentEditor />
    </div>
  )
}
