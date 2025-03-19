import { useTranslations } from 'next-intl'

import { useComment } from '@/context/comment'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { CommentObjective } from '@/types/objective'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

export default function ObjectiveCommentCount({
  commentsCount,
  commentObjective,
}: {
  commentsCount: number
  commentObjective?: CommentObjective
}) {
  const t = useTranslations('Components.ObjectiveCommentCount')
  const { dispatch } = useComment()
  const { width } = useWindowDimensions()
  const openCommentBlock = () => {
    if (width < getTailwindConfigBreakpointNumber('sm')) {
      dispatch({
        type: 'TOGGLE_MOBILE_COMMENT_MODAL',
        payload: { isOpen: true },
      })
      document.body.classList.add('overflow-hidden')
    } else {
      if (commentObjective === CommentObjective.Story) {
        document
          .getElementById('comment')
          ?.scrollIntoView({ behavior: 'smooth' })
      } else {
        dispatch({
          type: 'TOGGLE_DESKTOP_COMMENT_MODAL',
          payload: { isOpen: true },
        })
      }
    }
  }
  const displayCount =
    commentsCount < 10000
      ? commentsCount
      : (Math.floor(commentsCount / 1000) / 10).toFixed(1)

  const contentJsx = (() => {
    if (commentsCount) {
      return (
        <span>
          <span className="pr-1 text-primary-700">{displayCount}</span>
          {commentsCount < 10000
            ? t('comment-under-10000')
            : t('comment-over-10000')}
        </span>
      )
    } else {
      return <span>{t('no-comment')}</span>
    }
  })()

  return <button onClick={openCommentBlock}>{contentJsx}</button>
}
