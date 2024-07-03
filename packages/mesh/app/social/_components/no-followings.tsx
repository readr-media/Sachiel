import Icon from '@/components/icon'
import { processMostFollowedMembers } from '@/utils/most-followed-member'

import FollowSuggestionFeed from './follow-suggestion-feed'
import FollowSuggestionWidget from './follow-suggestion-widget'

export default async function NoFollowings() {
  const suggestedFollowers = await processMostFollowedMembers()

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 bg-white p-5 sm:bg-gray-50 lg:flex-row lg:items-start lg:justify-start lg:gap-10">
      <div className="flex w-full justify-center bg-white sm:max-w-[600px] sm:rounded-md sm:px-10 sm:py-15 sm:drop-shadow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-6">
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
        suggestedFollowers={suggestedFollowers}
        isNoFollowings={true}
      />
      <FollowSuggestionWidget suggestedFollowers={suggestedFollowers} />
    </main>
  )
}
