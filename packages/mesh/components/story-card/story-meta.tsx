import { useCustomTranslation } from '@/hooks/use-custom-translation'

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
  const { t } = useCustomTranslation()

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
          {t('Components.StoryMeta.payall', '付費文章')}
        </div>
      )}
      {fullScreenAd && fullScreenAd !== 'none' && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          {t('Components.StoryMeta.full-screen-ad', '蓋板廣告')}
        </div>
      )}
      {storyType === 'podcast' ? (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          {t('Components.StoryMeta.podcast', 'Podcast')}
        </div>
      ) : null}
    </div>
  )
}
