import type { ReactNode } from 'react'
import { createContext, useContext, useReducer } from 'react'

import { addComment, editComment } from '@/app/actions/comment'
import type { User } from '@/context/user'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'
import { sleep } from '@/utils/sleep'
// Types
type Story = NonNullable<NonNullable<GetStoryQuery>['story']>
type Comment = NonNullable<Story['comments']>[number]

type EditDrawerShowType = '' | 'self' | 'other'
type EditDrawerBlockType = '' | 'popular' | 'all'

interface commentEditStateType {
  isVisible: boolean
  mode: EditDrawerShowType
  displayMode: EditDrawerBlockType
  content: string
  originalContent: string
  commentId: string
}

interface State {
  isModalOpen: boolean
  commentEditState: commentEditStateType
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
      payload: Omit<commentEditStateType, 'originalComment'>
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
        comment: !action.payload.isOpen ? state.comment : '',
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
      return {
        ...state,
        isAddingComment: action.payload.isAdding,
      }
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
      return {
        ...state,
        commentEditState: { ...initialState.commentEditState },
      }
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

const CommentContext = createContext<
  | {
      state: State
      dispatch: React.Dispatch<Action>
      handleDeleteCommentModalOnLeave: () => void
      handleDeleteCommentModalOnClose: () => void
      handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
      handleReportOnClose: () => void
      handleCommentEdit: (user: User) => void
      handleCommentPublish: ({
        user,
        storyId,
      }: {
        user: User
        storyId: string
      }) => Promise<void>
    }
  | undefined
>(undefined)

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
  const handleDeleteCommentModalOnLeave = () => {
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
  }
  const handleDeleteCommentModalOnClose = () => {
    dispatch({
      type: 'UPDATE_EDIT_DRAWER',
      payload: { ...state.commentEditState, isVisible: false },
    })
    dispatch({ type: 'RESET_EDIT_DRAWER' })
    dispatch({
      type: 'TOGGLE_DELETE_COMMENT_MODAL',
      payload: { isVisible: false },
    })
  }
  const handleCommentPublish = async ({
    user,
    storyId,
  }: {
    user: User
    storyId: string
  }) => {
    if (!user?.memberId) throw new Error('no user id')
    if (!storyId) throw new Error('no story id')
    dispatch({ type: 'TOGGLE_IS_ADDING_COMMENT', payload: { isAdding: true } })
    const dateTime = new Date().toString()
    const sleepTime = 3000
    const latestCommentId =
      state.commentList.find(
        (comment) => comment.member?.customId === user?.customId
      )?.id || ''
    let addedCommentId
    try {
      addedCommentId = await addComment({
        content: state.comment,
        storyId,
        memberId: user?.memberId,
        latestCommentId,
      })
    } catch (error) {
      dispatch({
        type: 'TOGGLE_IS_ADDING_COMMENT',
        payload: { isAdding: false },
      })
      console.error({ error })
    }
    if (!addedCommentId) {
      // TODO: error toast
      dispatch({
        type: 'TOGGLE_IS_ADDING_COMMENT',
        payload: { isAdding: false },
      })
      console.warn('please retry')
      return
    }
    await sleep(sleepTime)
    dispatch({ type: 'UPDATE_HIGHLIGHTED_COMMENT', payload: addedCommentId })
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
    dispatch({ type: 'TOGGLE_IS_ADDING_COMMENT', payload: { isAdding: false } })
  }
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'UPDATE_COMMENT_TEXT', payload: e.target.value })
  }

  const handleReportOnClose = () => {
    dispatch({ type: 'TOGGLE_REPORTING_MODAL', payload: { isVisible: false } })
  }

  const handleCommentEdit = (user: User) => {
    if (!state.commentEditState.content.trim()) {
      dispatch({ type: 'RESET_EDIT_DRAWER' })
      dispatch({ type: 'TOGGLE_COMMENT_EDITOR', payload: { isEditing: false } })
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
  }
  return (
    <CommentContext.Provider
      value={{
        state,
        dispatch,
        handleDeleteCommentModalOnLeave,
        handleDeleteCommentModalOnClose,
        handleCommentPublish,
        handleTextChange,
        handleReportOnClose,
        handleCommentEdit,
      }}
    >
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
