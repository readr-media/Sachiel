import type { ReactNode } from 'react'
import React, { createContext, useContext, useReducer } from 'react'

import type { GetStoryQuery } from '@/graphql/__generated__/graphql'

type Story = NonNullable<NonNullable<GetStoryQuery>['story']>
type Comment = NonNullable<Story['comments']>[number]

type editDrawerShowType = '' | 'self' | 'other'

type State = {
  isModalOpen: boolean
  editDrawerShow: {
    show: boolean
    type: editDrawerShowType
    comment: string
    commentId: string
  }
  isEditingComment: boolean
  confirmModalShow: boolean
  comment: string
  commentList: Comment[]
  highlightedId: string
  confirmDeleteCommentModalShow: boolean
}

type Action =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_COMMENT_EDITOR' }
  | { type: 'CLOSE_COMMENT_EDITOR' }
  | { type: 'SET_COMMENT_EDITOR'; payload: string }
  | { type: 'SHOW_CONFIRM_MODAL' }
  | { type: 'HIDE_CONFIRM_MODAL' }
  | {
      type: 'SHOW_EDIT_DRAWER'
      payload: {
        type: editDrawerShowType
        comment: string
        commentId: string
      }
    }
  | { type: 'EDIT_COMMENT' }
  | { type: 'HIDE_EDIT_DRAWER' }
  | { type: 'CLEAR_EDIT_DRAWER' }
  | { type: 'DELETE_COMMENT' }
  | { type: 'SET_COMMENT'; payload: string }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'SET_HIGHLIGHTED_ID'; payload: string }
  | { type: 'CLEAR_HIGHLIGHTED_ID' }
  | { type: 'SHOW_DELETE_COMMENT_MODAL' }
  | { type: 'HIDE_DELETE_COMMENT_MODAL' }

const initialState: State = {
  isModalOpen: false,
  confirmModalShow: false,
  isEditingComment: false,
  editDrawerShow: { show: false, type: '', commentId: '', comment: '' },
  comment: '',
  commentList: [],
  highlightedId: '',
  confirmDeleteCommentModalShow: false,
}

function commentReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true }
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false, comment: '' }
    case 'OPEN_COMMENT_EDITOR':
      return { ...state, isEditingComment: true }
    case 'CLOSE_COMMENT_EDITOR':
      return { ...state, isEditingComment: false }
    case 'SET_COMMENT_EDITOR':
      return {
        ...state,
        editDrawerShow: {
          ...state.editDrawerShow,
          comment: action.payload,
        },
      }
    case 'EDIT_COMMENT':
      return {
        ...state,
        commentList: state.commentList.map((comment) => {
          if (comment.id === state.editDrawerShow.commentId) {
            comment.content = state.editDrawerShow.comment
          }
          return comment
        }),
      }
    case 'SHOW_CONFIRM_MODAL':
      return { ...state, confirmModalShow: true }
    case 'HIDE_CONFIRM_MODAL':
      return { ...state, confirmModalShow: false }
    case 'SHOW_EDIT_DRAWER':
      return {
        ...state,
        editDrawerShow: {
          show: true,
          type: action.payload.type,
          comment: action.payload.comment,
          commentId: action.payload.commentId,
        },
      }
    case 'HIDE_EDIT_DRAWER':
      return {
        ...state,
        editDrawerShow: { ...state.editDrawerShow, show: false },
      }
    case 'CLEAR_EDIT_DRAWER':
      return {
        ...state,
        editDrawerShow: {
          ...state.editDrawerShow,
          type: '',
          commentId: '',
          comment: '',
        },
      }
    case 'DELETE_COMMENT':
      return {
        ...state,
        commentList: state.commentList.filter(
          (comment) => comment.id !== state.editDrawerShow.commentId
        ),
      }
    case 'SHOW_DELETE_COMMENT_MODAL':
      return {
        ...state,
        confirmDeleteCommentModalShow: true,
      }
    case 'HIDE_DELETE_COMMENT_MODAL':
      return {
        ...state,
        confirmDeleteCommentModalShow: false,
      }
    case 'SET_COMMENT':
      return { ...state, comment: action.payload }
    case 'ADD_COMMENT':
      return { ...state, commentList: [action.payload, ...state.commentList] }
    case 'SET_HIGHLIGHTED_ID':
      return { ...state, highlightedId: action.payload }
    case 'CLEAR_HIGHLIGHTED_ID':
      return { ...state, highlightedId: '' }
    default:
      return state
  }
}

const CommentContext = createContext<
  | {
      state: State
      dispatch: React.Dispatch<Action>
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

  return (
    <CommentContext.Provider value={{ state, dispatch }}>
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
