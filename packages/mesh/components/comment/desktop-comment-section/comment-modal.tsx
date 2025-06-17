import Icon from '@/components/icon'
import { useComment } from '@/context/comment'
import useBlockBodyScroll from '@/hooks/use-block-body-scroll'

import CommentBlocks from './comment-blocks'

export default function DesktopCommentModal({
  targetId,
}: {
  targetId: string
}) {
  useBlockBodyScroll(true)

  const { dispatch } = useComment()

  const closeDesktopModal = () => {
    dispatch({
      type: 'TOGGLE_DESKTOP_COMMENT_MODAL',
      payload: { isOpen: false },
    })
  }

  return (
    <div
      id="desktop-comment"
      className="fixed inset-0 z-modal flex items-center justify-center bg-lightbox-light"
      onClick={closeDesktopModal}
    >
      <div
        className="flex h-[600px] w-maxDesktopNavigation flex-col rounded-[3px] bg-white"
        onClick={(evt) => {
          evt.stopPropagation()
        }}
      >
        <div className="flex items-center justify-between border-b p-2">
          <div></div>
          <div className="list-title text-primary-800">留言區</div>
          <button
            className="flex size-11 items-center justify-center"
            onClick={closeDesktopModal}
          >
            <Icon iconName="icon-close" size="l" />
          </button>
        </div>
        <div className="overflow-auto px-10 pb-10 pt-5">
          <CommentBlocks targetId={targetId} />
        </div>
      </div>
    </div>
  )
}
