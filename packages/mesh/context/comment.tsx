/* eslint-disable max-lines */
'use client'

import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { createPortal } from 'react-dom'

import { addComment, deleteComment, editComment } from '@/app/actions/comment'
import DesktopCommentModal from '@/components/comment/desktop-comment-section/comment-modal'
import { MobileCommentModalContent } from '@/components/comment/mobile-comment-section/mobile-comment-modal-content'
import TOAST_MESSAGE from '@/constants/toast'
import { type User } from '@/context/user'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'
import useRedirectLogin from '@/hooks/use-redirect-login'
import useWindowDimensions from '@/hooks/use-window-dimension'
import type { CommentObjectiveData } from '@/types/comment'
import { CommentObjective } from '@/types/objective'
import type { PickListItem } from '@/types/profile'
import { sleep } from '@/utils/sleep'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

import { useToast } from './toast'

// Constants
const SLEEP_TIME = 1500

// Types
type Story = NonNullable<NonNullable<GetStoryQuery>['story']>
type Comment = NonNullable<Story['comments']>[number]

export enum EditDrawerShowType {
  Empty = '',
  Self = 'self',
  Other = 'other',
}

export enum EditDrawerBlockType {
  Empty = '',
  Popular = 'popular',
  All = 'all',
  Profile = 'profile',
}

interface CommentEditState {
  isVisible: boolean
  mode: EditDrawerShowType
  displayMode: EditDrawerBlockType
  content: string
  originalContent: string
  commentId: string
}

interface State {
  isMobileCommentModalOpen: boolean
  isDesktopCommentModalOpen: boolean
  isConfirmLeavingModalOpen: boolean
  isEditingComment: boolean
  isConfirmReportingModalOpen: boolean
  isAddingComment: boolean
  commentEditState: CommentEditState
  comment: string
  commentList: Comment[]
  commentsCount: number
  highlightedId: string
  isConfirmDeleteCommentModalOpen: boolean
  commentObjective: CommentObjective
}

type Action =
  | { type: 'TOGGLE_MOBILE_COMMENT_MODAL'; payload: { isOpen: boolean } }
  | { type: 'TOGGLE_DESKTOP_COMMENT_MODAL'; payload: { isOpen: boolean } }
  | { type: 'TOGGLE_COMMENT_EDITOR'; payload: { isEditing: boolean } }
  | { type: 'UPDATE_COMMENT_DRAFT'; payload: string }
  | { type: 'TOGGLE_CONFIRM_MODAL'; payload: { isVisible: boolean } }
  | { type: 'TOGGLE_REPORTING_MODAL'; payload: { isVisible: boolean } }
  | { type: 'TOGGLE_IS_ADDING_COMMENT'; payload: { isAdding: boolean } }
  | {
      type: 'UPDATE_EDIT_DRAWER'
      payload: CommentEditState
    }
  | { type: 'EDIT_COMMENT' }
  | { type: 'RESET_EDIT_DRAWER' }
  | { type: 'REMOVE_COMMENT' }
  | { type: 'UPDATE_COMMENT_TEXT'; payload: string }
  | { type: 'INSERT_COMMENT'; payload: Comment }
  | { type: 'UPDATE_HIGHLIGHTED_COMMENT'; payload: string }
  | { type: 'TOGGLE_DELETE_COMMENT_MODAL'; payload: { isVisible: boolean } }
  | {
      type: 'UPDATE_COMMENT_LIKE_STATUS'
      payload: {
        commentId: string
        memberId: string
        isLiked: boolean
      }
    }

const initialState: State = {
  isMobileCommentModalOpen: false,
  isDesktopCommentModalOpen: false,
  isEditingComment: false,
  isAddingComment: false,
  isConfirmLeavingModalOpen: false,
  isConfirmReportingModalOpen: false,
  isConfirmDeleteCommentModalOpen: false,
  commentEditState: {
    isVisible: false,
    mode: EditDrawerShowType.Empty,
    displayMode: EditDrawerBlockType.Empty,
    commentId: '',
    content: '',
    originalContent: '',
  },
  comment: '',
  commentList: [],
  commentsCount: 0,
  highlightedId: '',
  commentObjective: CommentObjective.Story,
}

function commentReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_MOBILE_COMMENT_MODAL':
      return {
        ...state,
        isMobileCommentModalOpen: action.payload.isOpen,
        comment: action.payload.isOpen ? '' : state.comment,
      }
    case 'TOGGLE_DESKTOP_COMMENT_MODAL':
      return {
        ...state,
        isDesktopCommentModalOpen: action.payload.isOpen,
        comment: action.payload.isOpen ? '' : state.comment,
      }
    case 'TOGGLE_COMMENT_EDITOR':
      return { ...state, isEditingComment: action.payload.isEditing }
    case 'TOGGLE_CONFIRM_MODAL':
      return { ...state, isConfirmLeavingModalOpen: action.payload.isVisible }
    case 'TOGGLE_DELETE_COMMENT_MODAL':
      return {
        ...state,
        isConfirmDeleteCommentModalOpen: action.payload.isVisible,
      }
    case 'TOGGLE_IS_ADDING_COMMENT':
      return { ...state, isAddingComment: action.payload.isAdding }
    case 'TOGGLE_REPORTING_MODAL':
      return { ...state, isConfirmReportingModalOpen: action.payload.isVisible }
    case 'UPDATE_COMMENT_DRAFT':
      return {
        ...state,
        commentEditState: {
          ...state.commentEditState,
          content: action.payload,
        },
      }
    case 'EDIT_COMMENT':
      return {
        ...state,
        commentList: state.commentList.map((comment) =>
          comment.id === state.commentEditState.commentId
            ? { ...comment, content: state.commentEditState.content }
            : comment
        ),
      }
    case 'UPDATE_EDIT_DRAWER':
      return {
        ...state,
        commentEditState: {
          ...action.payload,
          originalContent: action.payload.content,
        },
      }
    case 'RESET_EDIT_DRAWER':
      return { ...state, commentEditState: initialState.commentEditState }
    case 'REMOVE_COMMENT':
      return {
        ...state,
        commentList: state.commentList.filter(
          (comment) => comment.id !== state.commentEditState.commentId
        ),
        commentsCount: state.commentsCount - 1,
      }
    case 'UPDATE_COMMENT_TEXT':
      return { ...state, comment: action.payload }
    case 'INSERT_COMMENT':
      return {
        ...state,
        commentList: [action.payload, ...state.commentList],
        commentsCount: state.commentsCount + 1,
      }
    case 'UPDATE_HIGHLIGHTED_COMMENT':
      return { ...state, highlightedId: action.payload }
    case 'UPDATE_COMMENT_LIKE_STATUS':
      return {
        ...state,
        commentList: state.commentList.map((comment) => {
          if (comment.id !== action.payload.commentId) return comment
          // 檢查評論類型並相應更新
          if ('isMemberLiked' in comment) {
            const currentLikes =
              (comment as NonNullable<NonNullable<PickListItem>['comment']>[0])
                .isMemberLiked || []
            return {
              ...comment,
              likeCount: action.payload.isLiked
                ? (comment.likeCount || 0) + 1
                : Math.max(0, (comment.likeCount || 0) - 1),
              isMemberLiked: action.payload.isLiked
                ? [
                    ...currentLikes,
                    { __typename: 'Member', id: action.payload.memberId },
                  ]
                : currentLikes.filter(
                    (like) => like.id !== action.payload.memberId
                  ),
            }
          } else if ('like' in comment) {
            const currentLikes = comment.like || []
            return {
              ...comment,
              likeCount: action.payload.isLiked
                ? (comment.likeCount || 0) + 1
                : Math.max(0, (comment.likeCount || 0) - 1),
              like: action.payload.isLiked
                ? [
                    ...currentLikes,
                    { __typename: 'Member', id: action.payload.memberId },
                  ]
                : currentLikes.filter(
                    (like) => like.id !== action.payload.memberId
                  ),
            }
          }
          return comment
        }),
      }
    default:
      return state
  }
}

interface CommentContextType {
  state: State
  dispatch: React.Dispatch<Action>
  handleDeleteCommentModalOnConfirm: (user: User) => Promise<void>
  handleDeleteCommentModalOnCancel: () => void
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleReportOnClose: () => void
  handleCommentEdit: (user: User) => void
  handleCommentPublish: (params: {
    user: User
    targetId: string
  }) => Promise<void>
  handleDeleteComment: (e: React.MouseEvent<HTMLLIElement>) => void
  handleEditComment: (
    e: React.MouseEvent<HTMLLIElement | HTMLButtonElement>
  ) => void
  handleReport: (e: React.MouseEvent<HTMLLIElement>) => void
  updateCommentLikeStatus: (
    commentId: string,
    memberId: string,
    isLiked: boolean
  ) => void
}

const CommentContext = createContext<CommentContextType | undefined>(undefined)

export function CommentProvider({
  children,
  initialComments,
  commentsCount,
  commentObjectiveData,
  commentObjective,
}: {
  children: ReactNode
  initialComments: Comment[] | NonNullable<NonNullable<PickListItem>['comment']>
  commentsCount: number
  commentObjectiveData: CommentObjectiveData
  commentObjective: CommentObjective
}) {
  const [state, dispatch] = useReducer(commentReducer, {
    ...initialState,
    commentList: initialComments,
    commentsCount,
    commentObjective,
  })
  const { addToast } = useToast()
  const { width } = useWindowDimensions()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()

  const handleDeleteCommentModalOnConfirm = useCallback(
    async (user: User) => {
      const deleteCommentResponse = await deleteComment({
        memberId: user.memberId,
        commentId: state.commentEditState.commentId,
      })
      dispatch({ type: 'REMOVE_COMMENT' })
      dispatch({
        type: 'TOGGLE_DELETE_COMMENT_MODAL',
        payload: { isVisible: false },
      })
      dispatch({
        type: 'UPDATE_EDIT_DRAWER',
        payload: { ...state.commentEditState, isVisible: false },
      })
      dispatch({ type: 'RESET_EDIT_DRAWER' })
      if (!deleteCommentResponse) {
        addToast({ status: 'fail', text: TOAST_MESSAGE.deleteCommentFailed })
      }
    },
    [addToast, state.commentEditState]
  )

  const handleDeleteCommentModalOnCancel = useCallback(() => {
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
    dispatch({ type: 'RESET_EDIT_DRAWER' })
    dispatch({
      type: 'TOGGLE_DELETE_COMMENT_MODAL',
      payload: { isVisible: false },
    })
  }, [state.commentEditState])

  const handleCommentPublish = useCallback(
    async ({ user, targetId }: { user: User; targetId: string }) => {
      if (detectIfShouldRedirectToLogin()) return
      if (!targetId) throw new Error('no story id')

      dispatch({
        type: 'TOGGLE_IS_ADDING_COMMENT',
        payload: { isAdding: true },
      })

      try {
        const dateTime = new Date().toString()
        const latestCommentId =
          state.commentList.find(
            (comment) => comment.member?.customId === user?.customId
          )?.id || ''

        const addedCommentId = await addComment({
          content: state.comment,
          targetId,
          memberId: user.memberId,
          commentObjective,
          latestCommentId,
        })

        if (!addedCommentId) {
          throw new Error('Failed to add comment')
        }

        await sleep(SLEEP_TIME)

        dispatch({
          type: 'UPDATE_HIGHLIGHTED_COMMENT',
          payload: addedCommentId,
        })
        dispatch({
          type: 'INSERT_COMMENT',
          payload: {
            id: addedCommentId,
            content: state.comment,
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
      } catch (error) {
        addToast({ status: 'fail', text: TOAST_MESSAGE.addCommentFailed })
        console.error('Error publishing comment:', error)
      } finally {
        dispatch({
          type: 'TOGGLE_IS_ADDING_COMMENT',
          payload: { isAdding: false },
        })
      }
    },
    [
      addToast,
      commentObjective,
      detectIfShouldRedirectToLogin,
      state.comment,
      state.commentList,
    ]
  )

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch({ type: 'UPDATE_COMMENT_TEXT', payload: e.target.value })
    },
    []
  )

  const handleReportOnClose = useCallback(() => {
    dispatch({ type: 'TOGGLE_REPORTING_MODAL', payload: { isVisible: false } })
  }, [])

  const handleCommentEdit = useCallback(
    async (user: User) => {
      if (!state.commentEditState.content.trim()) {
        dispatch({ type: 'RESET_EDIT_DRAWER' })
        dispatch({
          type: 'TOGGLE_COMMENT_EDITOR',
          payload: { isEditing: false },
        })
        return
      }
      dispatch({ type: 'EDIT_COMMENT' })
      dispatch({ type: 'RESET_EDIT_DRAWER' })
      dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: false } })
      const editCommentResponse = await editComment({
        memberId: user.memberId,
        commentId: state.commentEditState.commentId,
        content: state.commentEditState.content,
      })
      if (!editCommentResponse) {
        addToast({ status: 'fail', text: TOAST_MESSAGE.editCommentFailed })
      }
    },
    [addToast, state.commentEditState.commentId, state.commentEditState.content]
  )
  const handleDeleteComment = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })

    if (!state.commentEditState.commentId) {
      console.warn('無評論 ID')
      return
    }

    dispatch({
      type: 'TOGGLE_DELETE_COMMENT_MODAL',
      payload: { isVisible: true },
    })
  }
  const handleEditComment = (
    e: React.MouseEvent<HTMLLIElement | HTMLButtonElement>
  ) => {
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: true } })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }

  const handleReport = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    if (detectIfShouldRedirectToLogin()) {
      return
    }
    dispatch({ type: 'TOGGLE_REPORTING_MODAL', payload: { isVisible: true } })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }

  const updateCommentLikeStatus = useCallback(
    (commentId: string, memberId: string, isLiked: boolean) => {
      dispatch({
        type: 'UPDATE_COMMENT_LIKE_STATUS',
        payload: { commentId, memberId, isLiked },
      })
    },
    []
  )

  const contextValue = {
    state,
    dispatch,
    handleDeleteCommentModalOnConfirm,
    handleDeleteCommentModalOnCancel,
    handleCommentPublish,
    handleTextChange,
    handleReportOnClose,
    handleCommentEdit,
    handleDeleteComment,
    handleEditComment,
    handleReport,
    updateCommentLikeStatus,
  }

  useEffect(() => {
    if (width >= getTailwindConfigBreakpointNumber('sm')) {
      if (state.isMobileCommentModalOpen) {
        dispatch({
          type: 'TOGGLE_MOBILE_COMMENT_MODAL',
          payload: { isOpen: false },
        })
      }
    } else {
      if (state.isDesktopCommentModalOpen) {
        dispatch({
          type: 'TOGGLE_DESKTOP_COMMENT_MODAL',
          payload: { isOpen: false },
        })
      }
    }
  }, [state.isDesktopCommentModalOpen, state.isMobileCommentModalOpen, width])

  return (
    <CommentContext.Provider value={contextValue}>
      {state.isMobileCommentModalOpen &&
        createPortal(
          <MobileCommentModalContent data={commentObjectiveData} />,
          document.body
        )}
      {state.isDesktopCommentModalOpen &&
        createPortal(
          <DesktopCommentModal targetId={commentObjectiveData.id} />,
          document.body
        )}
      {children}
    </CommentContext.Provider>
  )
}

export function useComment() {
  const context = useContext(CommentContext)
  if (context === undefined) {
    throw new Error('useComment must be used within a CommentProvider')
  }
  return context
}
