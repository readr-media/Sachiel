import Icon from '@/components/icon'
import { useComment } from '@/context/comment-context'

export const MobileStoryCommentHeader = () => {
  const { state, dispatch } = useComment()
  const { comment } = state
  const closeCommentBlock = () => {
    if (comment) {
      dispatch({ type: 'TOGGLE_CONFIRM_MODAL', payload: { isVisible: true } })
      return
    }
    dispatch({
      type: 'TOGGLE_MOBILE_COMMENT_MODAL',
      payload: { isOpen: false },
    })
    document.body.classList.remove('overflow-hidden')
  }
  return (
    <div className="top-0 flex h-[60px] items-center justify-center shadow-[0_0.5px_0px_0px_rgba(0,0,0,0.1)]">
      <p className="list-title">留言</p>
      <button onClick={closeCommentBlock}>
        <Icon
          className="absolute right-2 top-2"
          iconName="icon-modal-close"
          size="2xl"
        />
      </button>
    </div>
  )
}
