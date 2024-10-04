import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useReducer } from 'react'

import { addComment, editComment } from '@/app/actions/comment'
import type { User } from '@/context/user'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'
import { sleep } from '@/utils/sleep'

// Constants
const SLEEP_TIME = 1500

// Types
type Story = NonNullable<NonNullable<GetStoryQuery>['story']>
type Comment = NonNullable<Story['comments']>[number]

type EditDrawerShowType = '' | 'self' | 'other'
type EditDrawerBlockType = '' | 'popular' | 'all'

interface CommentEditState {
  isVisible: boolean
  mode: EditDrawerShowType
  displayMode: EditDrawerBlockType
  content: string
  originalContent: string
  commentId: string
}

interface State {
  isModalOpen: boolean
  commentEditState: CommentEditState
  isEditingComment: boolean
  isReporting: boolean
  isAddingComment: boolean
  confirmModalShow: boolean
  comment: string
  commentList: Comment[]
  highlightedId: string
  confirmDeleteCommentModalShow: boolean
}

type Action =
  | { type: 'TOGGLE_COMMENT_MODAL'; payload: { isOpen: boolean } }
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
  | { type: 'SHOW_REPORTING_MODAL' }
  | { type: 'HIDE_REPORTING_MODAL' }

const initialState: State = {
  isModalOpen: false,
  confirmModalShow: false,
  isEditingComment: false,
  isReporting: false,
  isAddingComment: false,
  commentEditState: {
    isVisible: false,
    mode: '',
    displayMode: '',
    commentId: '',
    content: '',
    originalContent: '',
  },
  comment: '',
  commentList: [],
  highlightedId: '',
  confirmDeleteCommentModalShow: false,
}

function commentReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_COMMENT_MODAL':
      return {
        ...state,
        isModalOpen: action.payload.isOpen,
        comment: action.payload.isOpen ? '' : state.comment,
      }
    case 'TOGGLE_COMMENT_EDITOR':
      return { ...state, isEditingComment: action.payload.isEditing }
    case 'TOGGLE_CONFIRM_MODAL':
      return { ...state, confirmModalShow: action.payload.isVisible }
    case 'TOGGLE_DELETE_COMMENT_MODAL':
      return {
        ...state,
        confirmDeleteCommentModalShow: action.payload.isVisible,
      }
    case 'TOGGLE_IS_ADDING_COMMENT':
      return { ...state, isAddingComment: action.payload.isAdding }
    case 'TOGGLE_REPORTING_MODAL':
      return { ...state, isReporting: action.payload.isVisible }
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
  handleDeleteCommentModalOnLeave: () => void
  handleDeleteCommentModalOnClose: () => void
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleReportOnClose: () => void
  handleCommentEdit: (user: User) => void
  handleCommentPublish: (params: {
    user: User
    storyId: string
  }) => Promise<void>
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

  const handleDeleteCommentModalOnLeave = useCallback(() => {
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
  }, [state.commentEditState])

  const handleDeleteCommentModalOnClose = useCallback(() => {
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

  const contextValue = {
    state,
    dispatch,
    handleDeleteCommentModalOnLeave,
    handleDeleteCommentModalOnClose,
    handleCommentPublish,
    handleTextChange,
    handleReportOnClose,
    handleCommentEdit,
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
