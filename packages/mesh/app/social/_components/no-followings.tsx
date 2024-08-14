import Icon from '@/components/icon'

import { type SuggestedFollowers } from '../[id]/page'
import FollowSuggestionFeed from './follow-suggestion-feed'
import FollowSuggestionWidget from './follow-suggestion-widget'

export default function NoFollowings({
  currentUserId,
  suggestedFollowers,
}: {
  currentUserId: string
  suggestedFollowers: SuggestedFollowers
}) {
  return (
    <main className="flex grow flex-col items-center justify-start gap-4 bg-white sm:bg-multi-layer-light sm:p-5 lg:flex-row lg:items-start lg:justify-start lg:gap-10 lg:px-10 lg:py-5">
      <div className="flex w-full justify-center bg-white sm:max-w-[600px] sm:rounded-md sm:px-10 sm:py-15 sm:drop-shadow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-6 pt-5 sm:pt-0">
            <Icon iconName="icon-user-dash" size={{ width: 80, height: 78 }} />
            <div className="flex flex-col items-center gap-2">
              <p className="title-1 text-primary-700">
                咦？這裡好像還缺點什麼...
              </p>
              <div className="flex flex-col items-center">
                <p className="body-2 text-primary-500">追蹤您喜愛的人</p>
                <p className="body-2 text-primary-500">
                  看看他們都精選了什麼新聞 👀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FollowSuggestionFeed
        currentUserId={currentUserId}
        suggestedFollowers={suggestedFollowers}
        isNoFollowings={true}
      />
      <FollowSuggestionWidget
        currentUserId={currentUserId}
        suggestedFollowers={suggestedFollowers}
      />
    </main>
  )
}
