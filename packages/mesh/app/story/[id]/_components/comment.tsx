'use client'

import CommentBlocks from '@/components/comment/desktop-comment-section/comment-blocks'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

const Comment = ({ targetId = '' }: { targetId: string }) => {
  const { t } = useCustomTranslation()

  return (
    <div className="hidden grow flex-col sm:flex" id="comment">
      <p className="list-title mb-5 text-primary-700">
        {t('Pages.Story.Comment-title', '留言區')}
      </p>
      <CommentBlocks targetId={targetId} />
    </div>
  )
}

export default Comment
