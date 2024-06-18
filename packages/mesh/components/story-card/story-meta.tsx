import { displayTimeFromNow } from '@/utils/story-display'

import Icon from '../icon'

export default function StoryMeta({
  commentCount,
  publishDate,
  paywall,
  fullScreenAd,
}: {
  commentCount: number
  publishDate: string
  paywall: boolean
  fullScreenAd: string
}) {
  return (
    <div className="footnote flex items-center text-primary-500">
      <Icon iconName="icon-chat-bubble" size="s" />
      <div className="pl-0.5">{commentCount}</div>
      <Icon iconName="icon-dot" size="s" />
      <div>
        <span>{displayTimeFromNow(publishDate)}</span>
      </div>
      {paywall && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          付費文章
        </div>
      )}
      {fullScreenAd !== 'none' && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          蓋板廣告
        </div>
      )}
    </div>
  )
}
