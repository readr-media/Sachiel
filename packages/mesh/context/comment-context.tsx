'use client'
import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useReducer } from 'react'

import { addComment, deleteComment, editComment } from '@/app/actions/comment'
import { type User } from '@/context/user'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'
import { sleep } from '@/utils/sleep'

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
  isConfirmLeavingModalOpen: boolean
  isEditingComment: boolean
  isConfirmReportingModalOpen: boolean
  isAddingComment: boolean
  commentEditState: CommentEditState
  comment: string
  commentList: Comment[]
  highlightedId: string
  isConfirmDeleteCommentModalOpen: boolean
}

type Action =
  | { type: 'TOGGLE_MOBILE_COMMENT_MODAL'; payload: { isOpen: boolean } }
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
  | { type: 'HIDE_EDIT_DRAWER' }
  | { type: 'RESET_EDIT_DRAWER' }
  | { type: 'REMOVE_COMMENT' }
  | { type: 'UPDATE_COMMENT_TEXT'; payload: string }
  | { type: 'INSERT_COMMENT'; payload: Comment }
  | { type: 'UPDATE_HIGHLIGHTED_COMMENT'; payload: string }
  | { type: 'TOGGLE_DELETE_COMMENT_MODAL'; payload: { isVisible: boolean } }

const initialState: State = {
  isMobileCommentModalOpen: false,
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
  highlightedId: '',
}

function commentReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_MOBILE_COMMENT_MODAL':
      return {
        ...state,
        isMobileCommentModalOpen: action.payload.isOpen,
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
      }
    case 'UPDATE_COMMENT_TEXT':
      return { ...state, comment: action.payload }
    case 'INSERT_COMMENT':
      return { ...state, commentList: [action.payload, ...state.commentList] }
    case 'UPDATE_HIGHLIGHTED_COMMENT':
      return { ...state, highlightedId: action.payload }
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
    storyId: string
  }) => Promise<void>
  handleDeleteComment: (e: React.MouseEvent<HTMLLIElement>) => void
  handleEditComment: (e: React.MouseEvent<HTMLLIElement>) => void
  handleReport: (e: React.MouseEvent<HTMLLIElement>) => void
}

const CommentContext = createContext<CommentContextType | undefined>(undefined)

export function CommentProvider({
  children,
  initialComments,
}: {
  children: ReactNode
  initialComments: Comment[]
}) {
  const [state, dispatch] = useReducer(commentReducer, {
    ...initialState,
    commentList: initialComments,
  })

  const handleDeleteCommentModalOnConfirm = useCallback(
    async (user: User) => {
      await deleteComment({
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
    },
    [state.commentEditState]
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
    async ({ user, storyId }: { user: User; storyId: string }) => {
      if (!user?.memberId) throw new Error('no user id')
      if (!storyId) throw new Error('no story id')

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
          storyId,
          memberId: user.memberId,
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
        console.error('Error publishing comment:', error)
        // TODO: Implement error handling, e.g., show error toast
      } finally {
        dispatch({
          type: 'TOGGLE_IS_ADDING_COMMENT',
          payload: { isAdding: false },
        })
      }
    },
    [state.comment, state.commentList]
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
    (user: User) => {
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
      editComment({
        memberId: user.memberId,
        commentId: state.commentEditState.commentId,
        content: state.commentEditState.content,
      })
    },
    [state.commentEditState]
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
  const handleEditComment = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: true } })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }

  const handleReport = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_REPORTING_MODAL', payload: { isVisible: true } })
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
  }

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
  }

  return (
    <CommentContext.Provider value={contextValue}>
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
