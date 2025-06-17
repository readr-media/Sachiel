'use client'
import { useRouter } from 'next/navigation'

import CommentModal from '@/components/comment/comment-modal'
import MobileCommentEditDrawer from '@/components/comment/mobile-comment-section/mobile-comment-edit-drawer'
import MobileCommentEditor from '@/components/comment/mobile-comment-section/mobile-comment-editor'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import {
  EditDrawerBlockType,
  EditDrawerShowType,
  useComment,
} from '@/context/comment'
import { useUser } from '@/context/user'
import { useCommentClamp } from '@/hooks/use-comment-clamp'
import { useCommentLike } from '@/hooks/use-comment-like'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { type CommentType } from '@/types/profile'
import { displayTimeFromNow } from '@/utils/story-display'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

type CommentProps = {
  data: CommentType
  clampLineCount?: number
  avatar: string
  canToggle?: boolean
  redirectUrl?: string
}

const Comment: React.FC<CommentProps> = ({
  data,
  clampLineCount = 3,
  avatar,
  canToggle = false,
  //TODO: 之後有文章再更改成slug或id傳入做跳轉功能。
  redirectUrl = '',
}) => {
  const { width } = useWindowDimensions()
  const { user } = useUser()
  const { memberId } = user
  const { member, id, content } = data
  const isOwnComment = memberId === member?.id
  const router = useRouter()
  const {
    state,
    dispatch,
    handleDeleteCommentModalOnConfirm,
    handleDeleteCommentModalOnCancel,
  } = useComment()
  const { isConfirmDeleteCommentModalOpen } = state
  const initializeEditCommentDrawer = (
    mode: EditDrawerShowType,
    commentId: string,
    commentContent: string,
    displayMode = EditDrawerBlockType.Profile
  ) => {
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: {
        mode,
        isVisible: true,
        commentId,
        content: commentContent,
        originalContent: commentContent,
        displayMode,
      },
    })
  }
  const handleEditOnClick = () =>
    initializeEditCommentDrawer(EditDrawerShowType.Self, id, content ?? '')

  const { needClamp, commentRef, handleToggleClamp } = useCommentClamp(
    clampLineCount,
    canToggle
  )
  const { commentData, isCommentLiked, handleLikeComment } = useCommentLike({
    initialComment: data,
  })
  const handleCommentClick = () => {
    if (width > getTailwindConfigBreakpointNumber('md')) {
      router.push(`${redirectUrl}`)
    } else {
      handleToggleClamp()
    }
  }
  {
    /* mobile has no default comment UI; instead desktop has. */
  }
  if (width < getTailwindConfigBreakpointNumber('md') && !commentData.content)
    return <></>
  return (
    <>
      <section
        className="mt-4 flex w-full flex-col gap-2 rounded-md border border-primary-200 bg-primary-100 p-3"
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center">
            <Avatar
              src={avatar || ''}
              size="m"
              extra="mr-2 min-w-[28px] min-h-[28px]"
            />
            <p className="caption-1 text-primary-500">
              {displayTimeFromNow(commentData.createdAt)}
            </p>
            {isOwnComment && (
              <>
                <Icon iconName="icon-dot" size="s" />
                <button
                  onClick={handleEditOnClick}
                  className="caption-1 text-primary-500"
                >
                  編輯留言
                </button>
              </>
            )}
          </div>
          <div className="flex items-center justify-end">
            <p className="caption-1 text-primary-600">
              {commentData.likeCount}
            </p>
            <button onClick={handleLikeComment}>
              <Icon
                iconName={isCommentLiked ? 'icon-liked' : 'icon-heart'}
                size="l"
              />
            </button>
          </div>
        </div>
        <div
          className={`relative md:flex md:items-center ${
            needClamp ? '' : 'after:opacity-0'
          } after:body-3 after:absolute after:bottom-0 after:right-1 after:bg-gradient-to-r after:from-transparent after:from-0% after:to-primary-100 after:to-25% after:pl-6 after:text-primary-400 after:content-['...繼續閱讀'] md:after:bottom-[6px]`}
          onClick={handleCommentClick}
        >
          {/* non-mobile comment avatar */}
          <Avatar
            src={avatar || ''}
            size="m"
            extra="mr-2 hidden md:flex min-w-[28px] min-h-[28px]"
            ringColor="primary-100"
          />
          <p
            className={`body-3 line-clamp-3 h-fit w-full cursor-pointer ${
              commentData.content ? 'text-primary-600' : 'text-primary-400'
            } sm:line-clamp-1`}
            ref={commentRef}
          >
            {state.commentList[0]?.content ?? (data.content || '沒有評論')}
          </p>
        </div>
      </section>
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
      <MobileCommentEditor />
      <MobileCommentEditDrawer />
    </>
  )
}

export default Comment
