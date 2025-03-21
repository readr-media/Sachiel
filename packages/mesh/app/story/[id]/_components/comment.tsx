'use client'

import { useTranslations } from 'next-intl'

import CommentBlocks from '@/components/comment/desktop-comment-section/comment-blocks'

const Comment = ({ targetId = '' }: { targetId: string }) => {
  const t = useTranslations('Pages.Story')
  return (
    <div className="hidden grow flex-col sm:flex" id="comment">
      <p className="list-title mb-5 text-primary-700">{t('Comment-title')}</p>
      <CommentBlocks targetId={targetId} />
    </div>
  )
}

export default Comment
