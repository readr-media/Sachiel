import type { ReactNode } from 'react'
import React, { createContext, useContext, useReducer } from 'react'

import type { GetStoryQuery } from '@/graphql/__generated__/graphql'

type Story = NonNullable<NonNullable<GetStoryQuery>['story']>
type Comment = NonNullable<Story['comments']>[number]

type State = {
  isModalOpen: boolean
  confirmModalShow: boolean
  comment: string
  commentList: Comment[]
  highlightedId: string
}

type Action =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SHOW_CONFIRM_MODAL' }
  | { type: 'HIDE_CONFIRM_MODAL' }
  | { type: 'SET_COMMENT'; payload: string }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'SET_HIGHLIGHTED_ID'; payload: string }
  | { type: 'CLEAR_HIGHLIGHTED_ID' }

const initialState: State = {
  isModalOpen: false,
  confirmModalShow: false,
  comment: '',
  commentList: [],
  highlightedId: '',
}

function commentReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true }
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false, comment: '' }
    case 'SHOW_CONFIRM_MODAL':
      return { ...state, confirmModalShow: true }
    case 'HIDE_CONFIRM_MODAL':
      return { ...state, confirmModalShow: false }
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
