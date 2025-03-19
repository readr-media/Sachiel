import { useTranslations } from 'next-intl'

import CommentCount from '../comment-count'
import Icon from '../icon'
import { DisplayTimeFromNow } from '../story-time-display'

export default function StoryMeta({
  storyId,
  commentCount,
  publishDate,
  paywall,
  fullScreenAd,
  storyType = 'story',
}: {
  storyId: string
  commentCount: number
  publishDate: string
  paywall: boolean
  fullScreenAd: string
  storyType?: 'story' | 'podcast'
}) {
  const t = useTranslations('Components.StoryMeta')
  return (
    <div className="flex items-center text-primary-500">
      <Icon iconName="icon-chat-bubble" size="s" />
      <CommentCount objectiveId={storyId} initialCommentCounts={commentCount} />
      <Icon iconName="icon-dot" size="s" />
      <div>
        <span>{publishDate && <DisplayTimeFromNow date={publishDate} />}</span>
      </div>
      {paywall && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          {t('payall')}
        </div>
      )}
      {fullScreenAd && fullScreenAd !== 'none' && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          {t('full-screen-ad')}
        </div>
      )}
      {storyType === 'podcast' ? (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          {t('podcast')}
        </div>
      ) : null}
    </div>
  )
}
