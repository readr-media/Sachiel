import Avatar from '@/components/story-card/avatar'

import type { SuggestedFollowers } from '../[id]/page'
import FollowButton from './follow-button'

export default function FollowSuggestionWidget({
  suggestedFollowers,
}: {
  suggestedFollowers: SuggestedFollowers[]
}) {
  return (
    <div className="hidden grow px-5 lg:block">
      <div className="top-[calc(theme(height.header.sm)+20px)] hidden lg:fixed lg:block lg:w-[220px] xl:w-[360px]">
        <h2 className="list-title pb-1 text-primary-700">推薦追蹤</h2>
        {suggestedFollowers?.map((user, index) => (
          <div key={user.id}>
            <div className="flex flex-row items-center py-3">
              <Avatar src={user.avatar ?? ''} size="l" />
              <div className="flex w-full items-center justify-between">
                <div className="ml-3 flex-grow-0">
                  <p className="subtitle-2 mb-[2px] text-primary-700">
                    {user.name}
                  </p>
                  <p className="caption-1 line-clamp-1 break-words text-primary-500">
                    {user.currentMemberFollowingMember !== '' ? (
                      <>
                        <span>{user.currentMemberFollowingMember}</span>
                        及其他<span> {user.followerCount} </span>
                        的追蹤對象
                      </>
                    ) : (
                      <>
                        有<span> {user.followerCount} </span>人正在追蹤
                      </>
                    )}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <FollowButton id={user.id} />
                </div>
              </div>
            </div>
            {index !== suggestedFollowers.length - 1 ? (
              <div className="border-t-[0.5px]"></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
